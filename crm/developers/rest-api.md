---
sidebar_position: 1
title: "WordPress CRM REST API reference"
sidebar_label: "REST API"
description: "The Unyson+ CRM REST API (fw-crm/v1) for WordPress: contacts, companies, segments, deals, products, tasks, files, email, calendar and reports."
keywords: [wordpress crm rest api, crm api wordpress, contacts api, deals api, wordpress rest api crm, crm webhook inbound email, application passwords crm]
---

# REST API

Contacts, companies, deals, tasks and most other CRM records can be read and changed over WordPress's REST
API, under the namespace **`fw-crm/v1`**
(for example `https://example.com/wp-json/fw-crm/v1/contacts`).

## Authentication and permissions

Use any WordPress REST authentication: **application passwords** (Users → Profile → Application Passwords)
for scripts and other services, or the logged-in cookie with a nonce from inside WordPress.

The API follows the same rules as the screens:

- The user needs CRM access (the CRM Manager or Sales Rep role, or an administrator).
- A **sales rep** only reaches the records they own; lists are filtered to theirs, other records answer
  `403 fw_crm_forbidden`, and owner fields they send are ignored.
- Manager-only actions (custom fields, segments, pipelines, products, deleting for good, the audit log)
  answer `403` for reps.
- Lists send `X-WP-Total` and `X-WP-TotalPages` headers; use `per_page` (up to 100) and `page`.
- Errors are WordPress REST errors: `400` bad input, `403` not allowed, `404` not found.

## Contacts

| Method and route | Does |
| --- | --- |
| `GET /contacts` | List. Filters: `search`, `stage`, `status`, `owner`, `company`, `list`, `tag`, `segment`, `trashed` (exclude, only, include), `orderby`, `order` |
| `POST /contacts` | Create. Any contact field, plus `company_id`, `fields` (custom fields), `lists` and `tags` (slugs). Never subscribes anyone |
| `GET /contacts/{id}` | One contact, with lists, per-list status, tags and custom fields |
| `PATCH /contacts/{id}` | Update |
| `DELETE /contacts/{id}` | Move to the bin; `?force=true` deletes for good (managers) |
| `POST /contacts/{id}/restore` | Out of the bin |
| `POST /contacts/{id}/merge` | `{ with, prefer }`: merge another contact into this one |
| `GET /contacts/duplicates` | Groups of likely duplicates |
| `GET /contacts/{id}/timeline` · `POST` | The timeline; post `{ note }` to add a note |
| `GET /contacts/{id}/consent` | The consent log |
| `POST /contacts/{id}/companies` · `DELETE /contacts/{id}/companies/{cid}` | Link or unlink a company |
| `POST /contacts/{id}/email` | `{ subject, body, cc?, deal_id? }`: send a one-to-one email (`502` if it could not be sent) |
| `GET /contacts/{id}/files` · `POST` · `DELETE /contacts/{id}/files/{aid}` | Files: post `{ attachment_id }` or a multipart `file` |

`POST /subscribers` (`{ email, name, list, tags }`) is the way to **subscribe** someone, recording their
consent; creating or updating a contact never changes their email status. `GET /subscribers` lists them
(`status`, `list`, `search`, paged).

## Companies

`GET /companies`, `POST /companies`, `GET|PATCH|DELETE /companies/{id}`, `POST /companies/{id}/restore`,
`GET /companies/{id}/contacts`, `GET|POST /companies/{id}/timeline`, and files under `/companies/{id}/files`.

## Custom fields, segments, audit

| Route | Does |
| --- | --- |
| `GET /fields?object=contact` · `POST /fields` · `DELETE /fields/{object}/{key}` | Field types and definitions (managers write) |
| `GET /stages` | Lifecycle stages |
| `GET /segments` · `POST` · `GET|PATCH|DELETE /segments/{id}` | Segments with counts; `{ title, rules }` |
| `GET /segments/{id}/contacts` | The contacts in a segment |
| `POST /segments/preview` | `{ rules }` → `{ count, describe }` |
| `GET /segments/fields` | What rules can use |
| `GET /audit` | The audit log (managers): `actor`, `object_type`, `object_id`, `action`, paged |

## Deals and pipelines

Available while the sales pipeline module is on.

