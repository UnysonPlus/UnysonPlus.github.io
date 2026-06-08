#!/usr/bin/env python3
"""
One-shot migration: legacy Sphinx/RST docs  ->  Docusaurus Markdown.

Source:  ../UnysonPlus-Documentation  (95 .rst files)
Target:  ./docs/<category>/...         (legacy categories merged at the top level,
                                        after the existing Unyson+ pages)

Requires a pandoc binary:  pip install pypandoc_binary
Run from the unysonplus-site repo root:  python migrate-legacy-docs.py
Idempotent: wipes and rewrites docs/framework on each run.
"""
import os
import re
import json
import shutil
import pypandoc

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.normpath(os.path.join(HERE, "..", "UnysonPlus-Documentation"))
DOCS = os.path.join(HERE, "docs")
URL_BASE = "/docs"

# The legacy categories are written at the TOP level of the docs sidebar (merged
# with the Unyson+ pages), AFTER the existing curated categories (positions 1..6).
TOP_OFFSET = 6
# Legacy top folder -> renamed folder, to avoid colliding with an existing one.
RENAME = {"extensions": "creating-extensions"}
LABEL_OVERRIDE = {"creating-extensions": "Creating Extensions"}
# Top-level folders this script owns (everything else under docs/ is left alone).
MANAGED = ["convention", "options", "creating-extensions", "components",
           "helpers", "manifest", "extension", "hooks"]


def new_rel(old_rel):
    """old 'extensions/cookbook.rst' -> new 'creating-extensions/cookbook.md'."""
    parts = old_rel[:-4].split("/")
    parts[0] = RENAME.get(parts[0], parts[0])
    return "/".join(parts) + ".md"


def to_old(new_path):
    """new docs-relative dir -> legacy dir (reverse the top-folder rename)."""
    parts = new_path.split("/")
    for old, new in RENAME.items():
        if parts[0] == new:
            parts[0] = old
    return "/".join(parts)

# Link targets shared across all pages (the old .. include:: /links.rst.inc).
with open(os.path.join(SRC, "links.rst.inc"), encoding="utf-8") as f:
    LINKS_INC = f.read()

# GitHub-alert -> Docusaurus admonition type.
ALERT_MAP = {
    "NOTE": "note", "TIP": "tip", "IMPORTANT": "info",
    "WARNING": "warning", "CAUTION": "danger",
}


# ---------------------------------------------------------------- helpers
def strip_directive_blocks(text, names):
    """Remove `.. name::` directives and their indented bodies."""
    lines = text.split("\n")
    out, i = [], 0
    pat = re.compile(r"^(\s*)\.\.\s+(" + "|".join(names) + r")::")
    while i < len(lines):
        m = pat.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        indent = len(m.group(1))
        i += 1
        # consume blank lines and lines indented deeper than the directive
        while i < len(lines) and (lines[i].strip() == "" or
                                  (len(lines[i]) - len(lines[i].lstrip())) > indent):
            i += 1
    return "\n".join(out)


def extract_raw_html(text):
    """Pull `.. raw:: html` blocks out so pandoc can't mangle the markup."""
    lines = text.split("\n")
    out, blocks, i = [], [], 0
    pat = re.compile(r"^(\s*)\.\.\s+raw::\s+html\s*$")
    while i < len(lines):
        m = pat.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        indent = len(m.group(1))
        i += 1
        body = []
        while i < len(lines) and (lines[i].strip() == "" or
                                  (len(lines[i]) - len(lines[i].lstrip())) > indent):
            body.append(lines[i]); i += 1
        # dedent
        html = "\n".join(l.strip() for l in body if l.strip())
        out.append(f"\n@@RAWHTML{len(blocks)}@@\n")
        blocks.append(html)
    return "\n".join(out), blocks


