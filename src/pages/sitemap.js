import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './sitemap.module.css';

// A human-readable, Google-crawlable HTML sitemap. The page list is built at build
// time by the local `sitemap-data` plugin (see docusaurus.config.js), so every docs
// page and blog post appears automatically — no manual maintenance when pages are added.
export default function Sitemap() {
  const data = usePluginData('sitemap-data') || {};
  const groups = data.groups || [];
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Layout
      title="Sitemap"
      description="A complete, browsable index of every page on the Unyson+ documentation site — the manual, Animation Engine, the theme, guides, the AI Dev Kit, news and design decisions.">
      <main className="container margin-vert--lg">
        <h1>Sitemap</h1>
        <p>
          Every page on this site, grouped by section — {total} pages in all. Looking for the
          machine-readable version? It's at <a href="/sitemap.xml">/sitemap.xml</a>.
        </p>

        <div className={styles.grid}>
          {groups.map((group) => (
            <section key={group.label} className={styles.section}>
              <h2 className={styles.heading}>
                {group.label}{' '}
                <span className={styles.count}>({group.items.length})</span>
              </h2>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.permalink}>
                    <Link to={item.permalink}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
