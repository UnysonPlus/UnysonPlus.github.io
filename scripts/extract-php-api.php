<?php
/**
 * extract-php-api.php — parse the UnysonPlus framework's PUBLIC PHP surface into a JSON
 * data file the Docusaurus generator turns into the "API Reference" section.
 *
 * Extracts, from every framework/ *.php file:
 *   - Public helper FUNCTIONS (prefixed fw_ / unysonplus_ / upw_ / sc_ / fw_ext_ / fw_upw_):
 *     name, signature, docblock summary + @param/@return/@since/@deprecated, file:line,
 *     whether it's function_exists()-guarded (pluggable).
 *   - HOOKS (do_action / apply_filters): name, type, extra args, nearby doc comment, file:line.
 *   - Grouped by subsystem, derived from the file path.
 *
 * Output: ai-dev-kit-style data file at reference/_data/php-api.json (relative to the site root).
 * Run:  D:/xampp/php/php.exe scripts/extract-php-api.php <framework-root> <out-json>
 */
error_reporting(E_ERROR | E_PARSE);

$FRAMEWORK = $argv[1] ?? 'D:/Web Dev/unysonplus/framework';
$OUT       = $argv[2] ?? __DIR__ . '/../reference/_data/php-api.json';
$PLUGIN_ROOT = dirname($FRAMEWORK); // for repo-relative paths

$PREFIXES = array('fw_upw_', 'fw_ext_', 'fw_', 'unysonplus_', 'upw_', 'sc_');
function has_prefix($name, $prefixes) { foreach ($prefixes as $p) { if (strpos($name, $p) === 0) return true; } return false; }

/** Group a file path into a human subsystem. Most specific first. */
function group_of($rel) {
    $rel = str_replace('\\', '/', $rel);
    $map = array(
        'framework/extensions/shortcodes/extensions/page-builder/' => 'Page Builder',
        'framework/extensions/shortcodes/shortcodes/'              => 'Shortcodes',
        'framework/extensions/shortcodes/includes/theme-settings/' => 'Theme Settings (Components)',
        'framework/extensions/shortcodes/'                         => 'Shortcodes',
        'framework/extensions/animation-engine/'                   => 'Animation Engine',
        'framework/extensions/site-converter/'                     => 'Site Converter',
        'framework/extensions/custom-fields/'                      => 'Custom Fields',
        'framework/extensions/post-types/'                         => 'Post Types',
        'framework/extensions/megamenu/'                           => 'Mega Menu',
        'framework/extensions/forms/'                              => 'Forms',
        'framework/extensions/contact-forms/'                      => 'Contact Forms',
        'framework/extensions/mailer/'                             => 'Mailer',
        'framework/extensions/blog/'                               => 'Blog',
        'framework/extensions/portfolio/'                          => 'Portfolio',
        'framework/extensions/sidebars/'                           => 'Sidebars',
        'framework/extensions/breadcrumbs/'                        => 'Breadcrumbs',
        'framework/extensions/asset-optimizer/'                    => 'Asset Optimizer',
        'framework/extensions/snippets/'                           => 'Snippets',
        'framework/extensions/builder/'                            => 'Builder (base)',
        'framework/extensions/update/'                             => 'Update',
        'framework/extensions/'                                    => 'Other Extensions',
        'framework/includes/option-types/'                         => 'Option Types',
        'framework/includes/'                                      => 'Core Includes',
        'framework/helpers/'                                       => 'Core Helpers',
        'framework/core/'                                          => 'Core',
    );
    foreach ($map as $prefix => $label) { if (strpos($rel, $prefix) === 0) return $label; }
    return 'Framework';
}

