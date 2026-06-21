---
name: patientvoice-design
description: Use this skill to generate well-branded interfaces and assets for PatientVoice (a hospital patient-feedback management SaaS), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Tokens:** link `styles.css` (imports everything in `tokens/`). Primary `#0E7490`, secondary `#14B8A6`; SLA/triage states: success `#059669`, warning `#EA580C`, critical `#DC2626`. Use the `--pv-*` custom properties — never hard-code new colors.
- **Type:** IBM Plex Sans (UI) + IBM Plex Mono (IDs/timers/metrics, tabular figures). Sentence case; UPPERCASE only for tiny overlines & table headers. No emoji.
- **Icons:** Lucide via CDN, `lucide.createIcons()`. 2px stroke. No emoji, no hand-drawn SVG icons.
- **Components:** compiled into `_ds_bundle.js` under `window.PatientVoiceDesignSystem_16c56a` — `Button, IconButton, Input, Card, Avatar, Tabs, StatusBadge, PriorityBadge, ChannelBadge, SLABadge, StatCard`. See each component's `.prompt.md`.
- **Full screens:** `ui_kits/patientvoice/` is an interactive recreation of the app — copy it as a starting point for new screens.
- **Surfaces:** white cards, 8–12px radii, 1px slate hairline, soft cool shadow; flat `--pv-neutral-50` app canvas; no gradients (except logo chip). 4/8 spacing grid; desktop-first; 244px dark sidebar + 60px top bar.
