import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Drag & Drop Page Builder',
    icon: '🧱',
    description: (
      <>
        Build pages visually with ready-made shortcodes. Lay out content with a
        true drag &amp; drop builder — no code required.
      </>
    ),
  },
  {
    title: 'Powerful Options Framework',
    icon: '🎛️',
    description: (
      <>
        Dozens of option types — typography, color, media, spacing, gradients and
        more — to build rich theme settings and meta boxes fast.
      </>
    ),
  },
  {
    title: 'Modular Extensions',
    icon: '🧩',
    description: (
      <>
        Add only what you need: Portfolio, Sidebars, Breadcrumbs, SEO, Forms,
        Custom Fields, Post Types and more — each installable on demand.
      </>
    ),
  },
  {
    title: 'Custom Fields & Post Types',
    icon: '🗂️',
    description: (
      <>
        Create ACF-style custom fields and register custom post types and
        taxonomies right from the WordPress admin — no code.
      </>
    ),
  },
  {
    title: 'GitHub Auto-Updates',
    icon: '🔄',
    description: (
      <>
        The framework, theme and every extension update straight from GitHub —
        push a change and your sites pick it up automatically.
      </>
    ),
  },
  {
    title: 'Free & Open Source',
    icon: '💛',
    description: (
      <>
        GPL-licensed and free to use. Built on the proven Unyson foundation and
        modernized for PHP 7.4+ and current WordPress.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon} role="img" aria-label={title}>
          {icon}
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