def parse_toctree_order(text):
    """Return the ordered list of child doc names from a `.. toctree::`."""
    lines = text.split("\n")
    order, i = [], 0
    while i < len(lines):
        if re.match(r"^\s*\.\.\s+toctree::", lines[i]):
            indent = len(lines[i]) - len(lines[i].lstrip())
            i += 1
            while i < len(lines) and (lines[i].strip() == "" or
                                      (len(lines[i]) - len(lines[i].lstrip())) > indent):
                s = lines[i].strip()
                if s and not s.startswith(":"):
                    order.append(s)
                i += 1
        else:
            i += 1
    return order


def resolve_ref(target, cur_dir):
    """old doc target (abs '/a/b' or relative 'a/b') -> Docusaurus URL."""
    target = target.strip()
    if target.startswith("/"):
        absp = target[1:]
    else:
        absp = os.path.normpath(os.path.join(cur_dir, target)).replace("\\", "/")
    absp = absp.rstrip("/")
    if absp == "index":
        return "/docs/intro"                       # old getting-started -> intro
    if absp.endswith("/index"):
        absp = absp[:-len("/index")]
    parts = absp.split("/")
    parts[0] = RENAME.get(parts[0], parts[0])
    return f"{URL_BASE}/{'/'.join(parts)}"


def convert_roles(text, cur_dir):
    """:doc:/:ref: roles -> markdown-friendly RST before pandoc runs."""
    # :doc:`Text </path>`  /  :doc:`Text <path>`
    def doc_textlink(m):
        return f"`{m.group(1).strip()} <{resolve_ref(m.group(2), cur_dir)}>`__"
    text = re.sub(r":doc:`([^<`]+?)\s*<([^>]+)>`", doc_textlink, text)

    # :doc:`/path`  /  :doc:`path`   (no explicit text -> use last segment)
    def doc_bare(m):
        tgt = m.group(1).strip()
        label = tgt.rstrip("/").split("/")[-1].replace("-", " ").replace("_", " ").title()
        return f"`{label} <{resolve_ref(tgt, cur_dir)}>`__"
    text = re.sub(r":doc:`([^<`]+?)`", doc_bare, text)

    # :ref:`Text <label>` -> keep the visible text (cross-page anchors dropped)
    text = re.sub(r":ref:`([^<`]+?)\s*<[^>]+>`", lambda m: m.group(1).strip(), text)
    # :ref:`label` -> humanized label
    text = re.sub(r":ref:`([^<`]+?)`",
                  lambda m: m.group(1).strip().replace("-", " ").replace("_", " "), text)
    return text


