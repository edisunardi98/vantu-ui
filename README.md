<p align="center">
  <a href="https://vantu-ui.vercel.app">
    <img alt="Vantu UI" src="./public/brand/vantu-mark.svg" width="88" height="88">
  </a>
</p>

<h1 align="center">Vantu UI</h1>

<p align="center">
  React design system for AI-powered SaaS dashboards.<br>
  Components, blocks, charts and full workspace templates. Copy the file, own the source.
</p>

<p align="center">
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-111111?style=flat-square"></a>
  <img alt="React 19" src="https://img.shields.io/badge/React-19-111111?style=flat-square">
  <img alt="Tailwind CSS v4" src="https://img.shields.io/badge/Tailwind-v4-111111?style=flat-square">
  <img alt="React Aria" src="https://img.shields.io/badge/React%20Aria-components-111111?style=flat-square">
  <img alt="103 items" src="https://img.shields.io/badge/items-103-5b54f5?style=flat-square">
  <a href="https://github.com/edisunardi98/vantu-ui/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/edisunardi98/vantu-ui?style=flat-square&color=111111"></a>
</p>

<p align="center">
  <a href="https://vantu-ui.vercel.app"><b>Website</b></a>
  &nbsp;·&nbsp;
  <a href="https://vantu-ui.vercel.app/components"><b>Browse components</b></a>
  &nbsp;·&nbsp;
  <a href="https://vantu-ui.vercel.app/docs"><b>Docs</b></a>
  &nbsp;·&nbsp;
  <a href="#install"><b>Install</b></a>
</p>

