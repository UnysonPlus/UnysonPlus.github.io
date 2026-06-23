import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Thin-line icons (Feather-style), colored via currentColor to match the brand.
const Icon = ({children}) => (
  <svg
    className={styles.featureIcon}
    width="56"
    height="56"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    {children}
  </svg>
);

const FeatureList = [
  {
    title: 'Drag & Drop Page Builder',
    Svg: (
      <Icon>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </Icon>
    ),
    description: (
      <>
        Build pages visually with ready-made shortcodes. Lay out content with a true
        drag &amp; drop builder, no code required.
      </>
    ),
  },
  {
    title: 'Theme Builder',
    Svg: (
      <Icon>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="8" x2="21" y2="8" />
        <line x1="3" y1="16" x2="21" y2="16" />
      </Icon>
    ),
    description: (
      <>
        Design headers, footers and page templates with the same visual builder. Ship them
        in a child theme, or override any template from the WordPress admin.
      </>
    ),
  },
  {
    title: 'Powerful Options Framework',
    Svg: (
      <Icon>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </Icon>
    ),
    description: (
      <>
        Dozens of option types (typography, color, media, spacing, gradients and more)
        to build rich theme settings and meta boxes fast.
      </>
    ),
  },
  {
    title: 'Modular Extensions',
    Svg: (
      <Icon>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </Icon>
    ),
    description: (
      <>
        Add only what you need: Portfolio, Sidebars, Breadcrumbs, SEO, Forms, Custom
        Fields, Post Types and more — each installable on demand.
      </>
    ),
  },
  {
    title: 'Custom Fields & Post Types',
    Svg: (
      <Icon>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </Icon>
    ),
    description: (
      <>
        Create ACF-style custom fields and register custom post types and taxonomies
        right from the WordPress admin — no code.
      </>
    ),
  },
  {
    title: 'GitHub Auto-Updates',
    Svg: (
      <Icon>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </Icon>
    ),
    description: (
      <>
        The framework, theme and every extension update straight from GitHub — push a
        change and your sites pick it up automatically.
      </>
    ),
  },
  {
    title: 'Free & Open Source',
    Svg: (
      <Icon>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </Icon>
    ),
    description: (
      <>
        GPL-licensed and free to use. Built on the proven Unyson foundation and
        modernized for PHP 7.4+ and current WordPress.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureIconWrap}>{Svg}</div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureText}>{description}</p>
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
