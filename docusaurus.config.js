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
        docsRouteBasePath: '/docs',
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/unysonplus-banner.jpg',
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
        copyright: `Copyright © ${new Date().getFullYear()} Unyson+. Built with Docusaurus.`,
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
