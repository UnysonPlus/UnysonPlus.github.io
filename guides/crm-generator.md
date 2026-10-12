---
title: "Free CRM website generator: build a real estate CRM site on WordPress"
sidebar_label: "CRM website generator"
description: "Use the free CRM Website Generator to plan a real estate website with listings, lead forms and a sales pipeline, then let your AI agent build it on WordPress with Unyson+. No sign-up."
keywords:
  - free crm website
  - free crm website generator
  - free crm wordpress site
  - real estate crm website
  - real estate website wordpress
  - ai website builder wordpress
---

# Free CRM website generator

The [CRM Website Generator](https://crm.unysonplus.com/) is a free page where you pick
what your site needs: listings, lead forms, sales pipeline stages, brand colors. It turns those
choices into two things:

- **A build prompt** you paste into an AI coding agent (Claude Code, Cursor, Codex or similar).
- **`site-spec.json`**, the same choices as a structured file, so the agent works from exact
  values instead of interpreting a paragraph. The spec is also included at the end of the prompt,
  so one paste carries everything.

The agent then builds a normal WordPress site on Unyson+, using features that already ship with
the framework. Real estate is the first industry preset.

It runs entirely in your browser. Nothing you type is sent to a server; your choices are saved in
your own browser so you can come back to them.

## What you need

- A WordPress install: on your computer (local) or on your web host. If you have neither, choose
  **Not installed yet** and the prompt tells the agent to help you set one up first.
- An AI coding agent that can read files and run commands where WordPress lives.
- About 15 minutes for the form. The build itself depends on the agent and the number of pages.

## Use the generator

1. Open [crm.unysonplus.com](https://crm.unysonplus.com/).
2. **Business.** Enter the business name, market (city or region), and optionally the tagline,
   brokerage and license number. The license and brokerage go in the site footer, which many
   markets require.
3. **Who you serve.** Tick buyers, sellers, renters, investors, luxury or relocation. Pages and
   forms that match switch on by themselves (for example, *Sellers* adds the **Selling your home**
   page and the **Home valuation** form). Anything you tick or untick by hand stays as you set it.
4. **Pages.** Home, Contact and Privacy policy are always included. Add or remove the rest.
5. **Listings.** Choose where listings come from (see [Listings and IDX](#listings-and-idx)
   below), add extra listing details such as status or open house date, and choose how many
   sample listings to create.
6. **Lead capture.** Choose the forms and enter the email address new leads go to.
7. **CRM pipeline.** Edit the stages, one per line, in order. Pick the follow-up emails to draft.
8. **Brand.** Pick your primary and accent colors, a style, your logo option and the site language.
9. **Build setup.** Choose your AI agent and where WordPress is installed.
10. Click **Copy prompt** (or **Download prompt**) and paste it into your agent from the WordPress
    project folder.

**Copy share link** puts your choices into a link you can send to a colleague or keep for later.
**Reset to defaults** clears everything back to the real estate preset.

## What the agent builds

The prompt walks the agent through seven steps, in this order:

| Step | What happens |
|---|---|
| 0. Setup | Gets the free [AI Dev Kit](https://github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit), installs the Unyson+ plugin and parent theme, creates a child theme, and enables the Post Types, Custom Fields, Forms, Newsletter CRM and SEO extensions. |
| 1. Design system | Sets [Theme Settings](/guides/global-colors-and-fonts) (colors, type, buttons, header and footer) before any page is built. |
| 2. Listings | Installs the **Properties** blueprint and adds your extra fields and a status taxonomy, builds the listings page with filters and the single listing layout, and creates the sample listings. |
| 3. Pages | Builds each page you chose, with a call to action leading to a lead form. |
| 4. Lead capture | Builds each form from the Forms starter templates. Every submission is stored as an entry; leads who tick the consent box are added to the CRM. |
| 5. CRM | Sets up Newsletter CRM: lists for each audience, one tag per pipeline stage, a saved segment per stage, and your follow-up emails as **drafts**. |
| 6. SEO and compliance | Page titles and descriptions, structured data, accessibility, speed, and a footer with brokerage, license and an Equal Housing Opportunity statement. |
| 7. Check and report | Opens every page on desktop and phone, submits each form once, then reports what still needs you (photos, logo, real listings). |

The prompt also sets rules: no invented facts about your business (awards, sales numbers,
reviews), no third-party plugins except your IDX provider's, and no deleting anything the agent
did not create without asking.

### Pipeline stages are tags, for now

Newsletter CRM does not have a drag-and-drop pipeline board yet. Until it does, each stage is a
tag named `Stage: <name>` and has a saved segment, so opening a stage is one click and moving a
lead means changing its tag. When the pipeline board ships ([phase 4 of the roadmap](./crm-generator-roadmap.md#phase-4-crm-features-in-the-plugin)), the same stages
carry over.

## Listings and IDX

No website tool can pull MLS listings by itself. MLS data needs an **IDX agreement** between you,
your brokerage and your MLS, usually delivered by an IDX provider. The generator offers three
routes:

- **I add them myself.** Listings are WordPress posts using the Properties post type. Works for
  anyone, with no subscription.
- **My IDX provider.** Choose your provider (for example IDX Broker, Showcase IDX, myRealPage,
  Real Geeks or iHomefinder). The agent installs that provider's official plugin or embed code,
  asks you for your account details, and adds the MLS disclaimer text the provider supplies.
- **Both.** Featured listings you manage, plus full MLS search from your provider.

Your lead forms and CRM work the same on every route. If you start with manual listings, you can
add IDX later without rebuilding the site.

## The site spec

`site-spec.json` has a `spec_version` (currently `1.0`) and these sections:

| Section | Holds |
|---|---|
| `business` | Name, type (solo, team, brokerage), market, tagline, brokerage, license number, audiences, language |
| `pages` | Each page's slug, title and purpose |
| `listings` | Source (`manual`, `idx`, `both`), IDX provider, and for manual listings the post type, taxonomies, base and extra fields, filters and sample count |
| `lead_capture` | Notification email and each form's starter, fields, placement and actions |
| `crm` | Pipeline stages and method, lists, double opt-in, follow-up emails |
| `brand` | Primary and accent colors, style, logo option |
| `seo` | Primary keyword, schema types |
| `compliance` | Equal housing statement, footer license, privacy policy, form consent, MLS disclaimer |
| `build` | Agent, WordPress location, and links to the AI Dev Kit, plugin and theme |

The spec is the contract between the generator and whatever builds the site. Today that is your AI
agent; [phase 6 of the roadmap](./crm-generator-roadmap.md#phase-6-spec-importer) adds an importer that applies the predictable parts directly in
WordPress.

## Roadmap

The generator is done for real estate. Next, it becomes **one engine with a preset per industry**:
home services, dental and medical clinics, law firms and gyms first, then salons, recruitment
agencies and event venues. Each preset is released with a live demo built from its own prompt.
After that come a pipeline board and other CRM features in the plugin, and an importer that applies
the spec without AI. The full plan, with progress, is on the
[CRM generator roadmap](./crm-generator-roadmap.md).

## FAQ

**Is it really free?** Yes. The generator, the Unyson+ plugin and theme, and the AI Dev Kit are
free. You pay only for your own hosting and, if you use one, your AI agent subscription.

**Do I need to code?** No. You fill in a form and paste the result. After the build, you edit the
site in WordPress with the visual [Page Builder](/page-builder).

**Can I use a chat assistant instead of a coding agent?** It can follow the plan, but you will
have to carry out each step in WordPress yourself. A coding agent that can run commands does the
work for you.

**Where do leads go?** Every form submission is stored under **Unyson+ → Form Entries** and
emailed to the address you entered. Leads who tick the consent box are also added to
**Unyson+ → Newsletter**, with the first pipeline stage tag.
