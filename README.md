# Ukasi Compassionate Heart Foundation — Website

A six-page, fully interlinked rebuild of ukasicompassionateheart.org, built with plain HTML/CSS/JS (no build step, no framework, no server required).

## What's inside

```
uchf.org/
├── index.html       Home
├── about.html        About Us — vision, mission, background, values, Board, FAQ
├── programs.html      How We Help — support types + sponsorship process
├── stories.html        Stories — every real beneficiary story, filterable by year
├── gallery.html         Gallery — event photos, filterable by category
├── donate.html         Donate — M-Pesa / bank tabs with copy-to-clipboard
├── contact.html        Contacts — phone, email, map, working contact form
├── assets/
│   ├── board/          Board member photos
│   └── gallery/         Gallery photos
├── css/
│   └── style.css      All styling (single shared stylesheet)
└── js/
    ├── main.js        Nav menu + dropdown, accordion, tabs, filters, lightbox, copy buttons, contact form, WhatsApp toggle
    └── footer.js        Injects the shared footer on every page
```

## Real content — nothing invented

- All text (vision, mission, values, goals, foundation context, every student story) is taken directly from the live WordPress site and its blog posts, lightly copy-edited (e.g. fixed "Commitent" → "Commitment").
- All photos are the foundation's own images, loaded live from their existing WordPress media library at `ukasicompassionateheart.org/wp-content/uploads/...` — so if they ever update a photo on their server, it updates here too. If they eventually move hosts, just swap those image URLs.
- Contact details: `ukasicompassionate@yahoo.com`, phone `+254 713 134 184` (main) and `+254 794 057 187` (enquiries), P.O. Box 328-90400 Mwingi, M-Pesa Paybill 522522 / Account 7989462, KCB Bank account 1269123130.
- The "How We Help" page synthesises the site's own Goals & Objectives / Foundation Context text into three support categories and a 4-step process — same facts, better organised, nothing fabricated.
- Board Members (on About Us) and Gallery photos use real photos supplied directly by the foundation, stored locally in `assets/board/` and `assets/gallery/` rather than hotlinked, since these aren't on the old WordPress site.
- Board: Patrick Kitonga (Board Chairperson), Joshua Mutisya (Assistant Secretary), Dr. Daniel Musee, Rev. Moses Muthui, and Nicholas Mutua Muthui (Board Members).

## What's working, not just decorative

- **Navigation** — sticky header, active-page highlighting, mobile hamburger menu, and an "About Us" dropdown (Overview / Board Members).
- **Stories filter** — buttons actually filter the story grid by year (2018 / 2020 / 2025).
- **Gallery filter** — a real dropdown `<select>` filters photos by category (community meetings / fee disbursement / foundation events).
- **Lightbox** — click any story or gallery photo to view it full-size; Esc or click-out to close.
- **Donate tabs** — switch between M-Pesa and Bank; each number has a real "Copy" button (clipboard API with a fallback for older browsers).
- **Contact form** — validates the required fields, then opens the visitor's own email app pre-addressed to UCHF with their message (there's no backend/server, so this is the honest way to "send" without faking a submission).
- **WhatsApp toggle** — floating button expands into a small chat panel (greeting + "Start chat") that opens `wa.me/254713134184` with a pre-filled message; closes on toggle, outside click, or Esc.

## How to use it

**Preview locally:** unzip and open `index.html` in any browser — every link between pages works.

**Deploy:** upload the whole `uchf-website/` folder (keeping the `css/` and `js/` subfolders intact) to any static host or to the existing WordPress host's file directory. It needs no database and no server-side code.

**Edit content:** everything is plain text inside the `.html` files — open any page in a text editor and edit directly. Shared elements (footer, nav) appear in every file the same way; the footer specifically lives in `js/footer.js` so you only need to change it once for it to update everywhere.

## One thing to double-check

The old site listed two different emails (`ukasicompassionate@yahoo.com` and `uchf2015@gail.com`, which looks like a typo for Gmail). This build uses `ukasicompassionate@yahoo.com` everywhere, as confirmed.
