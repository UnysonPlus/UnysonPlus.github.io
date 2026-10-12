---
title: "CRM website generator roadmap: industries, demos and CRM features"
sidebar_label: "CRM generator roadmap"
description: "What is planned for the free Unyson+ CRM Website Generator: one generator with industry presets for real estate, home services, clinics, law firms, gyms, salons, recruitment and venues, live demos, and new CRM features in the plugin."
keywords:
  - free crm website generator
  - crm website for small business
  - home services crm website
  - dental clinic crm website
  - law firm crm website
  - gym crm website
---

# CRM website generator roadmap

This page tracks what is planned for the [CRM Website Generator](https://crm.unysonplus.com/).
For how to use it today, see the [generator guide](./crm-generator.md).

## The approach: one generator, many industries

There is **one** generator, not one per industry. The form, the
[site spec](./crm-generator.md#the-site-spec), and the prompt builder are shared. Each industry is a
**preset**: a data file that sets its pages, content types, fields, lead forms, pipeline stages,
follow-up emails and rules. Each preset gets its own page, for example
`crm.unysonplus.com/real-estate-crm-website/`, with wording, questions and answers written for that
industry.

This means:

- An improvement to the generator (a preview, a checklist) reaches every industry at once.
- Every industry uses the same spec format, so the [spec importer](#phase-6-spec-importer) works
  for all of them.
- Every industry page adds to the same site, which helps all of them appear in search results.

The home page is an industry picker plus an **Any business** preset for businesses outside the
list.

## Which industries, and why

An industry is added when it passes three tests:

1. People search for a CRM website for it.
2. The business runs on leads: enquiries, bookings, quotes or applications.
3. Unyson+ already has most of the building blocks: a
   [Post Types blueprint](/data-modeling/post-types), a Forms starter, and the Newsletter CRM.

| Industry | Page | Builds on | Main lead form | Example pipeline |
|---|---|---|---|---|
| Real estate | [/real-estate-crm-website/](https://crm.unysonplus.com/real-estate-crm-website/) | Properties blueprint | Showing request, home valuation | New → Showing → Under contract → Closed |
| Home services | [/home-services-crm-website/](https://crm.unysonplus.com/home-services-crm-website/) | Services and Locations blueprints | Quote request with photos | New → Site visit → Quote sent → Won → Job complete |
| Dental or medical clinic | [/dental-clinic-crm-website/](https://crm.unysonplus.com/dental-clinic-crm-website/) | Services (as Treatments), Team Members | Appointment request | New → Booked → Attended → Recall due |
| Law firm | [/law-firm-crm-website/](https://crm.unysonplus.com/law-firm-crm-website/) | Services (as Practice areas), Team Members, Case Studies | Consultation request | Enquiry → Conflict check → Consultation → Retained |
| Fitness studio or gym | [/gym-crm-website/](https://crm.unysonplus.com/gym-crm-website/) | Services (as Classes), Team Members, Events | Free trial | Trial booked → Trial attended → Member → Lapsed |
| Salon and spa | [/salon-spa-crm-website/](https://crm.unysonplus.com/salon-spa-crm-website/) | Services, Team Members | Booking request | Booked → Visited → Rebooked → Regular |
| Recruitment agency | [/recruitment-agency-crm-website/](https://crm.unysonplus.com/recruitment-agency-crm-website/) | Job Listings, Team Members | Job application with CV upload, vacancy request | Screened → Interview → Offer → Placed |
| Event venue and weddings | [/event-venue-crm-website/](https://crm.unysonplus.com/event-venue-crm-website/) | Services (as Spaces), Events, Downloads | Date availability, venue tour | Enquiry → Tour → Proposal → Deposit paid |

Being considered after that: insurance agencies, financial advisers, coaches and consultants, car
dealers (whose inventory works like property listings), tutoring, and non-profits (donors instead
of leads).

Each preset also carries the rules of its industry. Two examples: clinic forms do not collect
medical details, and law firm pages include an attorney advertising notice. Where an industry
already relies on outside software (a booking system for clinics and salons, an IDX provider for
real estate), the preset offers to embed the one the business already uses rather than replacing
it.

## Every preset is proven by a real build

Each preset's prompt is checked against the plugin's real blueprints, field types and settings
before release. On top of that, each prompt is run by an AI agent on a fresh WordPress install,
exactly as a site owner would, and the result is checked: every page, every form, and a test lead
reaching the CRM. Anything the agent had to guess at goes back into the preset. That build becomes
the preset's **live demo**, linked from its page, so you can click through the kind of site it
produces before you start. These builds are [phase 4](#phase-4-verified-builds-and-live-demos).

## Phases

### Phase 1: the generator (done)

- [x] Free generator page at crm.unysonplus.com, hosted on GitHub Pages
- [x] Real estate preset: pages, listing fields, lead forms, pipeline stages, follow-up emails
- [x] Pages and forms that follow your audience and business type
- [x] Manual listings, an IDX provider, or both
- [x] Build prompt based on the AI Dev Kit, with the full spec included
- [x] `site-spec.json` version 1.0
- [x] Copy, download and share link; choices saved in your browser
- [x] [Generator guide](./crm-generator.md) and this roadmap

### Phase 2: one engine for every industry (done)

- [x] Presets moved into data files, shared by one engine
- [x] Each industry page generated as plain HTML, so search engines read all of it
- [x] Home page becomes an industry picker
- [x] **Any business** preset
- [x] Real estate moves to `/real-estate-crm-website/`
- [x] Live preview: a sitemap and page wireframes in your colors, updating as you choose
- [x] "Before you build" checklist: logo, photos, lead email, outside accounts

### Phase 3: industry presets (done)

- [x] Real estate
- [x] Home services
- [x] Dental or medical clinic
- [x] Law firm
- [x] Fitness studio or gym
- [x] Salon and spa
- [x] Recruitment agency
- [x] Event venue and weddings
- [x] Optional connection to software the business already uses, per industry

### Phase 4: verified builds and live demos

Each preset's prompt run end to end by an AI agent on a fresh WordPress install, its findings fed
back into the preset, and the result published as that industry's live demo.

- [ ] Real estate
- [ ] Home services
- [ ] Dental or medical clinic
- [ ] Law firm
- [ ] Fitness studio or gym
- [ ] Salon and spa
- [ ] Recruitment agency
- [ ] Event venue and weddings

### Phase 5: CRM features in the plugin

These go into Unyson+ itself, so every site the generator builds gets them.

- [ ] Pipeline board in the Newsletter CRM: stages as columns, drag a lead between them. It
      replaces today's one-tag-per-stage method, and existing stages carry over.
- [ ] Contact timeline: notes, tasks and every form a lead submitted
- [ ] Assigning leads to team members
- [ ] Front-end search by number fields (price, bedrooms), not only by category
- [ ] Saved searches and new-item email alerts

### Phase 6: spec importer

- [ ] A WordPress screen that applies `site-spec.json` directly: post types, fields, forms, CRM
      lists, stages and segments, with no AI needed for those parts
- [ ] Your AI agent then handles only design and written content
