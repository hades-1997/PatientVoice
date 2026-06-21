# PatientVoice Design System

A design system for **PatientVoice** — a web-based Hospital Patient Feedback Management System used by hospital Quality Management departments to receive, triage, track, resolve, analyze and report patient feedback (complaints, compliments, inquiries, incidents and improvement suggestions) across many intake channels.

The visual language targets **modern enterprise healthcare SaaS** — in the family of Salesforce, Zendesk, Jira Service Management and Microsoft Dynamics — but with a calm, clinical, trustworthy character: deep teal primary, slate neutrals, soft elevation, dense legible data tables, and unambiguous SLA / triage color states.

**Primary users:** Quality Management (primary), Hospital Directors, Department Managers, Hotline Operators, Customer Service staff, IT Administrators.

## Sources
- GitHub repo provided: **`hades-1997/PatientVoice`** — https://github.com/hades-1997/PatientVoice
  At the time of build this repository was **empty** (no commits / files). This design system was therefore built **greenfield from the written design brief** rather than recreated from existing code. When the repo is populated, revisit the UI kit to align with the real implementation. Explore the repo further for source-of-truth components if/when it is filled in.
- No Figma file, slide deck, or codebase was attached beyond the brief.

---

## Content fundamentals

How PatientVoice writes copy:

- **Voice:** professional, calm, operational. It is a clinical-quality tool, not a marketing site. Plain, precise, reassuring.
- **Person:** address the staff user as **you** implicitly (button labels are imperative: "Create feedback", "Escalate to manager", "Post note"). Refer to **the patient** in the third person ("The patient reported…").
- **Casing:** **Sentence case** for body, descriptions, and most buttons. **UPPERCASE** only for tiny overline/eyebrow labels and table column headers (tracked +0.04–0.06em). Page titles are Title Case ("SLA Monitoring Center", "Feedback Management").
- **Module & status names** are Title Case and consistent: New, Assigned, In Progress, Pending Confirmation, Resolved, Unresolved; Urgent / High / Normal.
- **Numbers** are concrete and tabular — counts, percentages with one decimal (94.2%), countdown timers (02:14:38), ticket IDs (PV-10293). Use mono + tabular figures so columns align.
- **Tone of urgency** escalates with color and verb, never with exclamation marks or emoji. "Breached", "Due soon", "On track".
- **No emoji.** No slang. No hype. Iconography carries visual warmth instead.
- **Examples:** “Long wait at Radiology front desk”, “PV-10293 at 86% of SLA window”, “SLA breached on PV-10289 — Outpatient complaint”, “Supports quality accreditation”.

---

## Visual foundations

- **Color:** Primary deep clinical teal `#0E7490`; secondary teal-green `#14B8A6`; slate neutral ramp for text/surfaces/borders. Semantic system is load-bearing because of SLA/triage: **success green `#059669`**, **warning orange `#EA580C`**, **critical red `#DC2626`**, info blue `#2563EB`, plus a violet accent `#7C3AED` for analytics/praise. Semantic colors appear as **tinted pills** (50-level background, 600/700 text, faint inset ring) — never as large saturated fills except the SLA breach banner.
- **Type:** **IBM Plex Sans** for all UI (humanist grotesque, enterprise-credible, avoids the Inter cliché). **IBM Plex Mono** with tabular figures for IDs, SLA timers and metrics. Dense scale: page numbers 30px, page title 24px, section 19px, card title 16px, body/table 14px, meta 12px, overline 11px. Loaded from Google Fonts (see Font substitution).
- **Spacing:** strict 4/8 grid. Generous 16–22px panel padding; 14–16px gaps between dashboard widgets; 12–14px table cell padding for scannable density.
- **Backgrounds:** flat. App canvas is `--pv-neutral-50` (cool near-white); cards are pure white. **No gradients** except two restrained touches — the brand logo chip and a subtle top-to-bottom tint inside trend bars. No photos, illustrations, textures or patterns in the chrome.
- **Cards / surfaces:** white, `12px` radius (panels) / `8px` (controls), `1px` hairline border (`--pv-neutral-200`), **soft cool-tinted shadow** (`--pv-shadow-sm`, slate-blue at 5–6% alpha). Interactive cards lift to `--pv-shadow-md` and darken their border on hover.
- **Borders:** 1px hairlines everywhere; tables use horizontal row separators only; the sidebar uses a 2px inset accent bar on the active item.
- **Radii:** xs 4 · sm 6 · **md 8 (default)** · lg 12 (panels/modals) · pill 999 (badges/avatars).
- **Shadows:** cool slate-tinted, layered, low-alpha — clinical, not dramatic. Focus ring is a 3px translucent teal halo.
- **Animation:** subtle and fast. 120–180ms ease (`cubic-bezier(.4,0,.2,1)`) on hover/background; 260ms ease-out for SLA progress fills. No bounce, no parallax, no looping decoration. Respect reduced motion.
- **Hover states:** ghost controls fill with `--pv-neutral-100`; solid buttons darken via `filter: brightness(.94)`; rows tint to `--pv-neutral-25`; cards raise elevation.
- **Press / active:** color deepen (no shrink); nav active = teal-tinted background + inset accent bar.
- **Transparency / blur:** used sparingly — tinted-pill inset rings use the semantic color at ~12–15% alpha; SLA badges at ~15%. No glassmorphism.
- **Imagery vibe:** there is essentially no photographic imagery; the "warmth" is cool-clinical and comes from teal + rounded icon chips. Avatars are deterministic initials on tinted backgrounds.
- **Layout rules:** desktop-first. Fixed 244px dark sidebar + 60px top bar; scrollable content region max 1440px. Feedback Detail is a fixed 3-column grid (300 / fluid / 300). Dashboards use 4–5 column KPI grids collapsing to fewer columns on narrow widths.

