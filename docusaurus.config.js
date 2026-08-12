// @ts-check
// Docusaurus config for the Unyson+ marketing site + manual.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// Local plugin: collects every page (all docs instances + both blogs + the home page)
// at build time and exposes them as global data, so the HTML sitemap page at /sitemap
// auto-populates — new docs/blog pages appear with no manual edits. Titles + real
// permalinks only, grouped + ordered for a human-readable, Google-crawlable index.
function sitemapDataPlugin() {
  // Section id → display label + sort order (unknown instances fall to the end).
  const DOCS_LABELS = {
    default: 'Manual',
    animationEngine: 'Animation Engine',
    theme: 'The Theme',
    guides: 'Guides',
    aiDevKit: 'AI Dev Kit',
  };
  const BLOG_LABELS = {default: 'News', decisions: 'Design Decisions'};
  const ORDER = [
    'Main',
    'Manual',
    'Animation Engine',
    'The Theme',
    'Guides',
    'AI Dev Kit',
    'News',
    'Design Decisions',
  ];
  return {
    name: 'sitemap-data',
    async allContentLoaded({allContent, actions}) {
      const groups = new Map();
      const push = (label, title, permalink) => {
        if (!permalink || !title) return;
        if (!groups.has(label)) groups.set(label, []);
        groups.get(label).push({title: String(title), permalink});
      };

      // Standalone pages we want listed (the home page).
      push('Main', 'Home', '/');

      // All docs instances.
      const docs = allContent['docusaurus-plugin-content-docs'] || {};
      for (const [instanceId, content] of Object.entries(docs)) {
        const versions = content?.loadedVersions || [];
        const version = versions.find((v) => v.isLast) || versions[0];
        if (!version) continue;
        const label = DOCS_LABELS[instanceId] || instanceId;
        for (const d of version.docs || []) push(label, d.title, d.permalink);
      }

      // Both blog instances.
      const blogs = allContent['docusaurus-plugin-content-blog'] || {};
      for (const [instanceId, content] of Object.entries(blogs)) {
        const label = BLOG_LABELS[instanceId] || `Blog (${instanceId})`;
        for (const p of content?.blogPosts || [])
          push(label, p.metadata?.title, p.metadata?.permalink);
      }

      // Order groups, sort items within each group by title.
      const ordered = [...groups.entries()]
        .sort((a, b) => {
          const ia = ORDER.indexOf(a[0]);
          const ib = ORDER.indexOf(b[0]);
          return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
        })
        .map(([label, items]) => ({
          label,
          items: items.sort((x, y) => x.title.localeCompare(y.title)),
        }));

      actions.setGlobalData({groups: ordered});
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Unyson+',
  tagline: 'The WordPress framework you build sites on.',
  favicon: 'img/unysonplus-logo.jpg',

  future: {
    v4: true,
  },

  // Production URL (org GitHub Pages site).
  url: 'https://unysonplus.github.io',
  // Served from the domain root.
  baseUrl: '/',

  // GitHub Pages deployment config.
  organizationName: 'UnysonPlus', // GitHub org
  projectName: 'UnysonPlus.github.io', // repo name
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // Start lenient so a half-written manual doesn't fail the build; tighten to 'throw' later.
  onBrokenLinks: 'warn',

  markdown: {
    // .md files parse as lenient CommonMark (so legacy docs with {braces} and
    // <tags> in prose don't crash the MDX compiler); .mdx still parses as MDX.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      // Some legacy pages reference old screenshots not committed to the repo;
      // warn (don't fail) so they can be dropped into static/img/legacy/ later.
      onBrokenMarkdownImages: 'warn',
    },
  },

  // Offline, client-side search (replaces the old Sphinx "Search docs" box).
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: ['/docs', '/animation-engine', '/theme', '/guides', '/ai-dev-kit'],
        // Index BOTH blog instances: the News blog (/blog) and the Design Decisions blog
        // (/decisions). Without this the plugin only indexes the default /blog, so decisions
        // posts never show up in search.
        blogRouteBasePath: ['/blog', '/decisions'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Unyson+ News',
          blogDescription: 'Release notes and announcements for the Unyson+ framework.',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Standalone docs instances — each its own section, route base, and sidebar,
  // separate from the Manual (the docsSidebar). All surfaced in the navbar.
  plugins: [
    sitemapDataPlugin,
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Pages that moved when Custom Fields + Post Types were promoted out of
        // Extensions into the Data & Content Modeling section.
        redirects: [
          {from: '/docs/extensions/custom-fields', to: '/docs/data-modeling/custom-fields'},
          {from: '/docs/extensions/post-types', to: '/docs/data-modeling/post-types'},
          // The icon-v2 / icon-v3 option-type ids were consolidated into one `icon` type.
          {from: '/docs/options/option-types/icon-v2', to: '/docs/options/option-types/icon'},
        ],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'animationEngine',
        path: 'animation-engine',
        routeBasePath: 'animation-engine',
        sidebarPath: './sidebarsAnimationEngine.js',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'theme',
        path: 'theme',
        routeBasePath: 'theme',
        sidebarPath: './sidebarsTheme.js',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: './sidebarsGuides.js',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'aiDevKit',
        path: 'ai-dev-kit',
        routeBasePath: 'ai-dev-kit',
        sidebarPath: './sidebarsAiDevKit.js',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
    // Design Decisions — a dated log of WHY the framework works the way it does
    // (the reasoning behind key architecture/design choices). A second, separate
    // blog instance so it stays distinct from the "News" release feed.
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'decisions',
        path: 'decisions',
        routeBasePath: 'decisions',
        blogTitle: 'Design Decisions',
        blogDescription: 'Why Unyson+ works the way it does — the reasoning behind key design and architecture decisions.',
        blogSidebarTitle: 'All decisions',
        blogSidebarCount: 'ALL',
        showReadingTime: true,
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/unysonplus-banner.jpg',
      metadata: [
        { name: 'google-site-verification', content: 'RJWp7_zYZ1K3W8ybjbfGZ07kZrX2AZTGK5S-_STFMCw' },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Unyson+',
        logo: {
          alt: 'Unyson+ Logo',
          src: 'img/unysonplus-logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Manual',
          },
          {
            type: 'docSidebar',
            sidebarId: 'animationEngineSidebar',
            docsPluginId: 'animationEngine',
            position: 'left',
            label: 'Animation Engine',
          },
          {
            type: 'docSidebar',
            sidebarId: 'themeSidebar',
            docsPluginId: 'theme',
            position: 'left',
            label: 'The Theme',
          },
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            docsPluginId: 'guides',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'aiDevKitSidebar',
            docsPluginId: 'aiDevKit',
            position: 'left',
            label: 'AI Dev Kit',
          },
          {to: '/decisions', label: 'Design Decisions', position: 'left'},
          {to: '/blog', label: 'News', position: 'left'},
          {
            href: 'https://github.com/UnysonPlus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Manual',
            items: [
              {label: 'Introduction', to: '/docs/intro'},
              {label: 'Installation', to: '/docs/installation'},
              {label: 'Extensions', to: '/docs/extensions/overview'},
            ],
          },
          {
            title: 'Project',
            items: [
              {label: 'GitHub Org', href: 'https://github.com/UnysonPlus'},
              {label: 'Plugin Repo', href: 'https://github.com/UnysonPlus/UnysonPlus'},
              {label: 'Theme Repo', href: 'https://github.com/UnysonPlus/UnysonPlus-Theme'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'News', to: '/blog'},
              {label: 'Sitemap', to: '/sitemap'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Unyson+. Created by <a href="/blog/authors/jon">Jon-Michael Lastimosa</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        // Highlight the languages used in a WordPress plugin manual.
        additionalLanguages: ['php', 'bash', 'json', 'scss'],
      },
    }),
};

export default config;
