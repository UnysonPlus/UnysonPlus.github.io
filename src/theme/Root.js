import React from 'react';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';

// SEO: mark thin, near-duplicate index pages as noindex so search engines skip
// them but still follow the links to the real content. These are the blog/
// decisions tag lists, author lists, `/page/N` pagination, archives, the search
// page and the stray markdown-page — the same set that showed up in Search
// Console as "Discovered – currently not indexed" and that we also exclude from
// the XML sitemap (see the `sitemap.ignorePatterns` in docusaurus.config.js).
//
// Root wraps every route, and Docusaurus pre-renders each page with its own
// location, so the tag lands in the static HTML for matching routes.
const NOINDEX_PATTERNS = [
  /\/tags(\/|$)/,
  /\/authors(\/|$)/,
  /\/page\/\d+\/?$/,
  /\/archive\/?$/,
  /^\/search\/?$/,
  /^\/markdown-page\/?$/,
];

export default function Root({children}) {
  const {pathname} = useLocation();
  const noindex = NOINDEX_PATTERNS.some((re) => re.test(pathname));
  return (
    <>
      {noindex && (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      )}
      {children}
    </>
  );
}
