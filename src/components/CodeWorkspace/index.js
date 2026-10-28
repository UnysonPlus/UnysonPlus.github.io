import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * <CodeWorkspace example={data} /> — a small editor-style viewer: the example's files
 * in a tree on the left, the open file on the right.
 *
 * `data` is a src/data/code-examples/<name>.json file, generated from the real folder
 * examples/<name>/ by scripts/gen-code-examples.mjs, so a page only does:
 *
 *   import example from '@site/src/data/code-examples/headless-nextjs.json';
 *   <CodeWorkspace example={example} />
 *
 * Highlighting, line numbers, highlighted lines and the copy button come from the
 * site's own CodeBlock, so the code looks like every other block in the docs.
 * A link can open a given file: #code=<example name>/<file path>.
 */

const HASH_PREFIX = '#code=';

/** Turn the flat path list into nested folders: { dirs: {name: node}, files: [file] }. */
function buildTree(files) {
  const root = {dirs: {}, files: []};
  for (const file of files) {
    const parts = file.path.split('/');
    let node = root;
    parts.slice(0, -1).forEach((part, i) => {
      const dirPath = parts.slice(0, i + 1).join('/');
      node.dirs[part] = node.dirs[part] || {path: dirPath, dirs: {}, files: []};
      node = node.dirs[part];
    });
    node.files.push(file);
  }
  return root;
}

/** Render `code` spans in a note, so notes can name files and functions. */
function inline(text) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part,
  );
}

function basename(p) {
  return p.split('/').pop();
}

function FolderIcon({open}) {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      {open ? (
        <path d="M1.5 3.5h4l1.5 1.5h6.5v1.5H4L1.5 12.5z M4 6.5h11l-2.5 6h-11z" />
      ) : (
        <path d="M1.5 3.5h4l1.5 1.5h7.5v8h-13z" />
      )}
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 1.5h6l3 3v10h-9z M9.5 1.5v3h3" />
    </svg>
  );
}

function Folder({name, node, depth, collapsed, toggle, active, open}) {
  const isOpen = !collapsed.has(node.path);
  return (
    <li role="treeitem" aria-expanded={isOpen}>
      <button
        type="button"
        className={styles.row}
        style={{paddingLeft: 8 + depth * 14}}
        onClick={() => toggle(node.path)}>
        <span className={clsx(styles.chevron, isOpen && styles.chevronOpen)} aria-hidden="true" />
        <FolderIcon open={isOpen} />
        <span className={styles.name}>{name}</span>
      </button>
      {isOpen && (
        <Branch node={node} depth={depth + 1} collapsed={collapsed} toggle={toggle} active={active} open={open} />
      )}
    </li>
  );
}

function Branch({node, depth, collapsed, toggle, active, open}) {
  return (
    <ul role="group" className={styles.branch}>
      {Object.keys(node.dirs).map((name) => (
        <Folder
          key={name}
          name={name}
          node={node.dirs[name]}
          depth={depth}
          collapsed={collapsed}
          toggle={toggle}
          active={active}
          open={open}
        />
      ))}
      {node.files.map((file) => (
        <li key={file.path} role="treeitem" aria-selected={file.path === active}>
          <button
            type="button"
            className={clsx(styles.row, file.path === active && styles.rowActive)}
            style={{paddingLeft: 8 + depth * 14 + 12}}
            onClick={() => open(file.path)}>
            <FileIcon />
            <span className={styles.name}>{basename(file.path)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function CodeWorkspace({example, height = 520}) {
  const byPath = useMemo(() => new Map(example.files.map((f) => [f.path, f])), [example]);
  const tree = useMemo(() => buildTree(example.files), [example]);
  const download = useBaseUrl(example.download);

  const [active, setActive] = useState(example.open);
  const [tabs, setTabs] = useState([example.open]);
  const [collapsed, setCollapsed] = useState(() => new Set());

  const open = (filePath, {updateHash = true} = {}) => {
    if (!byPath.has(filePath)) return;
    setActive(filePath);
    setTabs((t) => (t.includes(filePath) ? t : [...t, filePath]));
    if (updateHash && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${HASH_PREFIX}${example.name}/${filePath}`);
    }
  };

  const close = (filePath) => {
    setTabs((t) => {
      if (t.length === 1) return t;
      const next = t.filter((p) => p !== filePath);
      if (filePath === active) setActive(next[Math.max(0, t.indexOf(filePath) - 1)]);
      return next;
    });
  };

  const toggle = (dirPath) =>
    setCollapsed((c) => {
      const next = new Set(c);
      next.has(dirPath) ? next.delete(dirPath) : next.add(dirPath);
      return next;
    });

  // Open the file named in the URL (#code=<example>/<path>) and scroll to this workspace.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash);
    const prefix = `${HASH_PREFIX}${example.name}/`;
    if (hash.startsWith(prefix) && byPath.has(hash.slice(prefix.length))) {
      open(hash.slice(prefix.length), {updateHash: false});
      document.getElementById(`code-workspace-${example.name}`)?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example.name]);

  const file = byPath.get(active);

  return (
    <div id={`code-workspace-${example.name}`} className={styles.workspace} style={{'--cw-height': `${height}px`}}>
      <div className={styles.titlebar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>{example.title}</span>
        <a className={styles.download} href={download} download>
          Download
        </a>
      </div>

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label={`Files in ${example.title}`}>
          <div className={styles.sidebarHead}>Files</div>
          <div role="tree">
            <Branch node={tree} depth={0} collapsed={collapsed} toggle={toggle} active={active} open={open} />
          </div>
        </nav>

        <div className={styles.main}>
          {/* Narrow screens: the tree is hidden and this picker takes its place. */}
          <label className={styles.picker}>
            <select aria-label="Open file" value={active} onChange={(e) => open(e.target.value)}>
              {example.files.map((f) => (
                <option key={f.path} value={f.path}>
                  {f.path}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.tabs} role="tablist">
            {tabs.map((p) => (
              <div key={p} className={clsx(styles.tab, p === active && styles.tabActive)}>
                <button type="button" role="tab" aria-selected={p === active} title={p} onClick={() => open(p)}>
                  {basename(p)}
                </button>
                {tabs.length > 1 && (
                  <button type="button" className={styles.tabClose} aria-label={`Close ${p}`} onClick={() => close(p)}>
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className={styles.path}>{file.path}</div>
          {file.note && <p className={styles.note}>{inline(file.note)}</p>}

          <div className={styles.code}>
            <CodeBlock
              key={file.path}
              language={file.language}
              metastring={file.highlight ? `{${file.highlight}}` : undefined}
              showLineNumbers>
              {file.code}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