| Route | Does |
| --- | --- |
| `GET /pipelines` · `POST` | Pipelines with their stages |
| `GET /pipelines/{id}` · `PATCH` · `DELETE` | One pipeline with totals per stage. A PATCH without `stages` keeps them; `409` when deleting one that has deals |
| `GET /deals` | Filters: `pipeline`, `stage`, `status` (open, won, lost), `owner`, `contact`, `company`, `search`, `trashed`, `closing_before`, `orderby`, `order` |
| `POST /deals` · `GET|PATCH|DELETE /deals/{id}` | Create, read, update (a `stage_id` moves it), bin (`?force=true` managers) |
| `POST /deals/{id}/move` | `{ stage_id }` or `{ status: "won" }` / `{ status: "lost", lost_reason }` |
| `POST /deals/{id}/restore` | Out of the bin |
| `POST /deals/{id}/contacts` · `DELETE /deals/{id}/contacts/{cid}` | Add or remove a contact |
| `GET|POST /deals/{id}/timeline` | Timeline and notes |
| `GET /deals/{id}/items` · `POST` · `PATCH|DELETE /deals/{id}/items/{iid}` | Line items: `{ product: "crm:5" or "woo:9", quantity, unit_price, discount }` or `{ name, … }` |
| `GET /products` · `POST` · `GET|PATCH|DELETE /products/{id}` | The product list; `?catalogue=1` adds WooCommerce products |
| `GET /lost-reasons` | The reasons offered when a deal is lost |
| `GET /reports/sales` | `pipeline`, `owner`, `from`, `to` → summary, by stage, forecast, won and lost, lost reasons, by owner |

Example: move a deal to Won.

```bash
curl -X POST https://example.com/wp-json/fw-crm/v1/deals/42/move \
  -u "alex:abcd efgh ijkl mnop qrst uvwx" \
  -H "Content-Type: application/json" \
  -d '{"status":"won"}'
```

## Tasks, notes, calendar

| Route | Does |
| --- | --- |
| `GET /tasks` | `status` (open, done, overdue, today, upcoming), `owner`, `object_type`, `object_id` |
| `POST /tasks` | `{ title, type, object_type, object_id, due_at, duration, location, attendee_ids, owner_id }`; add `done: true` and `outcome` to log a call that happened |
| `GET|PATCH|DELETE /tasks/{id}` | One task |
| `POST /tasks/{id}/complete` · `POST /tasks/{id}/reopen` | Complete with `{ outcome, duration }`, or reopen |
| `GET /task-types` | to-do, call, meeting, email |
| `PATCH|DELETE /notes/{id}` | Edit `{ note }` or delete a note (its author or a manager) |
| `GET /calendar` | `from`, `to` (`YYYY-MM-DD`, up to 62 days), `owner` (managers: an id or `all`) → events by day |

## Webhooks

Managers can create and manage [webhooks](./webhooks.md) under `/webhooks` (Webhooks module). A webhook
pushes events out as they happen; the routes above are for reading and changing records.

## Modules and routes

A route that belongs to a module exists only while that module is on: `/deals`, `/pipelines`, `/products`,
`/lost-reasons` and `/reports` (Sales pipeline), `/calendar` (Calendar), `/contacts/{id}/email` (Email
conversations), `/inbound/{token}` (Email conversations or Email marketing), `/mail-services/{service}/events`
(Email marketing or Email conversations), `/activity` (Lead scoring and site activity), `/audit` (Audit log)
and `/webhooks` (Webhooks). A switched-off module's routes answer `404 rest_no_route`. Contacts, companies,
fields, stages, segments, subscribers, tasks, notes and files are always there. Support cases, automations and
lead scoring rules have no REST routes yet: use their screens, or their PHP classes ([PHP API and hooks](./php-api-and-hooks.md)).

## The inbound email address

`POST /inbound/{token}` is public on purpose: the token is the secret. Email services post incoming email to
it, either a raw message (in `mime`, `body-mime`, `email` or `raw`, or as the body with content type
`message/rfc822`) or parsed fields (`from`/`sender`, `to`/`recipient`, `subject`, `text`/`body-plain`/
`stripped-text`, `html`, `Message-Id`, `In-Reply-To`). It answers `200` with what it did (`received`,
`sent`, `unknown`, `duplicate`). See [Email and replies](../sales/email-and-replies.md).

## Other public routes

Like the inbound address, these routes do not use WordPress logins: a secret in the address or a signed cookie
is the credential.

| Route | Does |
| --- | --- |
| `POST /mail-services/{service}/events?token=…` | An email service posts its bounce, complaint and unsubscribe events here. The full address, token included, is shown with the service's settings. Answers `{ ok, handled }` |
| `POST /activity` | Site activity (Lead scoring module): the visitor's browser reports a page view (`url`, `title`) or an event (`event`, `value`, `url`). Only counted for a known contact carrying the CRM's signed cookie, for an address on this site, and when site activity is allowed. Answers `{ ok }` |