---

## Iconography

- **System:** [Lucide](https://lucide.dev) — clean 2px-stroke outline icons. Loaded from CDN (`unpkg.com/lucide`) and initialized with `lucide.createIcons()`. Chosen for its neutral, medical-appropriate, enterprise feel and breadth (phone, headset, gauge, alarm-clock, shield-alert, clipboard-list, etc.).
- **Usage:** icons appear in nav items, KPI chips (tinted rounded square), status/channel/SLA badges, timeline nodes, quick actions, and toolbar buttons. Sizes 13–20px. Icon color is tied to the adjacent semantic tone, otherwise `--pv-text-muted`.
- **No emoji. No unicode-glyph icons.** Components that render icons (`ChannelBadge`, `SLABadge`, `StatCard`) expect Lucide to be present on the host page.
- **Substitution flag:** Lucide is a substitution for an (absent) in-repo icon set, since the source repo was empty. If PatientVoice later ships its own icon set, swap it in and update these components.

---

## Font substitution

IBM Plex Sans / IBM Plex Mono are loaded from **Google Fonts** (`tokens/fonts.css`) rather than self-hosted binaries, because no font files were provided. The compiler therefore reports 0 shipped webfonts — fonts still render via the CDN `@import`. **If you need offline/self-hosted fonts, provide the `.woff2` files and I'll add proper `@font-face` rules.**

---

## Index / manifest

**Foundations** (`styles.css` → `tokens/`)
- `tokens/colors.css` — brand, neutral, semantic + semantic aliases
- `tokens/typography.css` — families, weights, scale, tracking
- `tokens/layout.css` — spacing, radii, shadows, layout dims, motion
- `tokens/fonts.css` — IBM Plex via Google Fonts
- `tokens/base.css` — low-specificity helpers (`.pv-mono`, `.pv-overline`, `.pv-scroll`)

**Specimen cards** (`guidelines/*.card.html`) — Colors (brand / semantic / neutral), Type (scale / mono), Spacing (spacing+radii / elevation).

**Components** (`components/`)
- `core/` — Button, IconButton, Input, Card, Avatar, Tabs
- `status/` — StatusBadge, PriorityBadge, ChannelBadge, SLABadge
- `data/` — StatCard
- Use via `const { Button } = window.PatientVoiceDesignSystem_16c56a`.

**UI kit** (`ui_kits/patientvoice/`) — interactive recreation of the full app (Dashboard, Feedback table/kanban, Feedback Detail, SLA Monitor, Analytics, Intake). See its `README.md`.

**Other** — `SKILL.md` (Agent Skill manifest).

The **Design System** tab renders every `@dsCard`-tagged file above.
