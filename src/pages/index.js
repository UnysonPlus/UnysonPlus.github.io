import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const HIGHLIGHTS = [
  {value: '54', label: 'Builder Elements'},
  {value: '20+', label: 'Extensions'},
  {value: 'Free', label: 'GPL Licensed'},
  {value: 'Auto', label: 'GitHub Updates'},
];

const CLEAN_MARKUP = `<section class="section">
  <div class="container">
    <h2>Fast by default</h2>
    <p>Clean markup. One stylesheet. No div soup.</p>
    <a class="btn btn-primary" href="/start">Get started</a>
  </div>
</section>`;

const CLEAN_POINTS = [
  'Semantic HTML, not stacks of nested wrapper divs',
  'One generated stylesheet, no inline styles on every element',
  'Lighter pages and better Core Web Vitals, for free',
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const bannerUrl = useBaseUrl('img/unysonplus-banner.jpg');
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className="sr-only">
          {siteConfig.title}
        </Heading>
        <p className={styles.eyebrow}>Ready to build premium WordPress themes?</p>
        <img
          src={bannerUrl}
          alt="Unyson+ Framework Plugin"
          className={styles.heroBannerImg}
        />
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

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
            to="/docs/intro">
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
          <Link className={styles.cleanLink} to="/docs/page-builder/clean-dom">
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
            Real Unyson+ output. No wrapper soup, no inline styles.
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
        <p className={styles.sectionEyebrow}>Start building your premium WordPress theme</p>
        <Heading as="h2" className={styles.sectionTitle}>
          Get Unyson+ for Free
        </Heading>
        <p className={styles.ctaText}>
          Free and GPL-licensed, forever. Install the plugin and start theming with the
          drag &amp; drop builder, options framework, and extensions.
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
      description="Unyson+ is a free drag & drop framework for WordPress that helps you build premium themes fast, with a visual page builder, an options framework, and modular extensions.">
      <HomepageHeader />
      <main>
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