**Vantu UI** is a React design system for AI-powered SaaS dashboards: 70 components, 15 blocks, 10 charts and 8 workspace templates, all built on design tokens mirrored from Figma. Every item is a plain `.tsx` file built with [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and Tailwind CSS v4. You copy it into your project and the source is yours.

## Contents

- [Why Vantu UI](#why-vantu-ui)
- [Install](#install)
- [Usage](#usage)
- [Use it with AI tools](#use-it-with-ai-tools)
- [Components](#components)
- [Blocks](#blocks)
- [Charts](#charts)
- [Templates](#templates)
- [Run the docs site locally](#run-the-docs-site-locally)
- [Project layout](#project-layout)
- [Contributing](#contributing)
- [License](#license)

## Why Vantu UI

- **Made for AI SaaS.** AI search, insights, score meters, sequence steps and criteria chips sit next to the everyday controls a dashboard needs.
- **Accessible by default.** Built on React Aria: real focus management, keyboard support and screen-reader labels.
- **Design tokens from Figma.** Color, scale and typography live in [`src/styles/theme.css`](./src/styles/theme.css) and match the Figma variables one to one.
- **Charts without a chart library.** 10 plain-SVG charts share one kit for scales, tooltips, legends, scrubbing and a screen-reader data table.
- **Whole screens, not just parts.** Templates for dashboards, calendars, teams, settings, sign-in and onboarding.
- **Agent-ready.** `llms.txt` and `llms-full.txt` let Claude Code, Cursor or Codex find and add items for you.

## Install

### Requirements

- **React 19** and **Tailwind CSS v4**
- Any React setup: Next.js, Vite, Remix or plain React
- The `@/*` import alias pointing at your `src/` folder

### 1. Add the dependencies

```bash
npm install react-aria-components lucide-react tailwind-merge
```

Some items need more (for example `@internationalized/date` for the date and time pickers). Each item's page lists its exact dependencies.

### 2. Add the tokens

Copy [`src/styles/theme.css`](./src/styles/theme.css) and [`src/styles/typography.css`](./src/styles/typography.css) into your project and import them from your global stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "./theme.css";
@import "./typography.css";
```

Then copy the class helper [`src/utils/cx.ts`](./src/utils/cx.ts).

### 3. Copy an item

Open the item's file below (or its page on [vantu-ui.vercel.app](https://vantu-ui.vercel.app)), copy it into the same path in your project and import it.

## Usage

```tsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Toolbar() {
  return (
    <Button variant="primary" leadingIcon={<Plus />} onPress={() => createProspect()}>
      Add prospect
    </Button>
  );
}
```

Props, examples and accessibility notes for every item are on its page, e.g. [Button](https://vantu-ui.vercel.app/components/button).

## Use it with AI tools

Point your coding assistant at [`llms.txt`](https://vantu-ui.vercel.app/llms.txt) for an index of every item, or [`llms-full.txt`](https://vantu-ui.vercel.app/llms-full.txt) for the full docs in one file. Setup details: [Using with AI](https://vantu-ui.vercel.app/docs/ai).

## Components

### Actions

| Name | What it is | Source |
| --- | --- | --- |
| [Button](https://vantu-ui.vercel.app/components/button) | Primary, secondary, ghost and danger actions in three sizes, with optional leading or trailing icons and a pending state. | [`components/ui/button.tsx`](./src/components/ui/button.tsx) |
| [Icon Button](https://vantu-ui.vercel.app/components/icon-button) | Compact square action for toolbars, topbars and table rows. | [`components/ui/icon-button.tsx`](./src/components/ui/icon-button.tsx) |
| [Menu](https://vantu-ui.vercel.app/components/menu) | Row actions and dropdown menus with 36px items, 16px icons and optional shortcuts. | [`components/ui/menu.tsx`](./src/components/ui/menu.tsx) |
| [Filter](https://vantu-ui.vercel.app/components/filter) | Toolbar filter trigger (muted label + value + chevron) and a dashed “Add filter” button. | [`components/ui/filter.tsx`](./src/components/ui/filter.tsx) |
| [Link Button](https://vantu-ui.vercel.app/components/link-button) | Inline text action in gray, black, accent or error, with optional underline and icons. | [`components/ui/link-button.tsx`](./src/components/ui/link-button.tsx) |
| [Button Group](https://vantu-ui.vercel.app/components/button-group) | Joined buttons sharing one border — view switches, ranges and formatting toolbars. Three sizes. | [`components/ui/button-group.tsx`](./src/components/ui/button-group.tsx) |
| [Close Button](https://vantu-ui.vercel.app/components/close-button) | Dismiss control for dialogs, toasts, tags and banners — ghost or filled, three sizes. | [`components/ui/close-button.tsx`](./src/components/ui/close-button.tsx) |

### Forms

| Name | What it is | Source |
| --- | --- | --- |
| [Input](https://vantu-ui.vercel.app/components/input) | Text field, 40px tall. Focus swaps the border to accent and adds a 3px ring. | [`components/ui/input.tsx`](./src/components/ui/input.tsx) |
| [Select](https://vantu-ui.vercel.app/components/select) | Single-value dropdown with a trailing chevron and keyboard navigation. | [`components/ui/select.tsx`](./src/components/ui/select.tsx) |
| [Textarea](https://vantu-ui.vercel.app/components/textarea) | Multiline field, 14 Regular at 140% line height, minimum 96px tall. | [`components/ui/textarea.tsx`](./src/components/ui/textarea.tsx) |
| [Checkbox](https://vantu-ui.vercel.app/components/checkbox) | 16px checkbox with checked, indeterminate and disabled states. | [`components/ui/checkbox.tsx`](./src/components/ui/checkbox.tsx) |
| [Radio](https://vantu-ui.vercel.app/components/radio) | 16px radio buttons in a labelled group. | [`components/ui/radio.tsx`](./src/components/ui/radio.tsx) |
| [Switch](https://vantu-ui.vercel.app/components/switch) | 40 × 24 track with a 16px knob and 4px inset. | [`components/ui/switch.tsx`](./src/components/ui/switch.tsx) |
| [Chip & Kbd](https://vantu-ui.vercel.app/components/chip) | 32px selectable and removable tokens for criteria builders and tag editors, plus keyboard keys. | [`components/ui/chip.tsx`](./src/components/ui/chip.tsx) |
| [Slider](https://vantu-ui.vercel.app/components/slider) | Single value or range on a 6px track, with the value beside the label or in a tooltip. | [`components/ui/slider.tsx`](./src/components/ui/slider.tsx) |
| [File Upload](https://vantu-ui.vercel.app/components/file-upload) | Drop area with a browse button, and file cards for uploading, completed and failed states. | [`components/ui/file-upload.tsx`](./src/components/ui/file-upload.tsx) |
| [Choice Card](https://vantu-ui.vercel.app/components/choice-card) | Radio group rendered as selectable cards for roles, plans and onboarding choices. | [`components/ui/choice-card.tsx`](./src/components/ui/choice-card.tsx) |
| [Setting Row](https://vantu-ui.vercel.app/components/setting-row) | Title, description and a control — inline or leading — grouped under setting sections. | [`components/ui/setting-row.tsx`](./src/components/ui/setting-row.tsx) |
| [Search Field](https://vantu-ui.vercel.app/components/search-field) | Search input with a leading icon, a clear button and Escape-to-clear; optional shortcut hint. | [`components/ui/search-field.tsx`](./src/components/ui/search-field.tsx) |
| [Combobox](https://vantu-ui.vercel.app/components/combobox) | Text input with a filtered list of suggestions — type to filter, arrows to move, Enter to pick. | [`components/ui/combobox.tsx`](./src/components/ui/combobox.tsx) |
| [Number Field](https://vantu-ui.vercel.app/components/number-field) | Numeric input with −/+ steppers, arrow keys, min/max and locale-aware currency or percent formatting. | [`components/ui/number-field.tsx`](./src/components/ui/number-field.tsx) |
| [Input OTP](https://vantu-ui.vercel.app/components/input-otp) | One-time code input: one box per character with auto-advance, backspace, arrows and paste. | [`components/ui/input-otp.tsx`](./src/components/ui/input-otp.tsx) |
| [Token Input](https://vantu-ui.vercel.app/components/token-input) | Free-form multi-value field: Enter, comma or paste creates tokens; Backspace removes the last. | [`components/ui/token-input.tsx`](./src/components/ui/token-input.tsx) |
| [Color Picker](https://vantu-ui.vercel.app/components/color-picker) | Swatch trigger opening a saturation area, hue slider, hex field and preset swatches. | [`components/ui/color-picker.tsx`](./src/components/ui/color-picker.tsx) |
| [Date Calendar](https://vantu-ui.vercel.app/components/date-calendar) | Month grid for a single date or a range, with unavailable dates and a today marker. | [`components/ui/date-calendar.tsx`](./src/components/ui/date-calendar.tsx) |
| [Date Picker](https://vantu-ui.vercel.app/components/date-picker) | Typed date segments plus a calendar popover — fully keyboard accessible and locale aware. | [`components/ui/date-picker.tsx`](./src/components/ui/date-picker.tsx) |
| [Time Field](https://vantu-ui.vercel.app/components/time-field) | Hour and minute segments you type or arrow through, 12 or 24-hour. | [`components/ui/time-field.tsx`](./src/components/ui/time-field.tsx) |

### Data display

| Name | What it is | Source |
| --- | --- | --- |
| [Badge](https://vantu-ui.vercel.app/components/badge) | Six tones × two styles. Soft is a tinted status or category. Dot is a neutral surface with a tone dot for workflow status. | [`components/ui/badge.tsx`](./src/components/ui/badge.tsx) |
| [Counter](https://vantu-ui.vercel.app/components/counter) | Navigation and tab counts. 20px pill, 12 Medium. | [`components/ui/counter.tsx`](./src/components/ui/counter.tsx) |
| [Avatar](https://vantu-ui.vercel.app/components/avatar) | People are circular initials on a soft tint (24 in tables, 32 in lists, 40 in headers). Companies are square marks. | [`components/ui/avatar.tsx`](./src/components/ui/avatar.tsx) |
| [Score Meter](https://vantu-ui.vercel.app/components/score-meter) | AI score as 10 ticks plus the value. ≥ 80 hot (green), 60–79 warm (amber), < 60 cold (gray). | [`components/ui/score-meter.tsx`](./src/components/ui/score-meter.tsx) |
| [Delta & Metric](https://vantu-ui.vercel.app/components/metric) | Delta is a trend glyph and value in the semantic tone. Metric is label, 32 SemiBold value, delta and caption. | [`components/ui/metric.tsx`](./src/components/ui/metric.tsx) |
| [Progress Bar](https://vantu-ui.vercel.app/components/progress-bar) | 4px track for usage, quotas and rates. | [`components/ui/progress-bar.tsx`](./src/components/ui/progress-bar.tsx) |
| [Card](https://vantu-ui.vercel.app/components/card) | Layered card: a subtle shell (radius 16, 4px padding) holding a header and an inner white panel. | [`components/ui/card.tsx`](./src/components/ui/card.tsx) |
| [Timeline](https://vantu-ui.vercel.app/components/timeline) | Items connect with a 1px rail; the last item drops the rail. | [`components/ui/timeline.tsx`](./src/components/ui/timeline.tsx) |
| [Description List](https://vantu-ui.vercel.app/components/description-list) | Key/value rows inside a plain card (white, 1px border, radius 16, padding 20) for details and settings. | [`components/ui/description-list.tsx`](./src/components/ui/description-list.tsx) |
| [Brand & Integration Marks](https://vantu-ui.vercel.app/components/integration-mark) | Product lockup, wordmark and mark in two sizes, 24px integration tiles and social sign-in buttons. | [`components/ui/integration-mark.tsx`](./src/components/ui/integration-mark.tsx) |
| [Tag](https://vantu-ui.vercel.app/components/tag) | 24px label with an icon, avatar, company mark or flag; stroke or gray, removable. | [`components/ui/tag.tsx`](./src/components/ui/tag.tsx) |
| [Circular Progress](https://vantu-ui.vercel.app/components/circular-progress) | Ring progress for completion and a semicircle gauge for balances and goals. | [`components/ui/circular-progress.tsx`](./src/components/ui/circular-progress.tsx) |
| [Table](https://vantu-ui.vercel.app/components/table) | Base table parts — sortable columns, selectable rows, header 40 on subtle, rows 48, horizontal rules only. | [`components/ui/table.tsx`](./src/components/ui/table.tsx) |
| [Tag Group](https://vantu-ui.vercel.app/components/tag-group) | Keyboard-navigable set of tags with single or multiple selection and removal. | [`components/ui/tag-group.tsx`](./src/components/ui/tag-group.tsx) |
| [Tree View](https://vantu-ui.vercel.app/components/tree-view) | Nested, expandable hierarchy with folder icons, counts and keyboard navigation. | [`components/ui/tree-view.tsx`](./src/components/ui/tree-view.tsx) |
| [Meter](https://vantu-ui.vercel.app/components/meter) | A known quantity within a range — storage, quota, strength — as a bar or segments, colored by thresholds. | [`components/ui/meter.tsx`](./src/components/ui/meter.tsx) |
| [Divider](https://vantu-ui.vercel.app/components/divider) | Horizontal or vertical rule with an optional inline label. | [`components/ui/divider.tsx`](./src/components/ui/divider.tsx) |
| [Carousel](https://vantu-ui.vercel.app/components/carousel) | Scroll-snap slides with arrows and dots; swipe, drag or use the keyboard. | [`components/ui/carousel.tsx`](./src/components/ui/carousel.tsx) |

### Navigation

| Name | What it is | Source |
| --- | --- | --- |
| [Nav Item](https://vantu-ui.vercel.app/components/nav-item) | Sidebar link with optional muted count or unread badge, plus uppercase section labels. | [`components/ui/nav-item.tsx`](./src/components/ui/nav-item.tsx) |
| [Tabs](https://vantu-ui.vercel.app/components/tabs) | Underline tabs with a 2px text-primary indicator. | [`components/ui/tabs.tsx`](./src/components/ui/tabs.tsx) |
| [Segmented Control](https://vantu-ui.vercel.app/components/segmented-control) | Compact single choice for ranges such as 7D · 30D · 90D. | [`components/ui/segmented-control.tsx`](./src/components/ui/segmented-control.tsx) |
| [Pagination](https://vantu-ui.vercel.app/components/pagination) | Table footer. Summary left, pages right; 32px page items, radius 8. | [`components/ui/pagination.tsx`](./src/components/ui/pagination.tsx) |
| [Step Indicator](https://vantu-ui.vercel.app/components/step-indicator) | Numbered steps — horizontal with chevrons for headers, vertical for checklists — plus dot steppers. | [`components/ui/step-indicator.tsx`](./src/components/ui/step-indicator.tsx) |
| [Accordion](https://vantu-ui.vercel.app/components/accordion) | Disclosure rows with a +/× toggle; the open item becomes a raised white card. | [`components/ui/accordion.tsx`](./src/components/ui/accordion.tsx) |
| [Breadcrumb](https://vantu-ui.vercel.app/components/breadcrumb) | Path trail with chevron or slash separators and collapsing middle levels. | [`components/ui/breadcrumb.tsx`](./src/components/ui/breadcrumb.tsx) |

### Overlays

| Name | What it is | Source |
| --- | --- | --- |
| [Modal & Drawer](https://vantu-ui.vercel.app/components/modal) | Shared header and footer parts. Modal is 560px wide; drawer is 480px wide, full height, docked right. | [`components/ui/modal.tsx`](./src/components/ui/modal.tsx) |
| [Tooltip](https://vantu-ui.vercel.app/components/tooltip) | Dark 12 Medium bubble, radius 8, raised shadow. One line, no arrow. | [`components/ui/tooltip.tsx`](./src/components/ui/tooltip.tsx) |
| [Popover](https://vantu-ui.vercel.app/components/popover) | Non-modal floating panel anchored to a trigger, with optional title and arrow. | [`components/ui/popover.tsx`](./src/components/ui/popover.tsx) |
| [Context Menu](https://vantu-ui.vercel.app/components/context-menu) | Right-click menu anchored at the pointer; Shift+F10 or the Menu key for keyboard users. | [`components/ui/context-menu.tsx`](./src/components/ui/context-menu.tsx) |
| [Command Palette](https://vantu-ui.vercel.app/components/command-palette) | ⌘K modal search over grouped commands with shortcuts and keyboard hints. | [`components/ui/command-palette.tsx`](./src/components/ui/command-palette.tsx) |

### AI & workflow

| Name | What it is | Source |
| --- | --- | --- |
| [AI Search](https://vantu-ui.vercel.app/components/ai-search) | The one prominent control on AI screens: 64px bar, natural-language query in 16 Regular and a Large primary action. | [`components/ui/ai-search.tsx`](./src/components/ui/ai-search.tsx) |
| [Criterion Chip](https://vantu-ui.vercel.app/components/criterion-chip) | Structured criterion produced by AI search: muted key + value, removable. 32px, radius 12. | [`components/ui/criterion-chip.tsx`](./src/components/ui/criterion-chip.tsx) |
| [Sequence Step](https://vantu-ui.vercel.app/components/sequence-step) | One card per step: channel tile, title, timing meta, content preview and optional stats. Channels: email · LinkedIn · call · task. | [`components/ui/sequence-step.tsx`](./src/components/ui/sequence-step.tsx) |

### Feedback

| Name | What it is | Source |
| --- | --- | --- |
| [Banner](https://vantu-ui.vercel.app/components/banner) | Full-width announcement above the app shell — trials, outages and launches. | [`components/ui/banner.tsx`](./src/components/ui/banner.tsx) |
| [Spinner](https://vantu-ui.vercel.app/components/spinner) | Indeterminate loading indicator in four sizes and three tones. | [`components/ui/spinner.tsx`](./src/components/ui/spinner.tsx) |
| [Notification](https://vantu-ui.vercel.app/components/notification) | Feed item for a notification center: who did what, when, with quotes and actions. | [`components/ui/notification.tsx`](./src/components/ui/notification.tsx) |
| [Announcement](https://vantu-ui.vercel.app/components/announcement) | Dismissible product-news card, plus the inline “New · …” pill for hero sections. | [`components/ui/announcement.tsx`](./src/components/ui/announcement.tsx) |
| [Alert](https://vantu-ui.vercel.app/components/alert) | Inline alert for sync issues, limits and compliance notes. Four tones plus feature, three styles (soft, solid, outline) and two sizes. | [`components/ui/alert.tsx`](./src/components/ui/alert.tsx) |
| [Toast](https://vantu-ui.vercel.app/components/toast) | Bottom-right confirmation, 400px. Tone icon, title, description and optional action. | [`components/ui/toast.tsx`](./src/components/ui/toast.tsx) |
| [AI Insight](https://vantu-ui.vercel.app/components/ai-insight) | Eyebrow, concise headline and reason. The compact form fits one line in tables and toolbars. | [`components/ui/ai-insight.tsx`](./src/components/ui/ai-insight.tsx) |
| [Progress Steps](https://vantu-ui.vercel.app/components/progress-steps) | Named AI steps: done (green check), active (accent loader), pending (dashed circle). | [`components/ui/progress-steps.tsx`](./src/components/ui/progress-steps.tsx) |
| [Skeleton](https://vantu-ui.vercel.app/components/skeleton) | Realistic placeholders that mirror the loaded layout. | [`components/ui/skeleton.tsx`](./src/components/ui/skeleton.tsx) |
| [Empty State](https://vantu-ui.vercel.app/components/empty-state) | Say what is empty, why, and the next step. One primary action. | [`components/ui/empty-state.tsx`](./src/components/ui/empty-state.tsx) |

## Blocks

| Name | What it is | Source |
| --- | --- | --- |
| [Sidebar](https://vantu-ui.vercel.app/blocks/sidebar) | Workspace selector, quick actions, grouped navigation, credit usage and profile. | [`components/blocks/sidebar.tsx`](./src/components/blocks/sidebar.tsx) |
| [Page Title Bar](https://vantu-ui.vercel.app/blocks/page-title-bar) | 88px header: avatar or ringed icon, title + description, search/notification utilities and actions. | [`components/blocks/page-title-bar.tsx`](./src/components/blocks/page-title-bar.tsx) |
| [Topbar](https://vantu-ui.vercel.app/blocks/topbar) | Breadcrumb and help/notification actions, 60px tall. | [`components/blocks/topbar.tsx`](./src/components/blocks/topbar.tsx) |
| [Page Header](https://vantu-ui.vercel.app/blocks/page-header) | Title (24 SemiBold, optional badge), description and actions — secondary before primary, one primary per view. | [`components/blocks/page-header.tsx`](./src/components/blocks/page-header.tsx) |
| [Metrics Strip](https://vantu-ui.vercel.app/blocks/metrics-strip) | KPI cells with deltas and sparkbars in one card. | [`components/blocks/metrics-strip.tsx`](./src/components/blocks/metrics-strip.tsx) |
| [Prospects Table](https://vantu-ui.vercel.app/blocks/prospects-table) | AI-ranked prospects with buying signals, score meters and row actions. | [`components/blocks/prospects-table.tsx`](./src/components/blocks/prospects-table.tsx) |
| [Data Table](https://vantu-ui.vercel.app/blocks/data-table) | Generic table block: saved-view tabs, search and filters, selection bar with bulk actions, sortable selectable rows and pagination. Columns and views come in as props. | [`components/blocks/data-table.tsx`](./src/components/blocks/data-table.tsx) |
| [AI Search Panel](https://vantu-ui.vercel.app/blocks/ai-search-panel) | AI search, parsed criteria chips, an insight and named progress steps. Submit to replay the steps. | [`components/blocks/ai-search-panel.tsx`](./src/components/blocks/ai-search-panel.tsx) |
| [Sequence Flow](https://vantu-ui.vercel.app/blocks/sequence-flow) | Vertical flow: enrollment → step cards → wait pills on a 1px connector → add step. | [`components/blocks/sequence-flow.tsx`](./src/components/blocks/sequence-flow.tsx) |
| [Activity Feed](https://vantu-ui.vercel.app/blocks/activity-feed) | Recent workspace activity on a timeline rail. | [`components/blocks/activity-feed.tsx`](./src/components/blocks/activity-feed.tsx) |
| [Performance Chart](https://vantu-ui.vercel.app/blocks/performance-chart) | Stacked bar chart in plain SVG with KPI header and range control. | [`components/blocks/performance-chart.tsx`](./src/components/blocks/performance-chart.tsx) |
| [Sequence Performance](https://vantu-ui.vercel.app/blocks/sequence-performance) | Reply rate per sequence, with below-average rows in gray. | [`components/blocks/sequence-performance.tsx`](./src/components/blocks/sequence-performance.tsx) |
| [Usage Card](https://vantu-ui.vercel.app/blocks/usage-card) | Plan usage for the current billing cycle. | [`components/blocks/usage-card.tsx`](./src/components/blocks/usage-card.tsx) |
| [Command Menu](https://vantu-ui.vercel.app/blocks/command-menu) | ⌘K palette with search, grouped results and keyboard hints. | [`components/blocks/command-menu.tsx`](./src/components/blocks/command-menu.tsx) |
| [Sign In](https://vantu-ui.vercel.app/blocks/sign-in) | Authentication card with social sign-in and email + password. | [`components/blocks/sign-in.tsx`](./src/components/blocks/sign-in.tsx) |

## Charts

Every chart also needs [`components/charts/chart-kit.tsx`](./src/components/charts/chart-kit.tsx).

| Name | What it is | Source |
| --- | --- | --- |
| [Area Chart](https://vantu-ui.vercel.app/charts/area-chart) | Single-series trend with a gradient fill, optional dashed prior-period line, crosshair tooltip and arrow-key scrubbing. | [`components/charts/area-chart.tsx`](./src/components/charts/area-chart.tsx) |
| [Line Chart](https://vantu-ui.vercel.app/charts/line-chart) | Up to 6 series on one shared axis. Legend always on; ≤ 4 series are also labeled at the line end, with collision nudging. | [`components/charts/line-chart.tsx`](./src/components/charts/line-chart.tsx) |
| [Bar Chart](https://vantu-ui.vercel.app/charts/bar-chart) | Vertical bars, grouped by series, with 4px rounded data ends, 2px gaps and a full-band hover target per category. | [`components/charts/bar-chart.tsx`](./src/components/charts/bar-chart.tsx) |
| [Stacked Bar Chart](https://vantu-ui.vercel.app/charts/stacked-bar-chart) | Composition over time: segments stacked with 2px surface gaps, only the top segment rounded, and a total in the tooltip. | [`components/charts/stacked-bar-chart.tsx`](./src/components/charts/stacked-bar-chart.tsx) |
| [Horizontal Bar Chart](https://vantu-ui.vercel.app/charts/horizontal-bar-chart) | Ranked list with bars — HTML rows so long names wrap, values right-aligned, and leaders highlighted against gray. | [`components/charts/horizontal-bar-chart.tsx`](./src/components/charts/horizontal-bar-chart.tsx) |
| [Donut Chart](https://vantu-ui.vercel.app/charts/donut-chart) | Part-to-whole for ≤ 6 parts. Center shows the total or the hovered slice's share; the legend carries value and percent. | [`components/charts/donut-chart.tsx`](./src/components/charts/donut-chart.tsx) |
| [Radial Chart](https://vantu-ui.vercel.app/charts/radial-chart) | One headline value against a goal: a 240° gauge with an optional pacing target and an on-pace / behind badge. | [`components/charts/radial-chart.tsx`](./src/components/charts/radial-chart.tsx) |
| [Funnel Chart](https://vantu-ui.vercel.app/charts/funnel-chart) | Stage-to-stage conversion with centered bars, step rates between stages and the biggest drop-off called out. | [`components/charts/funnel-chart.tsx`](./src/components/charts/funnel-chart.tsx) |
| [Heatmap](https://vantu-ui.vercel.app/charts/heatmap) | Magnitude across two dimensions on a six-step sequential accent ramp, with per-cell tooltips and keyboard focus. | [`components/charts/heatmap.tsx`](./src/components/charts/heatmap.tsx) |
| [Sparkline](https://vantu-ui.vercel.app/charts/sparkline) | Word-sized trend for KPI tiles and table cells. Shape only — always pair it with the number it summarizes. | [`components/charts/sparkline.tsx`](./src/components/charts/sparkline.tsx) |

## Templates

Full workspace screens assembled from the components and blocks above. Source in [`src/components/templates/`](./src/components/templates).

| Name | What it is | Preview |
| --- | --- | --- |
| Home Dashboard | CRM dashboard: revenue and pipeline KPIs, revenue trend, deals closing soon, pipeline by stage, tasks, rep leaderboard and activity. | [Open](https://vantu-ui.vercel.app/preview/home-dashboard) |
| All Prospects | App shell, page header with import/add actions and the full data table with views, filters, bulk actions and pagination. | [Open](https://vantu-ui.vercel.app/preview/prospects) |
| Team Dashboard | Greeting header, meetings-goal gauge, team availability, current campaign, notes and a schedule column with day picker. | [Open](https://vantu-ui.vercel.app/preview/team-dashboard) |
| Calendar | Week view with status summary cards, filter tabs with counts and a time grid of positioned events. | [Open](https://vantu-ui.vercel.app/preview/calendar) |
| Team Members | Members directory: segmented status filter, search, sortable selectable table with presence, documents and per-page pagination. | [Open](https://vantu-ui.vercel.app/preview/team-members) |
| Settings | Top tabs, a left sub-menu card and a constrained form column — General, Profile and Notifications are wired up. | [Open](https://vantu-ui.vercel.app/preview/settings) |
| Sign In (split) | Form on the left with social sign-in; a rotating product showcase on the right. | [Open](https://vantu-ui.vercel.app/preview/sign-in-split) |
| Onboarding | Five-step flow with a header step indicator, choice cards and a summary. | [Open](https://vantu-ui.vercel.app/preview/onboarding) |

## Run the docs site locally

```bash
git clone https://github.com/edisunardi98/vantu-ui.git
cd vantu-ui
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Project layout

| Path | What |
| --- | --- |
| `src/styles/theme.css` | Design tokens mirrored from the Figma variables (Color, Scale, Typography) |
| `src/components/ui/` | 70 components (copy-in, React Aria + Tailwind v4) |
| `src/components/blocks/` | 15 blocks |
| `src/components/charts/` | 10 plain-SVG charts + `chart-kit.tsx` |
| `src/components/templates/` | Workspace templates (dashboard, calendar, team, settings, sign-in, onboarding) |
| `src/examples/<slug>/<id>.tsx` | Docs examples; their source is shown in the Code tab |
| `src/lib/registry.ts` | Docs metadata: examples, files, dependencies, props |
| `src/app/` | Docs site (landing, `/docs`, `/foundations`, `/components`, `/blocks`, `/charts`, `/templates`) |

### Adding a component

1. Create `src/components/ui/<slug>.tsx`.
2. Add examples in `src/examples/<slug>/<id>.tsx` and register them in `src/examples/index.ts`.
3. Add an entry to `components` in `src/lib/registry.ts`.

## Contributing

Found a bug or missing a component? [Open an issue](https://github.com/edisunardi98/vantu-ui/issues/new/choose). Pull requests are welcome too. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Everything in this repository is released under the [MIT license](./LICENSE). Use it in personal and commercial projects.
Logos and names shown in previews belong to their owners and are only sample content.

---

<div align="center">

If Vantu UI saves you time, a ⭐ helps others find it.

</div>
