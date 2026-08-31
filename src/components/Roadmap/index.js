import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * <Roadmap /> — renders the POS Sync roadmap from src/data/pos-roadmap.json.
 *
 * Task status is NOT hand-maintained: `scripts/gen-pos-roadmap.mjs` scans the real
 * extension source tree and rewrites the JSON, so this page reflects what actually
 * exists on disk. See the "How this page stays current" section of the roadmap doc.
 */

const LABELS = {
  done: 'Done',
  'in-progress': 'In progress',
  planned: 'Planned',
};

/**
 * The JSON carries light inline markdown (`code`, **bold**, *italic*) so the same
 * source reads well in the file and on the page. Render just those three — anything
 * heavier belongs in the prose sections of the doc, not in a roadmap line.
 */
function inline(text) {
  const out = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<code key={key++}>{m[1]}</code>);
    else if (m[2] !== undefined) out.push(<strong key={key++}>{m[2]}</strong>);
    else out.push(<em key={key++}>{m[3]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function statusOf(milestone) {
  const tasks = milestone.tasks || [];
  const done = tasks.filter((t) => t.status === 'done').length;
  const active = tasks.filter((t) => t.status === 'in-progress').length;
  if (tasks.length && done === tasks.length) return 'done';
  if (done || active) return 'in-progress';
  return 'planned';
}

function Bar({done, total}) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className={styles.bar} role="img" aria-label={`${pct}% complete`}>
      <div className={styles.barFill} style={{width: `${pct}%`}} />
    </div>
  );
}

export function RoadmapSummary({data}) {
  const tasks = data.milestones.flatMap((m) => m.tasks);
  const done = tasks.filter((t) => t.status === 'done').length;
  const active = tasks.filter((t) => t.status === 'in-progress').length;
  const stamp = data.generatedAt ? new Date(data.generatedAt) : null;

  return (
    <div className={styles.summary}>
      <div className={styles.summaryHead}>
        <strong>
          {done} of {tasks.length} tasks complete
        </strong>
        <span className={styles.muted}>
          {active > 0 && `${active} in progress · `}
          {data.extensionVersion
            ? `extension v${data.extensionVersion}`
            : 'not yet scaffolded'}
        </span>
      </div>
      <Bar done={done} total={tasks.length} />
      {stamp && (
        <p className={styles.stamp}>
          Verified against the extension source on{' '}
          {stamp.toISOString().slice(0, 10)}
          {!data.detected && ' — source tree not present at scan time'}.
        </p>
      )}
    </div>
  );
}

export default function Roadmap({data}) {
  return (
    <div className={styles.roadmap}>
      {data.milestones.map((milestone) => {
        const tasks = milestone.tasks || [];
        const done = tasks.filter((t) => t.status === 'done').length;
        const status = statusOf(milestone);

        return (
          <section key={milestone.id} className={styles.milestone}>
            <header className={styles.milestoneHead}>
              <h3 className={styles.milestoneTitle}>
                {milestone.title}
                <span className={clsx(styles.badge, styles[`badge_${status.replace('-', '')}`])}>
                  {LABELS[status]}
                </span>
              </h3>
              <span className={styles.count}>
                {done}/{tasks.length}
              </span>
            </header>

            <p className={styles.goal}>{inline(milestone.goal)}</p>
            <Bar done={done} total={tasks.length} />

            <ul className={styles.tasks}>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={clsx(
                    styles.task,
                    styles[`task_${(task.status || 'planned').replace('-', '')}`]
                  )}
                >
                  <span className={styles.mark} aria-hidden="true">
                    {task.status === 'done' ? '✓' : task.status === 'in-progress' ? '◐' : '○'}
                  </span>
                  <div className={styles.taskBody}>
                    <span className={styles.taskTitle}>{inline(task.title)}</span>
                    <span className={styles.srOnly}>
                      {' '}
                      — {LABELS[task.status || 'planned']}
                    </span>
                    <p className={styles.taskDetail}>{inline(task.detail)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
