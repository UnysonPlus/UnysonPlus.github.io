import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const bannerUrl = useBaseUrl('img/unysonplus-banner.jpg');
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        {/* Visually-hidden H1 keeps the page accessible/SEO-friendly while the banner shows the brand. */}
        <Heading as="h1" className="sr-only">
          {siteConfig.title}
        </Heading>
        <img
          src={bannerUrl}
          alt="Unyson+ Framework Plugin"
          className={styles.heroBannerImg}
        />
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the Manual
          </Link>
          <Link
            className="button button--secondary button--outline button--lg"
            style={{marginLeft: '1rem'}}
            href="https://github.com/UnysonPlus/UnysonPlus">
            Get the Plugin
          </Link>
        </div>
      </div>
    </header>
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
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
