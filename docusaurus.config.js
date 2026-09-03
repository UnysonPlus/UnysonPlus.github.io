// @ts-check
// Docusaurus config for the Unyson+ marketing site + manual.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// Local plugin: collects every page (all docs instances + both blogs + the home page)
// at build time and exposes them as global data, so the HTML sitemap page at /sitemap
// auto-populates — new docs/blog pages appear with no manual edits. Titles + real
// permalinks only, grouped + ordered for a human-readable, Google-crawlable index.
// StatCounter analytics — injected just before </body> on every page.
function statcounterPlugin() {
  return {
    name: 'statcounter',
    injectHtmlTags() {
      return {
        postBodyTags: [
          '<script type="text/javascript">var sc_project=13352020; var sc_invisible=1; var sc_security="8d837d06";</script>',
          {tagName: 'script', attributes: {type: 'text/javascript', src: 'https://www.statcounter.com/counter/counter.js', async: true}},
          '<noscript><div class="statcounter"><a title="Web Analytics" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/13352020/0/8d837d06/1/" alt="Web Analytics" referrerPolicy="no-referrer-when-downgrade"></a></div></noscript>',
        ],
      };
    },
  };
}

function sitemapDataPlugin() {
  // Section id → display label + sort order (unknown instances fall to the end).
  const DOCS_LABELS = {
    default: 'Manual',
    animationEngine: 'Animation Engine',
    theme: 'The Theme',
    guides: 'Guides',
    aiDevKit: 'AI Dev Kit',
    learn: 'Web Dev Basics',
  };
  const BLOG_LABELS = {default: 'News', decisions: 'Design Decisions'};
  const ORDER = [
    'Main',
    'Manual',
    'Animation Engine',
    'The Theme',
    'Guides',
    'AI Dev Kit',
    'Web Dev Basics',
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
  url: 'https://docs.unysonplus.com',
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
        docsRouteBasePath: ['/', '/animation-engine', '/theme', '/guides', '/ai-dev-kit', '/blocks', '/learn'],
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
          // The Manual is the primary section and lives at the site root (no
          // "/docs" prefix — the domain is already docs.unysonplus.com). The
          // custom homepage (src/pages/index.js) still owns "/"; docs pages get
          // their own slugs (/intro, /extensions/overview, …). Old /docs/* URLs
          // are 301'd to the new roots by the client-redirects plugin below.
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
          // The Extensions section has its own top-level navbar item + sidebar
          // (extensionsSidebar), so drop the "Extensions" category from the
          // Manual sidebar (the autogenerated `.` tree) to avoid listing it in
          // both places. The /extensions/* pages and the dedicated sidebar are
          // untouched — only the Manual's copy of the category is filtered out.
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const items = await defaultSidebarItemsGenerator(args);
            if (args.item.dirName !== '.') return items;
            return items.filter(
              (it) => !(it.type === 'category' && it.label === 'Extensions'),
            );
          },
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
          // SEO housekeeping: the auto-generated archive + pagination pages are
          // thin, near-duplicate index pages with no unique content. Drop the
          // archive entirely, and show every post on one listing page so no
          // `/page/N` pagination URLs are produced. (Tag/author list pages are
          // kept for on-site browsing but noindex'd via src/theme/Root.js and
          // excluded from the XML sitemap below.)
          archiveBasePath: null,
          postsPerPage: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // Configure the (otherwise default) sitemap plugin the classic preset
        // ships. Keep thin, low-value index pages OUT of the sitemap so Google
        // stops discovering/queuing them (they showed up as ~76 "Discovered –
        // currently not indexed" URLs): tag lists, author lists, pagination,
        // archives, the search page and the stray markdown-page.
        sitemap: {
          ignorePatterns: [
            '/**/tags/**',
            '/**/authors/**',
            '/**/page/**',
            '/**/archive',
            '/search',
            '/search/**',
            '/markdown-page',
          ],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  // Standalone docs instances — each its own section, route base, and sidebar,
  // separate from the Manual (the docsSidebar). All surfaced in the navbar.
  plugins: [
    statcounterPlugin,
    sitemapDataPlugin,
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Pages that moved when Custom Fields + Post Types were promoted out of
        // Extensions into the Data & Content Modeling section.
        redirects: [
          {from: '/docs/extensions/custom-fields', to: '/data-modeling/custom-fields'},
          {from: '/docs/extensions/post-types', to: '/data-modeling/post-types'},
          // The icon-v2 / icon-v3 option-type ids were consolidated into one `icon` type.
          {from: '/docs/options/option-types/icon-v2', to: '/options/option-types/icon'},
          // Post Carousel was dropped (a duplicate of the Posts element).
          {from: '/docs/shortcodes/components/post-carousel', to: '/shortcodes/components/posts'},
          // Options Framework category given a clean slug (was the generated-index /docs/category/… URL).
          {from: '/docs/category/options-framework', to: '/options-framework'},
          // The Manual moved off the "/docs" prefix; keep the old landing working.
          {from: '/docs', to: '/intro'},
          // The Gutenberg Blocks docs merged into the Blocks section.
          {from: '/extensions/gutenberg', to: '/blocks/intro'},
        ],
        // The Manual moved from /docs/* to /* — 301 every old Manual URL to its
        // new root path. Only Manual pages are remapped; the other doc instances
        // (animation-engine, theme, guides, ai-dev-kit, reference, decisions),
        // the News blog, the homepage and standalone pages are left alone.
        createRedirects(existingPath) {
          // Per-block docs moved from /extensions/gutenberg/<name> to the Blocks
          // library at /blocks/library/<name> — 301 the old block URLs.
          if (existingPath.startsWith('/blocks/library/')) {
            const name = existingPath.slice('/blocks/library/'.length);
            return name ? ['/extensions/gutenberg/' + name] : undefined;
          }
          const OTHER = [
            '/animation-engine', '/theme', '/guides', '/ai-dev-kit',
            '/reference', '/decisions', '/blog', '/blocks',
          ];
          if (existingPath === '/' || existingPath === '/sitemap' || existingPath === '/markdown-page') {
            return undefined;
          }
          if (OTHER.some((p) => existingPath === p || existingPath.startsWith(p + '/'))) {
            return undefined;
          }
          return ['/docs' + existingPath];
        },
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
    // Blocks — how Unyson+ works with the WordPress block editor, plus the roadmap
    // that tracks each phase as it lands. Its own instance so block-editor support is
    // discoverable on its own terms rather than buried inside the Manual.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'blocks',
        path: 'blocks',
        routeBasePath: 'blocks',
        sidebarPath: './sidebarsBlocks.js',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
    // Web Dev Basics — a short, beginner-friendly primer on building websites the
    // right way (semantic HTML, a11y, responsive, performance, SEO, clean code).
    // Its own instance so the docs double as a learning resource; the inline
    // "💡 Web dev tip" callouts across the manual link into it.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn',
        path: 'learn',
        routeBasePath: 'learn',
        sidebarPath: './sidebarsLearn.js',
        editUrl: 'https://github.com/UnysonPlus/UnysonPlus.github.io/tree/main/',
      },
    ],
    // API Reference — the framework's public PHP functions + hooks, GENERATED from the
    // source (scripts/extract-php-api.php → scripts/gen-php-api.mjs). Its own instance so
    // it stays a distinct "Reference" section, separate from the how-to Manual.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'phpApi',
        path: 'reference',
        routeBasePath: 'reference',
        sidebarPath: './sidebarsReference.js',
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
        // Same SEO housekeeping as the News blog: no archive page, and no
        // `/page/N` pagination (this instance produced the bulk of the thin
        // pagination URLs). Tag/author lists stay for browsing but are
        // noindex'd (src/theme/Root.js) and kept out of the sitemap.
        archiveBasePath: null,
        postsPerPage: 'ALL',
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
            sidebarId: 'extensionsSidebar',
            position: 'left',
            label: 'Extensions',
          },
          {
            type: 'docSidebar',
            sidebarId: 'blocksSidebar',
            docsPluginId: 'blocks',
            position: 'left',
            label: 'Blocks',
          },
          {
            href: 'https://demos.unysonplus.com/',
            label: 'Demos',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'learnSidebar',
            docsPluginId: 'learn',
            position: 'left',
            label: 'Learn',
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
          {
            type: 'docSidebar',
            sidebarId: 'referenceSidebar',
            docsPluginId: 'phpApi',
            position: 'left',
            label: 'API Reference',
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
              {label: 'Introduction', to: '/intro'},
              {label: 'Extensions', to: '/extensions/overview'},
              {label: 'Blocks', to: '/blocks/intro'},
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
