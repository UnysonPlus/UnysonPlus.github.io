/**
 * Builds the data behind <CodeWorkspace />.
 *
 * Every folder in examples/ is a real, runnable example. For each one this writes:
 *   src/data/code-examples/<name>.json   the files + their notes, imported by the page
 *   static/code-examples/<name>.zip      the "Download" button (folder <name>/ at the zip root)
 *
 * An optional examples/<name>/.workspace.json sets the title, the file opened first, and a
 * per-file note / highlighted lines. It is not shown in the tree or included in the zip.
 *
 * Runs before `npm run start` and `npm run build` (prestart / prebuild), so editing an
 * example file is all it takes.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXAMPLES = path.join(ROOT, 'examples');
const DATA_OUT = path.join(ROOT, 'src/data/code-examples');
const ZIP_OUT = path.join(ROOT, 'static/code-examples');

const SKIP = new Set(['node_modules', '.next', 'dist', 'build', '.git', '.workspace.json', '.env.local']);

const LANGS = {
  ts: 'typescript', tsx: 'tsx', js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'jsx',
  json: 'json', php: 'php', css: 'css', scss: 'scss', md: 'markdown', html: 'markup',
  yml: 'yaml', yaml: 'yaml', sh: 'bash', env: 'bash', example: 'bash', txt: 'text',
};

function language(file) {
  const base = path.basename(file);
  if (base.startsWith('.env')) return 'bash';
  return LANGS[base.split('.').pop()] || 'text';
}

function walk(dir, rel = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), relPath));
    else out.push(relPath);
  }
  return out;
}

// Folders before files at every level, then alphabetical — the order an editor shows.
function treeOrder(a, b) {
  const pa = a.split('/');
  const pb = b.split('/');
  for (let i = 0; i < Math.min(pa.length, pb.length); i++) {
    if (pa[i] === pb[i]) continue;
    const aDir = i < pa.length - 1;
    const bDir = i < pb.length - 1;
    if (aDir !== bDir) return aDir ? -1 : 1;
    return pa[i].localeCompare(pb[i]);
  }
  return pa.length - pb.length;
}

/* ---- A small zip writer (deflate). Node 20 has no zlib.crc32, so carry a table. ---- */

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  // Fixed timestamp (2026-01-01) so an unchanged example produces an identical zip.
  const time = 0;
  const date = ((2026 - 1980) << 9) | (1 << 5) | 1;

  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const packed = zlib.deflateRawSync(data, { level: 9 });
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    locals.push(local, nameBuf, packed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(packed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);

    offset += 30 + nameBuf.length + packed.length;
  }

  const centralSize = centrals.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, ...centrals, end]);
}

/* ---- Main ---- */

function writeIfChanged(file, data) {
  if (fs.existsSync(file) && fs.readFileSync(file).equals(Buffer.from(data))) return false;
  fs.writeFileSync(file, data);
  return true;
}

if (!fs.existsSync(EXAMPLES)) process.exit(0);
fs.mkdirSync(DATA_OUT, { recursive: true });
fs.mkdirSync(ZIP_OUT, { recursive: true });

for (const name of fs.readdirSync(EXAMPLES)) {
  const dir = path.join(EXAMPLES, name);
  if (!fs.statSync(dir).isDirectory()) continue;

  const metaFile = path.join(dir, '.workspace.json');
  const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};
  const notes = meta.files || {};
  const paths = walk(dir).sort(treeOrder);

  for (const p of Object.keys(notes)) {
    if (!paths.includes(p)) console.warn(`[code-examples] ${name}: .workspace.json names a missing file "${p}"`);
  }

  const files = paths.map((p) => {
    const code = fs.readFileSync(path.join(dir, p), 'utf8').replace(/\r\n/g, '\n');
    return {
      path: p,
      language: language(p),
      code: code.replace(/\n$/, ''),
      ...(notes[p]?.note ? { note: notes[p].note } : {}),
      ...(notes[p]?.highlight ? { highlight: notes[p].highlight } : {}),
    };
  });

  const data = {
    name,
    title: meta.title || name,
    open: paths.includes(meta.open) ? meta.open : paths[0],
    download: `/code-examples/${name}.zip`,
    files,
  };

  const json = JSON.stringify(data, null, 2) + '\n';
  const archive = zip(files.map((f) => ({ name: `${name}/${f.path}`, data: Buffer.from(f.code + '\n', 'utf8') })));

  const changed = [
    writeIfChanged(path.join(DATA_OUT, `${name}.json`), json),
    writeIfChanged(path.join(ZIP_OUT, `${name}.zip`), archive),
  ].some(Boolean);
  console.log(`[code-examples] ${name}: ${files.length} files${changed ? ' (updated)' : ''}`);
}
