---
sidebar_position: 5.5
title: "Send CRM email from your own address (SMTP, Gmail, Outlook) in WordPress"
sidebar_label: "Send from your own address"
description: "A step-by-step tutorial: make the emails you write in the Unyson+ WordPress CRM come from your own address, such as you@yourcompany.com, through your mail server's SMTP or an email service, with replies coming back to you and onto the contact's timeline."
keywords: [wordpress crm send email from my address, wordpress crm smtp, crm email from address wordpress, send crm email from gmail, send crm email from outlook, wordpress smtp settings, crm reply to address, wordpress email goes to spam]
---

# Send email from your own address

When you click **Email** on a contact, company or deal, the CRM sends a personal email for you. This tutorial
makes those emails come from **your own address**, for example `jon@yourcompany.com`, and brings the replies back
to you and onto the contact's timeline.

It takes about ten minutes. You need:

- the address you want to send from, and its **SMTP details** (server, port, user name, password), which your email
  provider gives you; or an account with an email service such as SendGrid or Postmark;
- the **Email conversations** module switched on under [CRM → Modules](../workspace/settings-and-modules.md).

## How the CRM decides who an email is from

Three settings decide what the person you write to sees. Each step below sets one of them.

| What the reader sees | Where it comes from |
|---|---|
| **From name**: "Jon at Your Company" | Your **display name** in your WordPress profile, then "at", then the site's name |
| **From address**: `jon@yourcompany.com` | The CRM's default **transactional sender** (CRM → Settings → Sending). With no sender set, the **Mailer's From address**. With neither, WordPress's own `wordpress@yourdomain` |
| **Reply-To**: where their reply goes | The **email address in your WordPress profile** |
| **Your name under the message** | Your **display name** again |

How the email travels is separate: through the email service chosen on the sender, otherwise through the **Mailer's
SMTP server**, otherwise through your web host's own mail. Mail sent straight from a web host often lands in spam,
so set up SMTP or an email service (step 2) even if the address already looks right.

<img src="/img/crm/email-own-compose.png" alt="The New email box in the CRM, with Jon signed under the message and the note Replies go to jon@unysonplus.com" width="706" />

The email box shows the result before you send: the name under the message, and **Replies go to** with your address.

## Step 1: Your name and address in your profile

Open **Users → Profile** (your own profile, top right of the admin bar).

1. Under **Name**, set **Display name publicly as** to the name you sign with, such as "Jon". The CRM uses it as
   the From name and puts it under each new message.

   <img src="/img/crm/email-own-profile-name.png" alt="The Display name publicly as field set to Jon" width="1078" />

2. Under **Contact Info**, set **Email** to your own address, such as `jon@yourcompany.com`. Replies to your CRM
   emails go here.

   <img src="/img/crm/email-own-profile-email.png" alt="The Email field in the WordPress profile set to jon@unysonplus.com, with the note that a confirmation email is sent to the new address" width="1078" />

3. Click **Update Profile**.

WordPress sends a confirmation link to the new address, and the change only takes effect once you click it. If your
site cannot send email yet, do step 2 first and come back. Each person on your team sets their own profile, so their
emails carry their own name and their replies go to them.

## Step 2: Let the site send from your domain

Mail servers check that a message really comes from the domain in its From address. Your site has to send through a
server that is allowed to send for `yourcompany.com`. Choose one of these two ways.

### Option A: your mailbox's SMTP server (the Mailer)

Use this when the address is a real mailbox, such as Google Workspace, Microsoft 365 or your host's email.

Open **CRM → Settings**, scroll to **Sending** and click **Mailer settings (SMTP)**. The line beside it says how the
site sends now. (The Mailer comes with the Forms extension; contact forms show the same settings in their **Mailer**
tab.)

<img src="/img/crm/email-own-mailer.png" alt="Mailer Settings: send method SMTP, server mail.unysonplus.com, user name and From address jon@unysonplus.com, SSL on port 465" width="1758" />

1. **Send Method**: **SMTP**.
2. **Server Address**, **Username**, **Password**, **Secure Connection** and **Custom Port**: your provider's SMTP
   details. The user name is usually the full email address.
3. **From Name** and **From Address**: the name and address for the site's other email, such as password resets.
   Use the same address as the SMTP user, or one the account may send for.
4. **Save**.

Typical SMTP settings:

| Provider | Server | Security | Port | Password |
|---|---|---|---|---|
| Google Workspace / Gmail | `smtp.gmail.com` | SSL | 465 | an **app password** (Google account → Security → 2-Step Verification → App passwords) |
| Microsoft 365 / Outlook | `smtp.office365.com` | TLS | 587 | your password; SMTP AUTH must be allowed for the mailbox |
| Most cPanel hosts | `mail.yourcompany.com` | SSL | 465 | the mailbox password |
| Zoho Mail | `smtp.zoho.com` | SSL | 465 | an app-specific password |

