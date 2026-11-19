// Single source of truth for the docs: every component and block, its examples,
// the files a user copies, and its props.

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ExampleDef {
  id: string;
  title: string;
  description?: string;
}

export interface RegistryEntry {
  slug: string;
  name: string;
  description: string;
  kind: "component" | "block" | "chart";
  group: string;
  examples: ExampleDef[];
  /** Files to copy into a project, relative to src/. */
  files: string[];
  /** npm packages beyond react. */
  dependencies: string[];
  props?: PropDef[];
  isNew?: boolean;
}

const RAC = "react-aria-components";
const ICONS = "lucide-react";

const c = (e: Omit<RegistryEntry, "kind" | "files"> & { files?: string[] }): RegistryEntry => ({
  kind: "component",
  files: e.files ?? [`components/ui/${e.slug}.tsx`],
  ...e,
});

const b = (e: Omit<RegistryEntry, "kind" | "group" | "examples"> & { examples?: ExampleDef[] }): RegistryEntry => ({
  kind: "block",
  group: "Blocks",
  examples: e.examples ?? [{ id: "default", title: "Preview" }],
  ...e,
});

const ch = (e: Omit<RegistryEntry, "kind" | "group" | "examples" | "files" | "dependencies"> & { examples?: ExampleDef[]; files?: string[]; dependencies?: string[] }): RegistryEntry => ({
  kind: "chart",
  group: "Charts",
  examples: e.examples ?? [{ id: "default", title: "Preview" }],
  files: e.files ?? [`components/charts/${e.slug}.tsx`, "components/charts/chart-kit.tsx"],
  dependencies: e.dependencies ?? [],
  ...e,
});

