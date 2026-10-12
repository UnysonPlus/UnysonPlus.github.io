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

The home page becomes an industry picker plus an **Any business** preset for businesses outside the
list.

## Which industries, and why

An industry is added when it passes three tests:

1. People search for a CRM website for it.
2. The business runs on leads: enquiries, bookings, quotes or applications.
3. Unyson+ already has most of the building blocks: a
   [Post Types blueprint](/data-modeling/post-types), a Forms starter, and the Newsletter CRM.

| Wave | Industry | Builds on | Main lead form | Example pipeline |
|---|---|---|---|---|
| Done | Real estate | Properties blueprint | Showing request, home valuation | New → Showing → Under contract → Closed |
| 1 | Home services (plumbing, roofing, HVAC) | Services and Locations blueprints, Quote request starter | Quote request | New → Quoted → Booked → Done |
| 1 | Dental or medical clinic | Services and Team blueprints, Booking starter | Appointment request | New → Booked → Visited → Recall |
| 1 | Law firm | Services (practice areas), Team, Case Studies | Free consultation | Enquiry → Consultation → Retained → Closed |
| 1 | Fitness studio or gym | Events (classes), Team (trainers), pricing table | Free trial class | Trial → Visited → Member → Lapsed |
| 2 | Salon and spa | Services, Team, Booking starter | Booking request | New → Booked → Regular |
| 2 | Recruitment agency | Jobs blueprint | Job application, hiring enquiry | Applied → Screened → Placed |
| 2 | Event venue and weddings | Events, gallery, Quote request starter | Date availability | Enquiry → Tour → Booked |

Being considered after that: insurance agencies, financial advisers, coaches and consultants, car
dealers (whose inventory works like property listings), tutoring, and non-profits (donors instead
of leads).

Each preset also carries the rules of its industry. Two examples: clinic forms do not collect
medical details, and law firm pages include an attorney advertising notice. Where an industry
already relies on outside software (a booking system for clinics and salons, an IDX provider for
real estate), the preset offers to embed the one the business already uses rather than replacing
it.

## Every preset is proven by a real build

Before a preset is released, its prompt is run on a fresh WordPress install and the result is
checked: every page, every form, and a test lead reaching the CRM. That build becomes the preset's
**live demo**, linked from its page, so you can click through the kind of site it produces before
you start.

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

### Phase 2: one engine for every industry

- [ ] Presets moved into data files, shared by one engine
- [ ] Each industry page generated as plain HTML, so search engines read all of it
- [ ] Home page becomes an industry picker
- [ ] **Any business** preset
- [ ] Real estate moves to `/real-estate-crm-website/`
- [ ] Live preview: a sitemap and page wireframes in your colors, updating as you choose
- [ ] "Before you build" checklist: logo, photos, lead email, outside accounts

### Phase 3: industries, wave 1

Each one is released with a verified build and a live demo.

- [ ] Home services
- [ ] Dental or medical clinic
- [ ] Law firm
- [ ] Fitness studio or gym
- [ ] Live demo for real estate

### Phase 4: CRM features in the plugin

These go into Unyson+ itself, so every site the generator builds gets them.

- [ ] Pipeline board in the Newsletter CRM: stages as columns, drag a lead between them. It
      replaces today's one-tag-per-stage method, and existing stages carry over.
- [ ] Contact timeline: notes, tasks and every form a lead submitted
- [ ] Assigning leads to team members
- [ ] Front-end search by number fields (price, bedrooms), not only by category
- [ ] Saved searches and new-item email alerts

### Phase 5: industries, wave 2

- [ ] Salon and spa
- [ ] Recruitment agency
- [ ] Event venue and weddings

### Phase 6: spec importer

- [ ] A WordPress screen that applies `site-spec.json` directly: post types, fields, forms, CRM
      lists, stages and segments, with no AI needed for those parts
- [ ] Your AI agent then handles only design and written content
