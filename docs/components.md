# AvValley Component System

This document explains **how and when to use** components. All design token values (colors, spacing, border radius) are defined once in `tailwind.config.mjs` — this guide references them, never duplicates them.

---

## Section Component

Wraps major content areas with consistent background and padding.

### Usage
```astro
<Section variant="dark">
  <h2>Section Title</h2>
  <p>Content here</p>
</Section>
```

### Variants
- **`dark`** — Dark background for bold sections (features, testimonials, CTAs)
- **`light`** — White background for contrast (breaks up dark sections, lighter content)
- **`grey`** — Light grey background (intermediate contrast, alternative to dark or light)

### Props
- `variant` — `'dark'` | `'light'` | `'grey'` (default: `'dark'`)
- `bordered` — Add bottom border (default: `true`)
- `id` — HTML id for anchor links
- `class` — Additional Tailwind classes for customization

### Best Practice: Section Rhythm
Alternate section backgrounds to create visual flow and prevent monotony:

**Recommended Pattern:**
```
Dark → Light → Grey → Dark → Grey → Dark → Light
```

**Text Colors by Section:**
- **Dark sections:** White text
- **Light sections:** Dark text
- **Grey sections:** Dark text

This ensures readable contrast at all times.

---

## Card Component

Reusable container for displaying related content (projectors, features, testimonials, etc.).

### Usage
```astro
<Card variant="light">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Variants
- **`light`** — Light grey background. Use on `light` or `grey` sections.
- **`dark`** — Dark background. Use on `dark` sections.

### Props
- `variant` — `'light'` | `'dark'` (default: `'light'`)
- `hover` — Blue border on hover (default: `true`)
- `class` — Additional classes

### Styling Features
- Rounded corners (consistent border-radius)
- Flex column layout for vertical stacking
- Hover effect: border transitions to brand blue
- Maintains card group styling for interactive effects

---

## Button Component

Consistent button styling across all CTAs and interactions.

### Usage
```astro
<Button variant="primary">Click Me</Button>
<Button variant="secondary" href="/page">Link Button</Button>
<Button variant="ghost" size="sm">Secondary Action</Button>
```

### Variants
- **`primary`** — Solid blue background, white text. Use for main CTAs.
- **`secondary`** — Transparent with blue border, white text. Use for secondary actions on dark backgrounds.
- **`outline`** — Transparent with grey border, dark text. Use on light backgrounds.
- **`ghost`** — Text-only, no background. Use for tertiary actions.

### Sizes
- **`sm`** — Smaller padding, smaller text. Use in cards, modals, compact spaces.
- **`md`** — Standard padding. Default for most buttons.
- **`lg`** — Larger padding. Use for prominent CTAs.

### Props
- `variant` — `'primary'` | `'secondary'` | `'outline'` | `'ghost'` (default: `'primary'`)
- `size` — `'sm'` | `'md'` | `'lg'` (default: `'md'`)
- `href` — If provided, renders as `<a>` tag instead of `<button>`
- `type` — `'button'` | `'submit'` | `'reset'` (only for button elements)
- `class` — Additional classes

### Button + Background Combinations

**On Dark Sections:**
- Primary CTA: `<Button variant="primary">Request Quote</Button>`
- Secondary action: `<Button variant="secondary">Learn More</Button>`

**On Light Sections:**
- Primary CTA: `<Button variant="primary">Request Quote</Button>` (still blue)
- Secondary action: `<Button variant="outline">View Details</Button>`

**Hover States:**
- Primary buttons lift slightly (`hover:-translate-y-1`) with glow shadow
- Secondary/outline buttons darken on hover
- Ghost buttons change text color on hover

---

## Wrapper Component

Simple container for applying consistent theme (light or dark).

### Usage
```astro
<Wrapper variant="light" padded>
  <p>Light background content</p>