With SMTP chosen, **every** email WordPress sends goes through this server: the CRM's emails, campaigns,
confirmations, password resets and form notifications. If another SMTP plugin is active, that plugin's settings are
used instead.

### Option B: an email service

Use this when you send a lot of email (campaigns), or your mailbox provider limits SMTP. Set up SendGrid, Mailgun,
Postmark, Brevo or Amazon SES under **CRM → Settings → Sending → Email services** and verify your domain with that
service. See [Senders and email services](../email-marketing/senders-and-services.md). In step 3, choose that
service under **Send with**.

## Step 3: Make your address the CRM's sender

Open **CRM → Settings** and scroll to **Sending**.

1. Click **Add a sender** and fill it in:
   - **Name (for you)**: a label, such as "Jon";
   - **From name**: used by campaigns and confirmations. Your own emails keep your display name;
   - **From address**: `jon@yourcompany.com`;
   - **Reply-To (optional)**: leave it empty. Your own emails always reply to your profile address;
   - **Send with**: **The site's own mail (Mailer / SMTP)** for option A, or your email service for option B.

   <img src="/img/crm/email-own-sender-form.png" alt="The sender form: name Jon, From name Jon at Unyson+, From address jon@unysonplus.com, Send with the site's own mail" width="1654" />

2. Click **Save sender**. The first sender becomes the default for both kinds of email.
3. Under the table, check that **Transactional email from** shows your sender. One-to-one email is transactional.
   If you changed it, click **Save defaults**.
4. Next to **Send a test with**, choose your sender, enter an address you can check (a personal one is best), and
   click **Send test**.

<img src="/img/crm/email-own-senders.png" alt="CRM Settings, Sending: the sender Jon as marketing and transactional default, From Jon at Unyson+ jon@unysonplus.com, the Save defaults and Send test controls" width="1692" />

Open the test email and check who it is from. In Gmail, **Show original** should say `SPF: PASS` and `DKIM: PASS`.

:::tip Only want one address for everything?
If the Mailer's **From Address** is already your address and you will not run campaigns from another address, you
can skip the sender. With no sender, CRM email uses the Mailer's From address. A sender is still the way to send
campaigns from one address (`news@`) and personal email from another (`jon@`).
:::

## Step 4: Write your first email

Open a contact and click **Email** in the header. Check the two things the box shows:

- your name under **Hi {{first_name}},**;
- **Replies go to** with your address.

Write the subject and message, and click **Send**. The email is saved on the contact's timeline, and on the deal when
you write from a deal. If it fails, the box shows the reason (for example the SMTP server's error) and keeps what you
typed.

## Step 5: Bring the replies into the CRM

Replies arrive in your own mailbox. To also see them on the contact's timeline, let the CRM check that mailbox:

1. Open **CRM → Settings → Replies on the timeline**.
2. Tick **Check this mailbox** and enter the **IMAP** details of the same address (for Google Workspace,
   `imap.gmail.com`, port 993, SSL/TLS, with an app password; for Microsoft 365, `outlook.office365.com`, port 993).
3. Click **Test connection and save**.

The CRM checks every five minutes, reads only mail that arrives after you connect, and never changes your mailbox.
Replies appear as **Email received** on the contact and on the deal. Details, and the other way in (an inbound
address), are in [Email and replies](./email-and-replies.md#replies-on-the-timeline).

## When something goes wrong

**The email says it is from `wordpress@yourdomain`.**
No sender is set and the Mailer has no From address. Do step 3, or fill in the Mailer's **From Address**.

**The From name is my user name, such as "admin".**
Set **Display name publicly as** in your profile (step 1).

**Replies go to the wrong address.**
Replies go to the email address in the profile of the person who wrote the email. Change it in **Users → Profile**,
and click the confirmation link WordPress sends to the new address.

**"Could not instantiate mail function", or the email never arrives.**
The site is sending through the web host's own mail, which is off or blocked. Set up SMTP or an email service
(step 2). Local test sites usually cannot send email at all.

**"SMTP connect() failed" or "Authentication failed".**
Check the server, port and security together (SSL with 465, TLS with 587), and the user name and password. Gmail
and Zoho need an app password. Microsoft 365 needs SMTP AUTH allowed for the mailbox.

**The email arrives in spam.**
Your domain's DNS has to say the server may send for it: an **SPF** record that includes your mail provider or email
service, and **DKIM** set up with it. The From address also has to be on that domain. Your provider's help pages give
the exact records.

**My provider rejects the From address.**
Many SMTP servers only send as the account you log in with. Use the same address for the SMTP user, the Mailer's
From Address and the sender's From address, or add the address as an alias in your mailbox.

## Related

- [Email and replies](./email-and-replies.md): how one-to-one email and replies work.
- [Senders and email services](../email-marketing/senders-and-services.md): several senders, and the email services.
- [Team roles](../workspace/team-roles.md): who can send email from the CRM.
