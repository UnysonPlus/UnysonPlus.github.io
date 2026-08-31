import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const HIGHLIGHTS = [
  {value: '100+', label: 'Builder Elements'},
  {value: '21', label: 'Extensions'},
  {value: 'Free', label: 'GPL Licensed'},
  {value: 'Auto', label: 'GitHub Updates'},
];

const CLEAN_MARKUP = `<section>
  <div class="fw-container">
    <div class="fw-row">
      <div class="fw-col-12">
        <h2>Fast by default</h2>
        <p>Clean markup. One stylesheet. No div soup.</p>
        <a class="btn btn-primary" href="/start">Get started</a>
      </div>
    </div>
  </div>
</section>`;

const CLEAN_POINTS = [
  'Semantic HTML, not stacks of nested wrapper divs',
  'One generated stylesheet, no inline styles on every element',
  'Lighter pages and better Core Web Vitals, for free',
];

const OPTIONS_CODE = `$options = array(
  'brand_color' => array(
    'type'  => 'color-picker',
    'label' => 'Brand color',
  ),
  'heading_font' => array(
    'type'  => 'typography',
    'label' => 'Headings',
  ),
  'container_width' => array(
    'type'  => 'unit-input',
    'label' => 'Content width',
  ),
);`;

const OPTIONS_POINTS = [
  'Dozens of option types: color, typography, media, spacing, gradients, repeaters, and more',
  'One API for Theme Settings, element options, and post meta boxes',
  'Saved values become design tokens the whole site reads',
];

const FIELD_ROWS = [
  {name: 'Price', type: 'number'},
  {name: 'Photo gallery', type: 'gallery'},
  {name: 'Amenities', type: 'checkboxes'},
  {name: 'Location', type: 'map'},
  {name: 'Featured', type: 'switch'},
];

const FIELD_POINTS = [
  'Field groups built on the same option types as everything else',
  'Register post types and taxonomies without writing code',
  'Read field values in templates, or show them in the page builder',
];