def gh_alerts_to_admonitions(md):
    """`> [!NOTE]` GitHub alerts -> Docusaurus `:::note` blocks."""
    lines = md.split("\n")
    out, i = [], 0
    head = re.compile(r"^>\s*\[!(\w+)\]\s*$")
    while i < len(lines):
        m = head.match(lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        kind = ALERT_MAP.get(m.group(1).upper(), "note")
        i += 1
        body = []
        while i < len(lines) and lines[i].startswith(">"):
            body.append(re.sub(r"^>\s?", "", lines[i])); i += 1
        out.append(f":::{kind}")
        out.extend(body)
        out.append(":::")
    return "\n".join(out)


# ---------------------------------------------------------------- rebrand
def _map_repo(repo):
    """ThemeFuse repo name -> existing UnysonPlus repo name (or None)."""
    if repo == "Unyson":
        return "UnysonPlus"
    if repo.startswith("Unyson-") and repo.endswith("-Extension"):
        return "UnysonPlus-" + repo[len("Unyson-"):]
    return None  # e.g. Theme-Includes has no UnysonPlus equivalent


def _repoint_or_drop(url):
    """A ThemeFuse github/raw URL -> repointed UnysonPlus URL, or None to drop.

    Shallow links (repo root / master|main path) are repointed; deep links
    pinned to a commit/tag/line, or to issues/pulls, or to an unmapped repo,
    are dropped (the user keeps the surrounding text)."""
    m = re.search(r"/ThemeFuse/([A-Za-z0-9._-]+)", url)
    if not m:
        return url
    mapped = _map_repo(m.group(1))
    ref = re.search(r"/(?:blob|tree)/([^/#]+)", url)
    shallow = (ref is None) or (ref.group(1) in ("master", "main"))
    deep = (not shallow) or ("#l" in url.lower()) or ("/issues/" in url) \
        or ("/pull/" in url) or bool(re.search(r"/[0-9a-f]{40}/", url))
    if mapped and not deep:
        return url.replace("/ThemeFuse/" + m.group(1), "/UnysonPlus/" + mapped)
    return None


def _process_links(line):
    """Repoint/unwrap ThemeFuse markdown links and autolinks (prose only)."""
    def md(m):
        text, url = m.group(1), m.group(2)
        low = url.lower()
        if "themefuse.com" in low and "github" not in low:
            return text                                   # drop marketing link
        if "/themefuse/" in low:
            nu = _repoint_or_drop(url)
            return f"[{text}]({nu})" if nu else text
        return m.group(0)
    line = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", md, line)

    def auto(m):
        url = m.group(1); low = url.lower()
        if "themefuse.com" in low and "github" not in low:
            return url.replace("themefuse.com", "example.com")
        if "/themefuse/" in low:
            nu = _repoint_or_drop(url)
            return f"<{nu}>" if nu else ""
        return m.group(0)
    return re.sub(r"<(https?://[^>]+)>", auto, line)


def _code_url_subs(line):
    """Bare ThemeFuse URLs (incl. inside code) -> repoint shallow / neutralize."""
    line = line.replace("unyson.themefuse.com", "unysonplus.github.io")
    line = re.sub(
        r"https?://(?:raw\.githubusercontent\.com|github\.com)/ThemeFuse/[^\s)>\]\"'`]+",
        lambda m: _repoint_or_drop(m.group(0)) or m.group(0), line)
    # unmapped repo + example "author" credit strings inside code samples
    line = line.replace("github.com/ThemeFuse/Theme-Includes", "github.com/UnysonPlus")
    line = line.replace("'ThemeFuse'", "'Unyson+'")
    return line.replace("themefuse.com", "example.com")


def _prose_words(line):
    """'Unyson' -> 'Unyson+' and 'ThemeFuse' -> 'Unyson+' in free text only
    (never inside code spans, link targets, or bare URLs)."""
    protected = re.compile(r"`[^`]*`|\]\([^)]*\)|<https?://[^>]*>|https?://\S+")
    def sub(seg):
        seg = re.sub(r"\bUnyson\b(?!\+)", "Unyson+", seg)
        seg = re.sub(r"\bThemeFuse\b", "Unyson+", seg)
        return seg
    out, last = [], 0
    for m in protected.finditer(line):
        out.append(sub(line[last:m.start()]))
        out.append(m.group(0))
        last = m.end()
    out.append(sub(line[last:]))
    return "".join(out)


def rebrand(md):
    """De-ThemeFuse + Unyson->Unyson+ across a converted page."""
    fenced, out = False, []
    for line in md.split("\n"):
        if line.lstrip().startswith("```"):
            fenced = not fenced
            out.append(line); continue
        if fenced:
            out.append(_code_url_subs(line)); continue
        line = _process_links(line)
        line = _code_url_subs(line)
        line = _prose_words(line)
        out.append(line)
    return "\n".join(out)


def clean_markdown(md, raw_blocks):
    md = gh_alerts_to_admonitions(md)
    # normalize ``` php  ->  ```php
    md = re.sub(r"^``` (\w[\w+-]*)\s*$", r"```\1", md, flags=re.M)
    # legacy Sphinx image paths -> static/img/legacy
    md = md.replace("](/_images/", "](/img/legacy/").replace("](_images/", "](/img/legacy/")
    # restore raw html
    for idx, html in enumerate(raw_blocks):
        md = md.replace(f"@@RAWHTML{idx}@@", html)
    # rebrand: Unyson -> Unyson+, repoint/remove ThemeFuse references
    md = rebrand(md)
    # collapse 3+ blank lines
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip() + "\n"


def fm_escape(s):
    return s.replace('"', '\\"')


def convert_file(rst_path, cur_dir):
    with open(rst_path, encoding="utf-8") as f:
        raw = f.read()
    raw = re.sub(r"^\s*\.\.\s+include::.*$", "", raw, flags=re.M)      # drop includes
    raw = strip_directive_blocks(raw, ["toctree", "contents"])
    raw = re.sub(r"^\s*\.\.\s+class::.*$", "", raw, flags=re.M)        # drop class
    raw = re.sub(r"^\s*\.\.\s+_[\w.-]+:\s*$", "", raw, flags=re.M)     # drop ref targets
    raw = re.sub(r"^(\s*)\.\.\s+rubric::\s*(.+)$", r"\1**\2**", raw, flags=re.M)
    raw, raw_blocks = extract_raw_html(raw)
    raw = convert_roles(raw, cur_dir)
    raw = raw + "\n\n" + LINKS_INC                                     # resolve `name`_
    md = pypandoc.convert_text(raw, "gfm", format="rst",
                               extra_args=["--wrap=none"])
    return clean_markdown(md, raw_blocks)


def split_title(md):
    """Pull the first `# H1` out as the title; return (title, body)."""
    lines = md.split("\n")
    for idx, ln in enumerate(lines):
        m = re.match(r"^#\s+(.+?)\s*$", ln)
        if m:
            title = m.group(1)
            del lines[idx]
            # drop a leading blank that may remain
            body = "\n".join(lines).lstrip("\n")
            return title, body
    return None, md


def write_doc(dest_path, title, body, position):
    fm = ["---"]
    if title:
        fm.append(f'title: "{fm_escape(title)}"')
    if position is not None:
        fm.append(f"sidebar_position: {position}")
    fm.append("---")
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(fm) + "\n\n" + body)


