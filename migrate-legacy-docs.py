#!/usr/bin/env python3
"""
One-shot migration: legacy Sphinx/RST docs  ->  Docusaurus Markdown.

Source:  ../UnysonPlus-Documentation  (95 .rst files)
Target:  ./docs/framework/...          (mirrors the old tree under one section)

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
DEST = os.path.join(HERE, "docs", "framework")
URL_BASE = "/docs/framework"

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
        return URL_BASE
    if absp.endswith("/index"):
        return f"{URL_BASE}/{absp[:-len('/index')]}"
    return f"{URL_BASE}/{absp}"


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


def clean_markdown(md, raw_blocks):
    md = gh_alerts_to_admonitions(md)
    # normalize ``` php  ->  ```php
    md = re.sub(r"^``` (\w[\w+-]*)\s*$", r"```\1", md, flags=re.M)
    # legacy Sphinx image paths -> static/img/legacy
    md = md.replace("](/_images/", "](/img/legacy/").replace("](_images/", "](/img/legacy/")
    # restore raw html
    for idx, html in enumerate(raw_blocks):
        md = md.replace(f"@@RAWHTML{idx}@@", html)
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
    # Clear DEST contents without removing the root dir (Windows may lock it).
    if os.path.isdir(DEST):
        for entry in os.listdir(DEST):
            p = os.path.join(DEST, entry)
            if os.path.isdir(p):
                shutil.rmtree(p, ignore_errors=True)
            else:
                try:
                    os.remove(p)
                except OSError:
                    pass
    os.makedirs(DEST, exist_ok=True)

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
        cur_dir = old_dir_of(rel)
        md = convert_file(os.path.join(SRC, rel), cur_dir)
        title, body = split_title(md)
        if rel == "index.rst":
            title = "Unyson Framework"          # avoid clashing with the new intro
        stem = os.path.splitext(os.path.basename(rel))[0]
        dest_rel = rel[:-4] + ".md"           # keep tree, .rst -> .md
        dest_path = os.path.join(DEST, dest_rel)
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

    for root, dirs, files in os.walk(DEST):
        relroot = os.path.relpath(root, DEST).replace("\\", "/")
        if relroot == ".":
            continue
        old_dir = relroot  # same tree
        label = index_titles.get(old_dir, os.path.basename(root).replace("-", " ").title())
        pos = folder_pos.get(old_dir)
        cat = {"label": label}
        if pos is not None:
            cat["position"] = pos
        has_index = os.path.exists(os.path.join(root, "index.md"))
        if old_dir in cat_only_dirs or not has_index:
            cat["link"] = {"type": "generated-index",
                           "title": label,
                           "slug": f"/framework/{old_dir}"}
        with open(os.path.join(root, "_category_.json"), "w",
                  encoding="utf-8", newline="\n") as f:
            json.dump(cat, f, indent=2)

    # top-level framework/_category_.json (the section itself)
    top = {"label": "Framework Reference", "position": 7,
           "collapsed": True,
           "link": {"type": "doc", "id": "framework/index"}}
    with open(os.path.join(DEST, "_category_.json"), "w",
              encoding="utf-8", newline="\n") as f:
        json.dump(top, f, indent=2)

    # report
    n = sum(len(fs) for _, _, fs in os.walk(DEST) for f2 in [0])
    md_count = sum(1 for r, _, fs in os.walk(DEST) for x in fs if x.endswith(".md"))
    cat_count = sum(1 for r, _, fs in os.walk(DEST) for x in fs if x == "_category_.json")
    print(f"Wrote {md_count} markdown pages and {cat_count} category files to docs/framework")


if __name__ == "__main__":
    main()