function CheckList({points}) {
  return (
    <ul className={styles.cleanList}>
      {points.map((point) => (
        <li key={point} className={styles.cleanListItem}>
          <svg
            className={styles.cleanCheck}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function CodeCard({name, code, caption}) {
  return (
    <figure className={styles.codeCard}>
      <div className={styles.codeBar}>
        <span className={styles.codeDot} />
        <span className={styles.codeDot} />
        <span className={styles.codeDot} />
        <span className={styles.codeName}>{name}</span>
      </div>
      <pre className={styles.codePre}>
        <code>{code}</code>
      </pre>
      {caption && <figcaption className={styles.codeCaption}>{caption}</figcaption>}
    </figure>
  );
}

function FieldPanel() {
  return (
    <figure className={styles.fieldPanel}>
      <div className={styles.fieldPanelBar}>
        <span className={styles.fieldPanelDot} />
        Property · custom post type
      </div>
      {FIELD_ROWS.map((row) => (
        <div key={row.name} className={styles.fieldRow}>
          <span className={styles.fieldName}>{row.name}</span>
          <span className={styles.fieldType}>{row.type}</span>
        </div>
      ))}
      <figcaption className={styles.fieldPanelFoot}>
        Defined in the admin, read with one call: <code>fw_get_db_post_option()</code>.
      </figcaption>
    </figure>
  );
}

function Spotlight({title, lead, points, linkText, linkTo, reverse, visual}) {
  return (
    <div className={clsx(styles.spotlightRow, reverse && styles.spotlightReverse)}>
      <div className={styles.spotlightText}>
        <Heading as="h3" className={styles.cleanDomTitle}>
          {title}
        </Heading>
        <p className={styles.cleanDomLead}>{lead}</p>
        <CheckList points={points} />
        <Link className={styles.cleanLink} to={linkTo}>
          {linkText}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
      <div className={styles.spotlightVisual}>{visual}</div>
    </div>
  );
}

function FrameworkStory() {
  return (
    <section className={styles.frameworkStory}>
      <div className="container">
        <SectionHeader
          eyebrow="Not just a page builder"
          title="The building blocks of a WordPress site"
        />
        <p className={styles.frameworkLead}>
          Unyson+ ships the parts a real project needs: a settings framework, custom fields,
          content types, a page builder, and a theme builder. Turn on the pieces you want and
          leave the rest.
        </p>
        <div className={styles.spotlights}>
          <Spotlight
            title="A settings framework behind every option"
            lead="Theme Settings, page-builder element options, and post meta boxes are all built from the same option types. Define a control panel for color, typography, layout, and chrome as a plain array, and the framework renders, validates, and saves it."
            points={OPTIONS_POINTS}
            linkText="Explore the options framework"
            linkTo="/options/introduction"
            visual={
              <CodeCard
                name="theme-settings.php"
                code={OPTIONS_CODE}
                caption="One options array becomes a full settings UI, validated and saved for you."
              />
            }
          />
          <Spotlight
            reverse
            title="Custom fields and post types, from the admin"
            lead="Structure content the way a project needs. Build field groups and register custom post types and taxonomies right in the WordPress admin, then read the values in a template or bind them to a builder element."
            points={FIELD_POINTS}
            linkText="See custom fields and post types"
            linkTo="/extensions/overview"
            visual={<FieldPanel />}
          />
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const bannerUrl = useBaseUrl('img/unysonplus-banner.jpg');
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className="sr-only">
          {siteConfig.title}
        </Heading>
        <p className={styles.eyebrow}>For WordPress developers</p>
        <img
          src={bannerUrl}
          alt="Unyson+ Framework Plugin"
          className={styles.heroBannerImg}
        />
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <p className={styles.heroSubtitle}>
          Custom fields, theme settings, a page builder, a theme builder.{' '}
          <span className={styles.heroSubtitleLine}>
            Take one piece or the whole thing. Free, no license keys.
          </span>
        </p>

        <ul className={styles.highlights}>
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className={styles.highlight}>
              <span className={styles.highlightValue}>{h.value}</span>
              <span className={styles.highlightLabel}>{h.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.buttons}>
          <Link
            className="button button--brand-orange button--lg"
            href="https://github.com/UnysonPlus/UnysonPlus">
            Get the Plugin (Free)
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.ghostButton)}
            to="/intro">
            Read the Manual
          </Link>
        </div>
      </div>
    </header>
  );
}

function CleanDomBand() {
  return (
    <section className={styles.cleanDom}>
      <div className={clsx('container', styles.cleanDomGrid)}>
        <div className={styles.cleanDomText}>
          <p className={styles.sectionEyebrow}>The best part</p>
          <Heading as="h2" className={styles.cleanDomTitle}>
            A visual builder that ships clean HTML
          </Heading>
          <p className={styles.cleanDomLead}>
            Most drag &amp; drop builders bury your content under layers of nested divs and
            scatter inline styles through the markup. Unyson+ outputs lean, semantic HTML and
            compiles your whole design into one stylesheet. The page stays fast, the markup
            stays readable, and the theme stays yours.
          </p>
          <ul className={styles.cleanList}>
            {CLEAN_POINTS.map((point) => (
              <li key={point} className={styles.cleanListItem}>
                <svg
                  className={styles.cleanCheck}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link className={styles.cleanLink} to="/page-builder/clean-dom">
            See the clean-DOM philosophy
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <figure className={styles.codeCard}>
          <div className={styles.codeBar}>
            <span className={styles.codeDot} />
            <span className={styles.codeDot} />
            <span className={styles.codeDot} />
            <span className={styles.codeName}>page output</span>
          </div>
          <pre className={styles.codePre}>
            <code>{CLEAN_MARKUP}</code>
          </pre>
          <figcaption className={styles.codeCaption}>
            Real Unyson+ output: just the grid and your content. No per-element wrapper soup, no inline styles.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function SectionHeader({eyebrow, title}) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.sectionEyebrow}>{eyebrow}</p>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
    </div>
  );
}

function ClosingCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <p className={styles.sectionEyebrow}>Start building</p>
        <Heading as="h2" className={styles.sectionTitle}>
          Get Unyson+ for Free
        </Heading>
        <p className={styles.ctaText}>
          Free and GPL-licensed, forever. Install the plugin and turn on only what you
          need, from custom fields to the full page builder.
        </p>
        <Link
          className="button button--brand-orange button--lg"
          href="https://github.com/UnysonPlus/UnysonPlus">
          Download Unyson+ (Free)
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — WordPress theme framework`}
      description="Unyson+ is a free, modular WordPress framework for developers: custom fields, theme settings, a page builder, and a theme builder. Take one piece or the whole thing. GPL licensed, no license keys.">
      <HomepageHeader />
      <main>
        <FrameworkStory />
        <CleanDomBand />
        <section className={styles.featuresBand}>
          <div className="container">
            <SectionHeader
              eyebrow="Everything in one framework"
              title="More than a page builder"
            />
          </div>
          <HomepageFeatures />
        </section>
        <ClosingCTA />
      </main>
    </Layout>
  );
}