# ---------------------------------------------------------------- walk
def old_dir_of(rel):
    """directory (old-root-relative) used to resolve relative :doc: targets."""
    d = os.path.dirname(rel).replace("\\", "/")
    return d


def main():
    # Remove only the folders this script owns (leave Unyson+ docs untouched),
    # plus the old docs/framework wrapper from a previous run.
    for m in MANAGED + ["framework"]:
        p = os.path.join(DOCS, m)
        if os.path.isdir(p):
            shutil.rmtree(p, ignore_errors=True)
    os.makedirs(DOCS, exist_ok=True)

    # Copy whatever legacy images exist into static/img/legacy (paths rewritten
    # to /img/legacy/...). Missing screenshots simply warn at build time.
    img_dest = os.path.join(HERE, "static", "img", "legacy")
    os.makedirs(img_dest, exist_ok=True)
    src_images = os.path.join(SRC, "_images")
    if os.path.isdir(src_images):
        for fn in os.listdir(src_images):
            sp = os.path.join(src_images, fn)
            if os.path.isfile(sp):
                shutil.copy2(sp, os.path.join(img_dest, fn))

    # gather all rst (relative to SRC), excluding the include fragment
    rst_files = []
    for root, _, files in os.walk(SRC):
        if os.path.relpath(root, SRC).startswith((".git", "_themes", "_images",
                                                  "_build", "build", "converted",
                                                  "_build_conf")):
            continue
        for fn in files:
            if fn.endswith(".rst"):
                rel = os.path.relpath(os.path.join(root, fn), SRC).replace("\\", "/")
                rst_files.append(rel)

    # Positions from EVERY toctree (entries may be 'stem' or 'subdir/landing').
    doc_pos = {}     # old path w/o ext -> sidebar_position (leaf docs)
    folder_pos = {}  # old folder path  -> category position
    for rel in rst_files:
        with open(os.path.join(SRC, rel), encoding="utf-8") as f:
            entries = parse_toctree_order(f.read())
        d = os.path.dirname(rel).replace("\\", "/")
        for idx, entry in enumerate(entries):
            if "/" in entry:                       # points into a subfolder
                folder = os.path.normpath(os.path.join(d, entry.split("/")[0]))
                folder_pos[folder.replace("\\", "/")] = idx + 1
            else:                                  # a sibling leaf doc
                p = os.path.normpath(os.path.join(d, entry)).replace("\\", "/")
                doc_pos[p] = idx + 1

    def position_for(rel):
        """sidebar_position for a leaf doc; None for index pages."""
        if os.path.basename(rel) == "index.rst":
            return None                            # category position lives in json
        return doc_pos.get(rel[:-4])

    category_only = []   # dirs that get a generated-index instead of index.md

    for rel in sorted(rst_files):
        if rel == "index.rst":
            continue                            # legacy getting-started -> use intro
        cur_dir = old_dir_of(rel)
        md = convert_file(os.path.join(SRC, rel), cur_dir)
        title, body = split_title(md)
        stem = os.path.splitext(os.path.basename(rel))[0]
        dest_path = os.path.join(DOCS, new_rel(rel))   # top-level, renamed tree
        pos = position_for(rel)

        if stem == "index":
            d = os.path.dirname(rel).replace("\\", "/")
            if body.strip() == "":
                # nothing but a toctree -> use a generated category index
                category_only.append((d, title, pos))
                continue
        write_doc(dest_path, title, body, pos)

    # _category_.json for every sub-directory under framework/
    # label from the index.rst title where available.
    index_titles = {}
    for rel in rst_files:
        if os.path.basename(rel) == "index.rst":
            with open(os.path.join(SRC, rel), encoding="utf-8") as f:
                first = f.read().split("\n")
            for ln in first:
                if ln.strip() and not ln.startswith(".."):
                    index_titles[os.path.dirname(rel).replace("\\", "/")] = ln.strip()
                    break

    cat_only_dirs = {d: (t, p) for d, t, p in category_only}

    # _category_.json for each managed top-level folder and its sub-dirs.
    for m in MANAGED:
        base = os.path.join(DOCS, m)
        if not os.path.isdir(base):
            continue
        for root, dirs, files in os.walk(base):
            new_dir = os.path.relpath(root, DOCS).replace("\\", "/")
            old_dir = to_old(new_dir)
            is_top = "/" not in new_dir
            label = (LABEL_OVERRIDE.get(new_dir) or index_titles.get(old_dir)
                     or os.path.basename(root).replace("-", " ").title())
            base_pos = folder_pos.get(old_dir)
            if is_top and base_pos is not None:
                pos = base_pos + TOP_OFFSET
            else:
                pos = base_pos
            cat = {"label": label}
            if pos is not None:
                cat["position"] = pos
            has_index = os.path.exists(os.path.join(root, "index.md"))
            if old_dir in cat_only_dirs or not has_index:
                cat["link"] = {"type": "generated-index", "title": label}
            with open(os.path.join(root, "_category_.json"), "w",
                      encoding="utf-8", newline="\n") as f:
                json.dump(cat, f, indent=2)

    md_count = sum(1 for m in MANAGED for r, _, fs in os.walk(os.path.join(DOCS, m))
                   for x in fs if x.endswith(".md"))
    cat_count = sum(1 for m in MANAGED for r, _, fs in os.walk(os.path.join(DOCS, m))
                    for x in fs if x == "_category_.json")
    print(f"Wrote {md_count} markdown pages and {cat_count} category files "
          f"to {len(MANAGED)} top-level docs categories")


if __name__ == "__main__":
    main()
