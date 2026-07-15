// @ts-check
// Docusaurus config for the Unyson+ marketing site + manual.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Unyson+',
  tagline: 'A free drag & drop framework for building premium WordPress themes — fast.',
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
        docsRouteBasePath: ['/docs', '/animation-engine', '/theme', '/guides'],
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