/** Parse a raw docblock into summary + description + tags. */
function parse_docblock($raw) {
    if (!$raw) return array('summary' => '', 'desc' => '', 'params' => array(), 'return' => null, 'since' => '', 'deprecated' => '');
    // strip /** */ and leading * per line
    $lines = preg_split('/\r?\n/', $raw);
    $clean = array();
    foreach ($lines as $l) {
        $l = preg_replace('#^\s*/\*\*?#', '', $l);
        $l = preg_replace('#\*/\s*$#', '', $l);
        $l = preg_replace('#^\s*\*\s?#', '', $l);
        $clean[] = rtrim($l);
    }
    $text = trim(implode("\n", $clean));
    $params = array(); $return = null; $since = ''; $deprecated = '';
    $bodyLines = array();
    foreach (preg_split('/\r?\n/', $text) as $l) {
        if (preg_match('/^@param\s+(\S+)\s+(\$\S+)\s*(.*)$/', $l, $m)) { $params[] = array('type' => $m[1], 'name' => $m[2], 'desc' => trim($m[3])); continue; }
        if (preg_match('/^@param\s+(\$\S+)\s*(.*)$/', $l, $m)) { $params[] = array('type' => '', 'name' => $m[1], 'desc' => trim($m[2])); continue; }
        if (preg_match('/^@return\s+(\S+)\s*(.*)$/', $l, $m)) { $return = array('type' => $m[1], 'desc' => trim($m[2])); continue; }
        if (preg_match('/^@since\s+(.*)$/', $l, $m)) { $since = trim($m[1]); continue; }
        if (preg_match('/^@deprecated\s*(.*)$/', $l, $m)) { $deprecated = trim($m[1]) ?: 'yes'; continue; }
        if (preg_match('/^@(var|internal|see|link|throws|global|access|package|author|filter|action|hook)\b/', $l)) { continue; }
        $bodyLines[] = $l;
    }
    $body = trim(implode("\n", $bodyLines));
    // summary = first paragraph
    $parts = preg_split('/\n\s*\n/', $body, 2);
    $summary = trim(preg_replace('/\s+/', ' ', $parts[0] ?? ''));
    $desc = trim($parts[1] ?? '');
    return array('summary' => $summary, 'desc' => $desc, 'params' => $params, 'return' => $return, 'since' => $since, 'deprecated' => $deprecated);
}

$functions = array();
$hooks = array();

$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($FRAMEWORK, FilesystemIterator::SKIP_DOTS));
foreach ($rii as $file) {
    if ($file->getExtension() !== 'php') continue;
    $path = str_replace('\\', '/', $file->getPathname());
    $rel  = ltrim(str_replace(str_replace('\\', '/', $PLUGIN_ROOT), '', $path), '/');
    if (strpos($rel, 'node_modules/') !== false || strpos($rel, '/tests/') !== false) continue;
    $src = file_get_contents($path);
    if ($src === false) continue;
    $group = group_of($rel);
    $funcexists = array();
    if (preg_match_all("/function_exists\\(\\s*['\"]([A-Za-z0-9_]+)['\"]\\s*\\)/", $src, $fe)) { foreach ($fe[1] as $n) $funcexists[$n] = true; }

    $tokens = token_get_all($src);
    $n = count($tokens);
    $lastDoc = null; $lastDocLine = -10;
    // precompute line numbers are in tokens
    for ($i = 0; $i < $n; $i++) {
        $t = $tokens[$i];
        if (is_array($t)) {
            if ($t[0] === T_DOC_COMMENT) { $lastDoc = $t[1]; $lastDocLine = $t[2]; }
            elseif ($t[0] === T_FUNCTION) {
                // find the function name (next T_STRING), skip if it's a closure (next non-ws is '(')
                $j = $i + 1; while ($j < $n && is_array($tokens[$j]) && in_array($tokens[$j][0], array(T_WHITESPACE), true)) $j++;
                // skip & for return-by-ref
                if ($j < $n && $tokens[$j] === '&') { $j++; while ($j < $n && is_array($tokens[$j]) && $tokens[$j][0] === T_WHITESPACE) $j++; }
                if ($j < $n && is_array($tokens[$j]) && $tokens[$j][0] === T_STRING) {
                    $fname = $tokens[$j][1];
                    $fline = $tokens[$j][2];
                    // only top-level public-prefixed functions (heuristic: prefix match; excludes methods since methods rarely carry these prefixes and we only want public helpers)
                    if (has_prefix($fname, $GLOBALS['PREFIXES'])) {
                        // reconstruct signature: from '(' after name up to matching ')' plus optional ': type'
                        $k = $j + 1; while ($k < $n && $tokens[$k] !== '(') $k++;
                        $depth = 0; $sig = '';
                        for (; $k < $n; $k++) {
                            $tk = $tokens[$k];
                            $piece = is_array($tk) ? $tk[1] : $tk;
                            $sig .= $piece;
                            if ($tk === '(') $depth++;
                            elseif ($tk === ')') { $depth--; if ($depth === 0) { $k++; break; } }
                        }
                        // capture return type (': Type') up to '{' or ';'
                        $ret = '';
                        for (; $k < $n; $k++) {
                            $tk = $tokens[$k];
                            if ($tk === '{' || $tk === ';') break;
                            $ret .= is_array($tk) ? $tk[1] : $tk;
                        }
                        $sig = preg_replace('/\s+/', ' ', trim($sig));
                        $ret = trim($ret);
                        // Attach the immediately-preceding docblock. Widened window covers the
                        // `if ( ! function_exists('x') ) : /** … */ function x(){` guard pattern.
                        // Skip obvious file-header / view-file docblocks so they don't bleed onto
                        // the first function.
                        $isHeader = $lastDoc && ($lastDocLine <= 4 || strpos($lastDoc, '@package') !== false || strpos($lastDoc, '@var') !== false);
                        $doc = ($lastDocLine >= 0 && !$isHeader && ($fline - $lastDocLine) <= 15) ? parse_docblock($lastDoc) : parse_docblock('');
                        $functions[] = array(
                            'name'       => $fname,
                            'signature'  => $fname . $sig . ($ret ? ' ' . $ret : ''),
                            'group'      => $group,
                            'file'       => $rel,
                            'line'       => $fline,
                            'pluggable'  => isset($funcexists[$fname]),
                            'summary'    => $doc['summary'],
                            'desc'       => $doc['desc'],
                            'params'     => $doc['params'],
                            'return'     => $doc['return'],
                            'since'      => $doc['since'],
                            'deprecated' => $doc['deprecated'],
                        );
                    }
                }
                $lastDoc = null;
            } elseif ($t[0] === T_STRING && ($t[1] === 'do_action' || $t[1] === 'apply_filters')) {
                $type = $t[1] === 'do_action' ? 'action' : 'filter';
                $hline = $t[2];
                // next token should be '(' then the hook name string
                $j = $i + 1; while ($j < $n && is_array($tokens[$j]) && $tokens[$j][0] === T_WHITESPACE) $j++;
                if ($j < $n && $tokens[$j] === '(') {
                    $k = $j + 1; while ($k < $n && is_array($tokens[$k]) && $tokens[$k][0] === T_WHITESPACE) $k++;
                    if ($k < $n && is_array($tokens[$k]) && $tokens[$k][0] === T_CONSTANT_ENCAPSED_STRING) {
                        $hook = trim($tokens[$k][1], "\"'");
                        // dynamic names like "foo_{$x}" — keep literal part only if fully static.
                        // Only the framework's OWN hooks (exclude WP-core / third-party hooks the
                        // framework merely fires or handles).
                        $isOwn = preg_match('/^(fw[-:_]|unysonplus_|upwc?_|sc_)/', $hook);
                        if ($isOwn && strpos($hook, '$') === false && strpos($hook, '{') === false && $hook !== '') {
                            $doc = ($lastDocLine >= 0 && ($hline - $lastDocLine) <= 4) ? parse_docblock($lastDoc) : parse_docblock('');
                            $hooks[] = array(
                                'name'    => $hook,
                                'type'    => $type,
                                'group'   => $group,
                                'file'    => $rel,
                                'line'    => $hline,
                                'summary' => $doc['summary'],
                            );
                        }
                    }
                }
            } elseif ($t[0] !== T_WHITESPACE && $t[0] !== T_COMMENT) {
                // any other significant token clears a pending docblock only if it's not function/doc
                if ($t[0] !== T_DOC_COMMENT && $t[0] !== T_FUNCTION && $t[0] !== T_STRING) { /* keep doc for hooks/functions */ }
            }
        }
    }
}