export const components: RegistryEntry[] = [
  // Actions
  c({
    slug: "button",
    name: "Button",
    group: "Actions",
    description: "Primary, secondary, ghost and danger actions in three sizes, with optional leading or trailing icons and a pending state.",
    dependencies: [RAC, ICONS],
    examples: [
      { id: "variants", title: "Variants", description: "Primary uses the accent gradient and a soft colored glow. Secondary is a white raised surface." },
      { id: "sizes", title: "Sizes", description: "36, 40 and 44px tall, all radius 12." },
      { id: "icons", title: "With icons", description: "Padding tightens on the icon side. Icon-only buttons need an aria-label." },
      { id: "states", title: "Pending and disabled", description: "Press the first button to see the pending spinner." },
      { id: "more-variants", title: "Neutral, soft and outline", description: "Neutral is a dark filled action; soft and outline are lower-emphasis accent styles; danger-soft for reversible destructive actions." },
      { id: "compact", title: "Compact sizes", description: "32 and 28px for card headers, toolbars and dense tables." },
    ],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger" | "neutral" | "soft" | "outline" | "danger-soft"', default: '"secondary"', description: "Visual style." },
      { name: "size", type: '"2xs" | "xs" | "sm" | "md" | "lg"', default: '"md"', description: "Height: 28, 32, 36, 40 or 44px." },
      { name: "leadingIcon", type: "ReactNode", description: "Icon before the label." },
      { name: "trailingIcon", type: "ReactNode", description: "Icon after the label." },
      { name: "iconOnly", type: "boolean", default: "false", description: "Square button. Pass the icon as children." },
      { name: "isPending", type: "boolean", default: "false", description: "Shows a spinner and blocks presses." },
      { name: "isDisabled", type: "boolean", default: "false", description: "Disables the button." },
      { name: "onPress", type: "(e: PressEvent) => void", description: "Called on click, tap or keyboard activation." },
    ],
  }),
  c({
    slug: "icon-button",
    name: "Icon Button",
    group: "Actions",
    description: "Compact square action for toolbars, topbars and table rows.",
    dependencies: [RAC],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "aria-label", type: "string", description: "Required accessible name." },
      { name: "variant", type: '"secondary" | "ghost"', default: '"secondary"', description: "Raised or flat." },
      { name: "size", type: '"xs" | "sm" | "md"', default: '"md"', description: "28, 32 or 36px." },
    ],
  }),
  c({
    slug: "menu",
    name: "Menu",
    group: "Actions",
    description: "Row actions and dropdown menus with 36px items, 16px icons and optional shortcuts.",
    dependencies: [RAC],
    files: ["components/ui/menu.tsx", "components/ui/kbd.tsx"],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "icon", type: "ReactNode", description: "MenuItem: leading icon." },
      { name: "shortcut", type: "string", description: "MenuItem: keyboard hint shown on the right." },
      { name: "danger", type: "boolean", description: "MenuItem: destructive styling." },
      { name: "onAction", type: "(key: Key) => void", description: "Menu: called with the item id." },
    ],
  }),
  c({
    slug: "filter",
    name: "Filter",
    group: "Actions",
    description: "Toolbar filter trigger (muted label + value + chevron) and a dashed “Add filter” button.",
    dependencies: [RAC, ICONS],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "label", type: "string", description: "Muted label, e.g. “Owner”." },
      { name: "value", type: "ReactNode", description: "Current value." },
    ],
  }),

  // Forms
  c({
    slug: "input",
    name: "Input",
    group: "Forms",
    description: "Text field, 40px tall. Focus swaps the border to accent and adds a 3px ring.",
    dependencies: [RAC],
    files: ["components/ui/input.tsx", "components/ui/field.tsx"],
    examples: [
      { id: "default", title: "With label" },
      { id: "with-icon", title: "Search field", description: "Optional 16px leading icon and trailing content." },
      { id: "states", title: "States" },
    ],
    props: [
      { name: "label", type: "string", description: "Visible label." },
      { name: "description", type: "string", description: "Helper text under the field." },
      { name: "errorMessage", type: "string", description: "Marks the field invalid and shows the message." },
      { name: "icon", type: "ReactNode", description: "Leading icon." },
      { name: "trailing", type: "ReactNode", description: "Trailing content, e.g. a Kbd." },
      { name: "isDisabled", type: "boolean", description: "Disables the field." },
    ],
  }),
  c({
    slug: "select",
    name: "Select",
    group: "Forms",
    description: "Single-value dropdown with a trailing chevron and keyboard navigation.",
    dependencies: [RAC, ICONS],
    files: ["components/ui/select.tsx", "components/ui/field.tsx"],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "label", type: "string", description: "Visible label." },
      { name: "placeholder", type: "string", default: '"Select an option"', description: "Shown with no selection." },
      { name: "selectedKey", type: "Key", description: "Controlled value." },
      { name: "onSelectionChange", type: "(key: Key) => void", description: "Called when the value changes." },
    ],
  }),
  c({
    slug: "textarea",
    name: "Textarea",
    group: "Forms",
    description: "Multiline field, 14 Regular at 140% line height, minimum 96px tall.",
    dependencies: [RAC],
    files: ["components/ui/textarea.tsx", "components/ui/field.tsx"],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "checkbox",
    name: "Checkbox",
    group: "Forms",
    description: "16px checkbox with checked, indeterminate and disabled states.",
    dependencies: [RAC, ICONS],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "radio",
    name: "Radio",
    group: "Forms",
    description: "16px radio buttons in a labelled group.",
    dependencies: [RAC],
    files: ["components/ui/radio.tsx", "components/ui/field.tsx"],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "switch",
    name: "Switch",
    group: "Forms",
    description: "40 × 24 track with a 16px knob and 4px inset.",
    dependencies: [RAC],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "chip",
    name: "Chip & Kbd",
    group: "Forms",
    description: "32px selectable and removable tokens for criteria builders and tag editors, plus keyboard keys.",
    dependencies: [RAC, ICONS],
    files: ["components/ui/chip.tsx", "components/ui/kbd.tsx"],
    examples: [{ id: "default", title: "Preview" }],
  }),

  // Data display
  c({
    slug: "badge",
    name: "Badge",
    group: "Data display",
    description: "Six tones × two styles. Soft is a tinted status or category. Dot is a neutral surface with a tone dot for workflow status.",
    dependencies: [],
    examples: [
      { id: "tones", title: "Soft and dot" },
      { id: "styles", title: "Solid, outline and sizes", description: "Solid for high emphasis, outline on busy surfaces, sm (20px) inside dense rows." },
    ],
    props: [
      { name: "tone", type: '"neutral" | "accent" | "info" | "success" | "warning" | "error"', default: '"neutral"', description: "Color." },
      { name: "variant", type: '"soft" | "dot" | "solid" | "outline"', default: '"soft"', description: "Style." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "20 or 24px." },
      { name: "icon", type: "ReactNode", description: "Optional 12px icon." },
    ],
  }),
  c({
    slug: "counter",
    name: "Counter",
    group: "Data display",
    description: "Navigation and tab counts. 20px pill, 12 Medium.",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "avatar",
    name: "Avatar",
    group: "Data display",
    description: "People are circular initials on a soft tint (24 in tables, 32 in lists, 40 in headers). Companies are square marks.",
    dependencies: [],
    examples: [
      { id: "default", title: "Preview" },
      { id: "status", title: "Status and verified", description: "Presence dot bottom-right (online · away · busy · offline), verified check top-right. Six sizes from 20 to 56px." },
    ],
    props: [
      { name: "name", type: "string", description: "Used for initials, the title and a stable color." },
      { name: "src", type: "string", description: "Photo URL. Falls back to initials." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"', description: "20, 24, 32, 40, 48 or 56px." },
      { name: "status", type: '"online" | "away" | "busy" | "offline"', description: "Presence indicator." },
      { name: "verified", type: "boolean", description: "Verified check." },
      { name: "color", type: '"blue" | "green" | "amber" | "rose" | "violet" | "slate" | "teal"', description: "Overrides the color picked from the name." },
    ],
  }),
  c({
    slug: "score-meter",
    name: "Score Meter",
    group: "Data display",
    description: "AI score as 10 ticks plus the value. ≥ 80 hot (green), 60–79 warm (amber), < 60 cold (gray).",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "score", type: "number", description: "0–100." },
      { name: "showValue", type: "boolean", default: "true", description: "Show the number." },
    ],
  }),
  c({
    slug: "metric",
    name: "Delta & Metric",
    group: "Data display",
    description: "Delta is a trend glyph and value in the semantic tone. Metric is label, 32 SemiBold value, delta and caption.",
    dependencies: [ICONS],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "value", type: "number", description: "Delta: sign picks tone and glyph." },
      { name: "invert", type: "boolean", description: "Delta: lower is better." },
      { name: "aside", type: "ReactNode", description: "Metric: visual on the right, e.g. Sparkbars." },
    ],
  }),
  c({
    slug: "progress-bar",
    name: "Progress Bar",
    group: "Data display",
    description: "4px track for usage, quotas and rates.",
    dependencies: [],
    examples: [
      { id: "default", title: "Label on top" },
      { id: "label-right", title: "Percentage on the right" },
    ],
  }),
  c({
    slug: "card",
    name: "Card",
    group: "Data display",
    description: "Layered card: a subtle shell (radius 16, 4px padding) holding a header and an inner white panel.",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "timeline",
    name: "Timeline",
    group: "Data display",
    description: "Items connect with a 1px rail; the last item drops the rail.",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
  }),

  c({
    slug: "description-list",
    name: "Description List",
    group: "Data display",
    description: "Key/value rows inside a plain card (white, 1px border, radius 16, padding 20) for details and settings.",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "integration-mark",
    name: "Brand & Integration Marks",
    group: "Data display",
    description: "Product lockup, wordmark and mark in two sizes, 24px integration tiles and social sign-in buttons.",
    dependencies: [ICONS],
    examples: [
      { id: "default", title: "Brand and integrations", description: "Integration tiles use generic glyphs in the provider’s color. Swap in official logos if your license allows." },
      { id: "social", title: "Social sign-in", description: "Large (44) secondary button with the provider mark. Authentication screens only." },
    ],
  }),

  // Navigation
  c({
    slug: "nav-item",
    name: "Nav Item",
    group: "Navigation",
    description: "Sidebar link with optional muted count or unread badge, plus uppercase section labels.",
    dependencies: [],
    files: ["components/ui/nav-item.tsx", "components/ui/counter.tsx"],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "tabs",
    name: "Tabs",
    group: "Navigation",
    description: "Underline tabs with a 2px text-primary indicator.",
    dependencies: [RAC],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "segmented-control",
    name: "Segmented Control",
    group: "Navigation",
    description: "Compact single choice for ranges such as 7D · 30D · 90D.",
    dependencies: [RAC],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "pagination",
    name: "Pagination",
    group: "Navigation",
    description: "Table footer. Summary left, pages right; 32px page items, radius 8.",
    dependencies: [RAC, ICONS],
    examples: [{ id: "default", title: "Preview" }],
  }),

  // Overlays
  c({
    slug: "modal",
    name: "Modal & Drawer",
    group: "Overlays",
    description: "Shared header and footer parts. Modal is 560px wide; drawer is 480px wide, full height, docked right.",
    dependencies: [RAC, ICONS],
    examples: [
      { id: "default", title: "Modal" },
      { id: "drawer", title: "Drawer" },
    ],
    props: [
      { name: "title", type: "string", description: "Dialog heading." },
      { name: "description", type: "string", description: "Line under the title." },
      { name: "variant", type: '"modal" | "drawer"', default: '"modal"', description: "Layout." },
      { name: "footer", type: "(close) => ReactNode", description: "Footer actions." },
      { name: "footerNote", type: "ReactNode", description: "Left side of the footer." },
    ],
  }),
  c({
    slug: "tooltip",
    name: "Tooltip",
    group: "Overlays",
    description: "Dark 12 Medium bubble, radius 8, raised shadow. One line, no arrow.",
    dependencies: [RAC],
    examples: [{ id: "default", title: "Preview" }],
  }),

  // AI & workflow
  c({
    slug: "ai-search",
    name: "AI Search",
    group: "AI & workflow",
    description: "The one prominent control on AI screens: 64px bar, natural-language query in 16 Regular and a Large primary action.",
    dependencies: [RAC, ICONS],
    files: ["components/ui/ai-search.tsx", "components/ui/button.tsx"],
    isNew: true,
    examples: [{ id: "default", title: "Preview", description: "States: empty · filled · focus. Press Enter to submit." }],
    props: [
      { name: "onSubmit", type: "(query: string) => void", description: "Called on Enter or button press." },
      { name: "placeholder", type: "string", description: "Prompt hint." },
      { name: "actionLabel", type: "string", default: '"Find prospects"', description: "Button label." },
      { name: "isPending", type: "boolean", description: "Shows the spinner on the action." },
    ],
  }),
  c({
    slug: "criterion-chip",
    name: "Criterion Chip",
    group: "AI & workflow",
    description: "Structured criterion produced by AI search: muted key + value, removable. 32px, radius 12.",
    dependencies: [RAC, ICONS],
    isNew: true,
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "label", type: "string", description: "Muted key, e.g. “Role”." },
      { name: "value", type: "string", description: "Criterion value." },
      { name: "onRemove", type: "() => void", description: "Shows the remove button when set." },
    ],
  }),
  c({
    slug: "sequence-step",
    name: "Sequence Step",
    group: "AI & workflow",
    description: "One card per step: channel tile, title, timing meta, content preview and optional stats. Channels: email · LinkedIn · call · task.",
    dependencies: [RAC, ICONS],
    files: ["components/ui/sequence-step.tsx", "components/ui/menu.tsx", "components/ui/icon-button.tsx"],
    isNew: true,
    examples: [{ id: "default", title: "Preview", description: "{{variables}} in templates are highlighted." }],
    props: [
      { name: "step", type: "number", description: "Step number." },
      { name: "channel", type: '"email" | "linkedin" | "call" | "task"', description: "Picks the icon and label." },
      { name: "name", type: "string", description: "Step name, shown as “Email · Intro”." },
      { name: "timing", type: "string", description: "e.g. “Day 1 · Automatic”." },
      { name: "subject / preview", type: "string", description: "Content preview." },
      { name: "stats", type: "{ label, value }[]", description: "Footer stats." },
    ],
  }),


  // Actions, forms and feedback variants
  c({ slug: "link-button", name: "Link Button", group: "Actions", isNew: true, description: "Inline text action in gray, black, accent or error, with optional underline and icons.", dependencies: [RAC], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "button-group", name: "Button Group", group: "Actions", isNew: true, description: "Joined buttons sharing one border — view switches, ranges and formatting toolbars. Three sizes.", dependencies: [RAC], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "slider", name: "Slider", group: "Forms", isNew: true, description: "Single value or range on a 6px track, with the value beside the label or in a tooltip.", dependencies: [RAC], examples: [{ id: "default", title: "Single value" }, { id: "range", title: "Range", description: "Pass an array as the value for two thumbs." }] }),
  c({ slug: "file-upload", name: "File Upload", group: "Forms", isNew: true, description: "Drop area with a browse button, and file cards for uploading, completed and failed states.", dependencies: [RAC, ICONS], files: ["components/ui/file-upload.tsx", "components/ui/button.tsx", "components/ui/link-button.tsx"], examples: [{ id: "default", title: "Preview", description: "Drop or browse files; progress is simulated." }] }),
  c({ slug: "choice-card", name: "Choice Card", group: "Forms", isNew: true, description: "Radio group rendered as selectable cards for roles, plans and onboarding choices.", dependencies: [RAC], files: ["components/ui/choice-card.tsx", "components/ui/field.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "setting-row", name: "Setting Row", group: "Forms", isNew: true, description: "Title, description and a control — inline or leading — grouped under setting sections.", dependencies: [], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "tag", name: "Tag", group: "Data display", isNew: true, description: "24px label with an icon, avatar, company mark or flag; stroke or gray, removable.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "circular-progress", name: "Circular Progress", group: "Data display", isNew: true, description: "Ring progress for completion and a semicircle gauge for balances and goals.", dependencies: [], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "step-indicator", name: "Step Indicator", group: "Navigation", isNew: true, description: "Numbered steps — horizontal with chevrons for headers, vertical for checklists — plus dot steppers.", dependencies: [ICONS], examples: [{ id: "default", title: "Horizontal and dots" }, { id: "vertical", title: "Vertical" }] }),
  c({ slug: "accordion", name: "Accordion", group: "Navigation", isNew: true, description: "Disclosure rows with a +/× toggle; the open item becomes a raised white card.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "banner", name: "Banner", group: "Feedback", isNew: true, description: "Full-width announcement above the app shell — trials, outages and launches.", dependencies: [RAC, ICONS], files: ["components/ui/banner.tsx", "components/ui/alert.tsx"], examples: [{ id: "default", title: "Preview" }] }),

  // Everyday controls and overlays
  c({ slug: "close-button", name: "Close Button", group: "Actions", isNew: true, description: "Dismiss control for dialogs, toasts, tags and banners — ghost or filled, three sizes.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "search-field", name: "Search Field", group: "Forms", isNew: true, description: "Search input with a leading icon, a clear button and Escape-to-clear; optional shortcut hint.", dependencies: [RAC, ICONS], files: ["components/ui/search-field.tsx", "components/ui/field.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({
    slug: "combobox",
    name: "Combobox",
    group: "Forms",
    isNew: true,
    description: "Text input with a filtered list of suggestions — type to filter, arrows to move, Enter to pick.",
    dependencies: [RAC, ICONS],
    files: ["components/ui/combobox.tsx", "components/ui/select.tsx", "components/ui/field.tsx"],
    examples: [{ id: "default", title: "Preview" }],
    props: [
      { name: "label", type: "string", description: "Visible label." },
      { name: "icon", type: "ReactNode", description: "Leading icon." },
      { name: "allowsCustomValue", type: "boolean", description: "Keep text that matches no option." },
      { name: "onSelectionChange", type: "(key: Key) => void", description: "Called with the picked item id." },
    ],
  }),
  c({ slug: "number-field", name: "Number Field", group: "Forms", isNew: true, description: "Numeric input with −/+ steppers, arrow keys, min/max and locale-aware currency or percent formatting.", dependencies: [RAC, ICONS], files: ["components/ui/number-field.tsx", "components/ui/field.tsx"], examples: [{ id: "default", title: "Preview" }], props: [{ name: "formatOptions", type: "Intl.NumberFormatOptions", description: "Currency, percent, units…" }, { name: "minValue / maxValue / step", type: "number", description: "Range and increment." }] }),
  c({ slug: "input-otp", name: "Input OTP", group: "Forms", isNew: true, description: "One-time code input: one box per character with auto-advance, backspace, arrows and paste.", dependencies: [], examples: [{ id: "default", title: "Preview" }], props: [{ name: "length", type: "number", default: "6", description: "Number of characters." }, { name: "groupSize", type: "number", description: "Insert a separator every N boxes." }, { name: "pattern", type: '"digits" | "alphanumeric"', default: '"digits"', description: "Allowed characters." }, { name: "onComplete", type: "(code: string) => void", description: "Fires when every box is filled." }] }),
  c({ slug: "token-input", name: "Token Input", group: "Forms", isNew: true, description: "Free-form multi-value field: Enter, comma or paste creates tokens; Backspace removes the last.", dependencies: [RAC, ICONS], files: ["components/ui/token-input.tsx", "components/ui/tag.tsx"], examples: [{ id: "default", title: "Preview", description: "The second field validates emails." }] }),
  c({ slug: "color-picker", name: "Color Picker", group: "Forms", isNew: true, description: "Swatch trigger opening a saturation area, hue slider, hex field and preset swatches.", dependencies: [RAC], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "date-calendar", name: "Date Calendar", group: "Forms", isNew: true, description: "Month grid for a single date or a range, with unavailable dates and a today marker.", dependencies: [RAC, ICONS, "@internationalized/date"], examples: [{ id: "default", title: "Single and range" }] }),
  c({ slug: "date-picker", name: "Date Picker", group: "Forms", isNew: true, description: "Typed date segments plus a calendar popover — fully keyboard accessible and locale aware.", dependencies: [RAC, ICONS, "@internationalized/date"], files: ["components/ui/date-picker.tsx", "components/ui/date-calendar.tsx", "components/ui/field.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "time-field", name: "Time Field", group: "Forms", isNew: true, description: "Hour and minute segments you type or arrow through, 12 or 24-hour.", dependencies: [RAC, ICONS, "@internationalized/date"], files: ["components/ui/time-field.tsx", "components/ui/date-picker.tsx", "components/ui/field.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "table", name: "Table", group: "Data display", isNew: true, description: "Base table parts — sortable columns, selectable rows, header 40 on subtle, rows 48, horizontal rules only.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Sortable and selectable" }] }),
  c({ slug: "tag-group", name: "Tag Group", group: "Data display", isNew: true, description: "Keyboard-navigable set of tags with single or multiple selection and removal.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Selectable and removable" }] }),
  c({ slug: "tree-view", name: "Tree View", group: "Data display", isNew: true, description: "Nested, expandable hierarchy with folder icons, counts and keyboard navigation.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "meter", name: "Meter", group: "Data display", isNew: true, description: "A known quantity within a range — storage, quota, strength — as a bar or segments, colored by thresholds.", dependencies: [RAC], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "divider", name: "Divider", group: "Data display", isNew: true, description: "Horizontal or vertical rule with an optional inline label.", dependencies: [], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "carousel", name: "Carousel", group: "Data display", isNew: true, description: "Scroll-snap slides with arrows and dots; swipe, drag or use the keyboard.", dependencies: [ICONS], files: ["components/ui/carousel.tsx", "components/ui/step-indicator.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "breadcrumb", name: "Breadcrumb", group: "Navigation", isNew: true, description: "Path trail with chevron or slash separators and collapsing middle levels.", dependencies: [RAC, ICONS], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "popover", name: "Popover", group: "Overlays", isNew: true, description: "Non-modal floating panel anchored to a trigger, with optional title and arrow.", dependencies: [RAC], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "context-menu", name: "Context Menu", group: "Overlays", isNew: true, description: "Right-click menu anchored at the pointer; Shift+F10 or the Menu key for keyboard users.", dependencies: [RAC], files: ["components/ui/context-menu.tsx", "components/ui/menu.tsx", "components/ui/kbd.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "command-palette", name: "Command Palette", group: "Overlays", isNew: true, description: "⌘K modal search over grouped commands with shortcuts and keyboard hints.", dependencies: [RAC, ICONS], files: ["components/ui/command-palette.tsx", "components/ui/kbd.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "spinner", name: "Spinner", group: "Feedback", isNew: true, description: "Indeterminate loading indicator in four sizes and three tones.", dependencies: [], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "notification", name: "Notification", group: "Feedback", isNew: true, description: "Feed item for a notification center: who did what, when, with quotes and actions.", dependencies: [RAC, ICONS], files: ["components/ui/notification.tsx", "components/ui/close-button.tsx"], examples: [{ id: "default", title: "Preview" }] }),
  c({ slug: "announcement", name: "Announcement", group: "Feedback", isNew: true, description: "Dismissible product-news card, plus the inline “New · …” pill for hero sections.", dependencies: [RAC, ICONS], files: ["components/ui/announcement.tsx", "components/ui/close-button.tsx"], examples: [{ id: "default", title: "Card and pill" }] }),

  // Feedback
  c({
    slug: "alert",
    name: "Alert",
    group: "Feedback",
    description: "Inline alert for sync issues, limits and compliance notes. Four tones plus feature, three styles (soft, solid, outline) and two sizes.",
    dependencies: [RAC, ICONS],
    files: ["components/ui/alert.tsx", "components/ui/link-button.tsx"],
    examples: [
      { id: "default", title: "Soft" },
      { id: "styles", title: "Solid and outline with actions", description: "Link actions and a dismiss button." },
      { id: "compact", title: "Compact", description: "Single 36px line for toolbars, forms and table headers." },
    ],
    props: [
      { name: "tone", type: '"info" | "success" | "warning" | "error" | "feature"', default: '"info"', description: "Status color and icon." },
      { name: "variant", type: '"soft" | "solid" | "outline"', default: '"soft"', description: "Surface style." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Single line or stacked." },
      { name: "actions", type: "ReactNode", description: "Inline link buttons." },
      { name: "onDismiss", type: "() => void", description: "Shows the close button." },
    ],
  }),
  c({
    slug: "toast",
    name: "Toast",
    group: "Feedback",
    description: "Bottom-right confirmation, 400px. Tone icon, title, description and optional action.",
    dependencies: [RAC, ICONS],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "ai-insight",
    name: "AI Insight",
    group: "Feedback",
    description: "Eyebrow, concise headline and reason. The compact form fits one line in tables and toolbars.",
    dependencies: [ICONS],
    isNew: true,
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "progress-steps",
    name: "Progress Steps",
    group: "Feedback",
    description: "Named AI steps: done (green check), active (accent loader), pending (dashed circle).",
    dependencies: [ICONS],
    isNew: true,
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "skeleton",
    name: "Skeleton",
    group: "Feedback",
    description: "Realistic placeholders that mirror the loaded layout.",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
  }),
  c({
    slug: "empty-state",
    name: "Empty State",
    group: "Feedback",
    description: "Say what is empty, why, and the next step. One primary action.",
    dependencies: [],
    examples: [{ id: "default", title: "Preview" }],
  }),
];

export const blocks: RegistryEntry[] = [
  b({ slug: "sidebar", name: "Sidebar", description: "Workspace selector, quick actions, grouped navigation, credit usage and profile.", files: ["components/blocks/sidebar.tsx"], dependencies: [ICONS] }),
  b({ slug: "page-title-bar", name: "Page Title Bar", description: "88px header: avatar or ringed icon, title + description, search/notification utilities and actions.", files: ["components/blocks/page-title-bar.tsx"], dependencies: [RAC, ICONS], isNew: true }),
  b({ slug: "topbar", name: "Topbar", description: "Breadcrumb and help/notification actions, 60px tall.", files: ["components/blocks/topbar.tsx"], dependencies: [ICONS] }),
  b({
    slug: "page-header",
    name: "Page Header",
    description: "Title (24 SemiBold, optional badge), description and actions — secondary before primary, one primary per view.",
    files: ["components/blocks/page-header.tsx"],
    dependencies: [ICONS],
    examples: [
      { id: "default", title: "Dashboard greeting" },
      { id: "with-badge", title: "With badge" },
    ],
  }),
  b({ slug: "metrics-strip", name: "Metrics Strip", description: "KPI cells with deltas and sparkbars in one card.", files: ["components/blocks/metrics-strip.tsx", "components/charts/sparkline.tsx", "components/charts/chart-kit.tsx"], dependencies: [ICONS] }),
  b({ slug: "prospects-table", name: "Prospects Table", description: "AI-ranked prospects with buying signals, score meters and row actions.", files: ["components/blocks/prospects-table.tsx"], dependencies: [RAC, ICONS] }),
  b({ slug: "data-table", name: "Data Table", description: "Generic table block: saved-view tabs, search and filters, selection bar with bulk actions, sortable selectable rows and pagination. Columns and views come in as props.", files: ["components/blocks/data-table.tsx", "components/blocks/prospects-data-table.tsx"], dependencies: [RAC, ICONS], isNew: true }),
  b({ slug: "ai-search-panel", name: "AI Search Panel", description: "AI search, parsed criteria chips, an insight and named progress steps. Submit to replay the steps.", files: ["components/blocks/ai-search-panel.tsx"], dependencies: [RAC, ICONS], isNew: true }),
  b({ slug: "sequence-flow", name: "Sequence Flow", description: "Vertical flow: enrollment → step cards → wait pills on a 1px connector → add step.", files: ["components/blocks/sequence-flow.tsx"], dependencies: [RAC, ICONS], isNew: true }),
  b({ slug: "activity-feed", name: "Activity Feed", description: "Recent workspace activity on a timeline rail.", files: ["components/blocks/activity-feed.tsx"], dependencies: [RAC, ICONS] }),
  b({ slug: "performance-chart", name: "Performance Chart", description: "Stacked bar chart in plain SVG with KPI header and range control.", files: ["components/blocks/performance-chart.tsx"], dependencies: [RAC, ICONS] }),
  b({ slug: "sequence-performance", name: "Sequence Performance", description: "Reply rate per sequence, with below-average rows in gray.", files: ["components/blocks/sequence-performance.tsx"], dependencies: [RAC, ICONS] }),
  b({ slug: "usage-card", name: "Usage Card", description: "Plan usage for the current billing cycle.", files: ["components/blocks/usage-card.tsx"], dependencies: [RAC, ICONS] }),
  b({ slug: "command-menu", name: "Command Menu", description: "⌘K palette with search, grouped results and keyboard hints.", files: ["components/blocks/command-menu.tsx"], dependencies: [RAC, ICONS], isNew: true }),
  b({ slug: "sign-in", name: "Sign In", description: "Authentication card with social sign-in and email + password.", files: ["components/blocks/sign-in-card.tsx"], dependencies: [RAC, ICONS] }),
];

export const charts: RegistryEntry[] = [
  ch({
    slug: "area-chart",
    name: "Area Chart",
    description: "Single-series trend with a gradient fill, optional dashed prior-period line, crosshair tooltip and arrow-key scrubbing.",
    examples: [
      { id: "default", title: "With comparison", description: "Pass `previous` on each point to draw last period as a dashed neutral line." },
      { id: "minimal", title: "Minimal", description: "One series needs no legend — the card title names it. `labelEvery` thins a dense x-axis." },
    ],
    props: [
      { name: "data", type: "{ label: string; value: number; previous?: number }[]", description: "Points in x order." },
      { name: "seriesLabel", type: "string", default: '"Value"', description: "Series name in the tooltip, legend and screen-reader table." },
      { name: "previousLabel", type: "string", default: '"Previous period"', description: "Name of the comparison line." },
      { name: "format", type: "(n: number) => string", default: "formatCompact", description: "Formats axis ticks and tooltip values." },
      { name: "labelEvery", type: "number", default: "1", description: "Show every nth x label." },
    ],
  }),
  ch({
    slug: "line-chart",
    name: "Line Chart",
    description: "Up to 6 series on one shared axis. Legend always on; ≤ 4 series are also labeled at the line end, with collision nudging.",
    props: [
      { name: "data", type: "({ label: string } & Record<K, number>)[]", description: "One row per x position." },
      { name: "series", type: "{ key: K; label: string; color?: string }[]", description: "Series in fixed color order — color follows the entity, so keep order stable when filtering." },
      { name: "directLabels", type: "boolean", default: "series.length <= 4", description: "Name each line at its last point." },
      { name: "format", type: "(n: number) => string", default: "formatCompact", description: "Formats ticks and tooltip values." },
      { name: "labelEvery", type: "number", default: "1", description: "Show every nth x label." },
    ],
  }),
  ch({
    slug: "bar-chart",
    name: "Bar Chart",
    description: "Vertical bars, grouped by series, with 4px rounded data ends, 2px gaps and a full-band hover target per category.",
    examples: [
      { id: "default", title: "Grouped" },
      { id: "single", title: "Single series" },
    ],
    props: [
      { name: "data", type: "({ label: string } & Record<K, number>)[]", description: "One row per category." },
      { name: "series", type: "{ key: K; label: string; color?: string }[]", description: "Series in fixed color order." },
      { name: "layout", type: '"grouped" | "stacked"', default: '"grouped"', description: "Side by side, or piled with 2px surface gaps." },
      { name: "format", type: "(n: number) => string", default: "formatCompact", description: "Formats ticks and tooltip values." },
    ],
  }),
  ch({
    slug: "stacked-bar-chart",
    name: "Stacked Bar Chart",
    description: "Composition over time: segments stacked with 2px surface gaps, only the top segment rounded, and a total in the tooltip.",
    files: ["components/charts/bar-chart.tsx", "components/charts/chart-kit.tsx"],
    props: [{ name: "layout", type: '"stacked"', description: "Bar Chart with `layout=\"stacked\"` — see Bar Chart for the remaining props." }],
  }),
  ch({
    slug: "horizontal-bar-chart",
    name: "Horizontal Bar Chart",
    description: "Ranked list with bars — HTML rows so long names wrap, values right-aligned, and leaders highlighted against gray.",
    props: [
      { name: "data", type: "{ label: string; value: number; meta?: string }[]", description: "Items; `meta` is a secondary line under the label." },
      { name: "highlightTop", type: "number", description: "Items past this rank render in neutral gray." },
      { name: "sort", type: "boolean", default: "true", description: "Sort descending by value." },
      { name: "valueLabel", type: "string", default: '"Value"', description: "Names the measure for screen readers." },
      { name: "format", type: "(n: number) => string", default: "formatCompact", description: "Formats values." },
    ],
  }),
  ch({
    slug: "donut-chart",
    name: "Donut Chart",
    description: "Part-to-whole for ≤ 6 parts. Center shows the total or the hovered slice's share; the legend carries value and percent.",
    props: [
      { name: "data", type: "{ label: string; value: number; color?: string }[]", description: "Slices in fixed color order. Fold small parts into \"Other\"." },
      { name: "centerValue", type: "ReactNode", default: "total", description: "Big number in the hole." },
      { name: "centerLabel", type: "ReactNode", default: '"Total"', description: "Caption under the center value." },
      { name: "legend", type: '"side" | "bottom"', default: '"side"', description: "Legend placement (stacks below on narrow screens)." },
      { name: "format", type: "(n: number) => string", default: "formatCompact", description: "Formats values." },
    ],
  }),
  ch({
    slug: "radial-chart",
    name: "Radial Chart",
    description: "One headline value against a goal: a 240° gauge with an optional pacing target and an on-pace / behind badge.",
    props: [
      { name: "value", type: "number", description: "Current value." },
      { name: "max", type: "number", description: "Goal or capacity." },
      { name: "target", type: "number", description: "Pacing tick on the arc; adds an on-pace badge." },
      { name: "label", type: "ReactNode", description: "Text above the number." },
      { name: "caption", type: "ReactNode", default: '"of {max}"', description: "Text under the number." },
    ],
  }),
  ch({
    slug: "funnel-chart",
    name: "Funnel Chart",
    description: "Stage-to-stage conversion with centered bars, step rates between stages and the biggest drop-off called out.",
    dependencies: [ICONS],
    props: [
      { name: "data", type: "{ label: string; value: number }[]", description: "Stages, widest first." },
      { name: "highlightLeak", type: "boolean", default: "true", description: "Flag the step with the lowest conversion." },
      { name: "format", type: "(n: number) => string", default: "formatNumber", description: "Formats counts." },
    ],
  }),
  ch({
    slug: "heatmap",
    name: "Heatmap",
    description: "Magnitude across two dimensions on a six-step sequential accent ramp, with per-cell tooltips and keyboard focus.",
    props: [
      { name: "rows", type: "string[]", description: "Row labels, top to bottom." },
      { name: "columns", type: "string[]", description: "Column labels, left to right." },
      { name: "values", type: "number[][]", description: "values[row][column]." },
      { name: "valueLabel", type: "string", default: '"Value"', description: "Names the measure in tooltips." },
      { name: "columnLabelEvery", type: "number", default: "1", description: "Show every nth column label." },
    ],
  }),
  ch({
    slug: "sparkline",
    name: "Sparkline",
    description: "Word-sized trend for KPI tiles and table cells. Shape only — always pair it with the number it summarizes.",
    props: [
      { name: "values", type: "number[]", description: "Series in time order." },
      { name: "label", type: "string", description: "Accessible summary, e.g. \"Replies, last 14 days, trending up\"." },
      { name: "tone", type: '"accent" | "success" | "error" | "neutral"', default: '"accent"', description: "Use a status tone only when the trend itself is the message." },
      { name: "area", type: "boolean", default: "true", description: "Gradient fill under the line." },
      { name: "endDot", type: "boolean", default: "true", description: "Dot on the latest value." },
    ],
  }),
];

export const templates = [
  {
    slug: "home-dashboard",
    name: "Home Dashboard",
    description: "CRM dashboard: revenue and pipeline KPIs, revenue trend, deals closing soon, pipeline by stage, tasks, rep leaderboard and activity.",
    file: "components/blocks/home-dashboard.tsx",
  },
  {
    slug: "prospects",
    name: "All Prospects",
    description: "App shell, page header with import/add actions and the full data table with views, filters, bulk actions and pagination.",
    file: "components/blocks/prospects-page.tsx",
  },
  {
    slug: "team-dashboard",
    name: "Team Dashboard",
    description: "Greeting header, meetings-goal gauge, team availability, current campaign, notes and a schedule column with day picker.",
    file: "components/templates/team-dashboard.tsx",
  },
  {
    slug: "calendar",
    name: "Calendar",
    description: "Week view with status summary cards, filter tabs with counts and a time grid of positioned events.",
    file: "components/templates/calendar-page.tsx",
  },
  {
    slug: "team-members",
    name: "Team Members",
    description: "Members directory: segmented status filter, search, sortable selectable table with presence, documents and per-page pagination.",
    file: "components/templates/team-members.tsx",
  },
  {
    slug: "settings",
    name: "Settings",
    description: "Top tabs, a left sub-menu card and a constrained form column — General, Profile and Notifications are wired up.",
    file: "components/templates/settings-page.tsx",
  },
  {
    slug: "sign-in-split",
    name: "Sign In (split)",
    description: "Form on the left with social sign-in; a rotating product showcase on the right.",
    file: "components/templates/auth-split.tsx",
  },
  {
    slug: "onboarding",
    name: "Onboarding",
    description: "Five-step flow with a header step indicator, choice cards and a summary.",
    file: "components/templates/onboarding.tsx",
  },
];

export const componentGroups = ["Actions", "Forms", "Data display", "Navigation", "Overlays", "AI & workflow", "Feedback"];

export const kindPath = { component: "components", block: "blocks", chart: "charts" } as const;

/** Docs URL for an entry. */
export const entryHref = (e: Pick<RegistryEntry, "kind" | "slug">) => `/${kindPath[e.kind]}/${e.slug}`;

export function findEntry(kind: RegistryEntry["kind"], slug: string) {
  return (kind === "component" ? components : kind === "chart" ? charts : blocks).find((e) => e.slug === slug);
}