</Wrapper>
```

### Variants
- **`light`** — White background with dark text
- **`dark`** — Dark background with white text

### Props
- `variant` — `'light'` | `'dark'` (default: `'light'`)
- `padded` — Add padding (default: `false`)
- `class` — Additional classes

---

## Design System Rules

All rules below reference `tailwind.config.mjs` — changes there auto-update everywhere.

### Spacing
- **Section padding:** `py-24` (96px top/bottom)
- **Container:** `max-w-container mx-auto px-6`
- **Card padding:** `p-6`
- **Grid gaps:** `gap-6`

### Border Radius
- **Buttons:** `rounded` (4px)
- **Cards:** `rounded-xl` (12px)
- **Inputs:** `rounded-lg` (8px)
- **Decorative:** `rounded-2xl` (16px)

### Colors
All defined in `tailwind.config.mjs` under `theme.extend.colors.brand`:
- `bg` — Dark background (#0A1322)
- `secondary` — Slightly lighter dark (#0E1B31)
- `card` — Dark card background (#111E33)
- `border` — Border color for dark backgrounds (#23344F)
- `blue` — Primary accent (#169ADC)
- `hover` — Hover state (#1AAFE8)
- `text` — Primary text, white (#FFFFFF)
- `muted` — Secondary text, muted white (#B8C4D6)
- `grey` — Light grey background (#F3F4F6)
- `dark` — Dark text for light backgrounds (#1F2937)

### Typography
- **Headings:** `font-heading font-bold uppercase tracking-wider`
- **Body text:** `font-sans` (Poppins)
- **Buttons:** `font-heading font-bold uppercase tracking-wider`

### Transitions
- **Default:** `transition-all duration-500`
- **Colors only:** `transition-colors`
- **Quick effects:** `duration-300`
- **Slow reveals:** `duration-700`

### Shadows
- **Lift effect:** `hover:-translate-y-1` (subtle elevation)
- **Glow effect:** `shadow-[0_0_20px_rgba(22,154,220,0.4)]` (blue glow)
- **Hover glow:** `hover:shadow-[0_0_30px_rgba(26,175,232,0.6)]`

---

## Reveal Animation

Scroll-triggered fade-in animation on all major elements.

### Usage
```astro
<div class="reveal">
  <h2>Animates in on scroll</h2>
</div>
```

### How It Works
- `.reveal` class fades in + slides up when scrolled into view
- JavaScript watches for `.reveal` elements
- Adds `.active` class to trigger animation
- Defined in `src/styles/components.css`

---

## Component Implementation Guidelines

### When Creating a Page
1. Use `<Section>` for major areas (intro, features, CTA, FAQ, etc.)
2. Alternate section variants to create visual rhythm
3. Use `<Card>` inside sections for itemized content
4. Use `<Button>` for all CTAs
5. Add `.reveal` class to content that should animate on scroll

### When Styling
- Reference design tokens from `tailwind.config.mjs`, not hardcoded values
- Use component props for variations, not inline classes
- Add additional classes only for one-off customizations

### When Updating Design
1. Change value in `tailwind.config.mjs`
2. Everything that uses it updates automatically
3. No need to update this documentation unless behavior changes

---

## Example: Complete Page Section

```astro
---
import Section from '../components/Section.astro';
import Card from '../components/Card.astro';
import Button from '../components/Button.astro';
---

<!-- Dark feature section -->
<Section variant="dark">
  <div class="text-center mb-16 reveal">
    <h2 class="font-heading font-bold text-5xl uppercase text-white mb-4">
      Available Options
    </h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card variant="dark">
      <h3>Option 1</h3>
      <p>Description here</p>
      <Button variant="primary" size="sm">Select</Button>
    </Card>
    <!-- More cards... -->
  </div>
</Section>

<!-- Light contrast section -->
<Section variant="light">
  <h2>Contrast Section</h2>
  <p>Light background provides visual relief</p>
</Section>

<!-- Grey section for variety -->
<Section variant="grey">
  <h2>Alternative Background</h2>
  <p>Use grey to break up too much dark-light alternation</p>
</Section>
```

---

## Notes

- This component system prioritizes **consistency** over flexibility
- Design decisions are made once (in config), then reused everywhere
- Add new components when you have 3+ instances of similar UI patterns
- Don't create a component for one-off layouts — use semantic HTML instead