// de-dupe functions by name (keep first / canonical definition), collect duplicate count
$seen = array(); $uniqFns = array();
usort($functions, function ($a, $b) { return strcmp($a['name'], $b['name']); });
foreach ($functions as $f) { if (isset($seen[$f['name']])) continue; $seen[$f['name']] = true; $uniqFns[] = $f; }

// de-dupe hooks by name+type (keep first, count call sites)
$hookSeen = array(); $uniqHooks = array();
usort($hooks, function ($a, $b) { return strcmp($a['name'], $b['name']); });
foreach ($hooks as $h) {
    $key = $h['type'] . ':' . $h['name'];
    if (isset($hookSeen[$key])) { $uniqHooks[$hookSeen[$key]]['sites']++; if ($h['summary'] && !$uniqHooks[$hookSeen[$key]]['summary']) $uniqHooks[$hookSeen[$key]]['summary'] = $h['summary']; continue; }
    $h['sites'] = 1; $hookSeen[$key] = count($uniqHooks); $uniqHooks[] = $h;
}

$out = array(
    'generatedFrom' => 'UnysonPlus framework/ (PHPDoc + token scan)',
    'counts' => array('functions' => count($uniqFns), 'hooks' => count($uniqHooks)),
    'functions' => $uniqFns,
    'hooks' => $uniqHooks,
);
@mkdir(dirname($OUT), 0777, true);
file_put_contents($OUT, json_encode($out, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo "wrote " . $OUT . ": " . count($uniqFns) . " functions, " . count($uniqHooks) . " hooks\n";
