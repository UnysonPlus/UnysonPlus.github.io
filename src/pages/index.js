import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const HIGHLIGHTS = [
  {value: '27', label: 'Builder Elements'},
  {value: '20+', label: 'Extensions'},
  {value: 'Free', label: 'GPL Licensed'},
  {value: 'Auto', label: 'GitHub Updates'},
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
            Get the Plugin — Free
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
          Get Unyson+ — Free
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
        <section className={styles.featuresBand}>
          <div className="container">
            <SectionHeader
              eyebrow="Check out the Unyson+ framework"
              title="Built-in Extensions & Options"
            />
          </div>
          <HomepageFeatures />
        </section>
        <ClosingCTA />
      </main>
    </Layout>
  );
}
