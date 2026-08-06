# AvValley Brand Style Guide

**Professional Outdoor Stage & AV Rentals**

---

## Brand Identity

AvValley is a modern, professional outdoor event production company. The brand conveys expertise, reliability, and technical excellence through a dark, sophisticated visual system with bold blue accents.

**Tone:** Professional, confident, service-oriented, technical yet approachable

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Brand Blue** | `#169ADC` | 22, 154, 220 | Primary CTAs, accents, hover states, highlights |
| **Brand Blue Hover** | `#1AAFE8` | 26, 175, 232 | Hover state on blue elements |

### Background & Surface Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Dark Background** | `#0A1322` | 10, 19, 34 | Primary page background |
| **Dark Secondary** | `#0E1B31` | 14, 27, 49 | Section backgrounds, bar backgrounds |
| **Dark Card** | `#111E33` | 17, 30, 51 | Card/panel backgrounds |
| **Dark Border** | `#23344F` | 35, 52, 79 | Borders, dividers, subtle elements |

### Text Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **White Text** | `#FFFFFF` | 255, 255, 255 | Primary text, headings |
| **Muted Text** | `#B8C4D6` | 184, 196, 214 | Secondary text, body copy, supporting info |

### Usage Examples

- **Primary CTA buttons:** `bg-brand-blue hover:bg-brand-hover`
- **Page backgrounds:** `bg-brand-bg`
- **Section backgrounds:** `bg-brand-secondary`
- **Cards:** `bg-brand-card border border-brand-border`
- **Body text:** `text-brand-muted`
- **Headings:** `text-white`

---

## Typography

### Font Families

| Family | Weights | Usage |
|--------|---------|-------|
| **Montserrat** | 400, 600, 700, 800 | Headings, bold labels, CTAs |
| **Poppins** | 300, 400, 500, 600 | Body text, UI labels, supporting text |

### Font Sizes & Usage

| Tailwind | px | Usage |
|----------|-----|-------|
| `text-xs` | 12px | Badge labels, uppercase trackers |
| `text-sm` | 14px | Nav links, secondary text, small labels |
| `text-base` | 16px | Button text, form inputs |
| `text-lg` | 18px | Body paragraphs, secondary headings |
| `text-xl` | 20px | Card headings, section labels |
| `text-2xl` | 24px | Small section headings |
| `text-3xl` | 30px | Section headings |
| `text-4xl` | 36px | Large headings |
| `text-5xl` | 48px | Very large headings (mobile) |
| `text-6xl` | 60px | Very large headings (desktop) |
| `text-7xl` | 64px | Hero h1 (desktop) |
| `text-8xl` | 96px | Extra large hero headings |

### Typography Rules

- **Headings:** `font-heading font-bold` (Montserrat)
- **Body text:** `font-sans text-brand-muted` (Poppins, medium weight)
- **CTAs:** `font-heading font-bold uppercase tracking-wider`
- **Labels:** `text-brand-blue font-heading font-bold tracking-[0.2em] text-sm`

---

## Spacing & Layout

### Container Widths

| Type | Tailwind | px | Usage |
|------|----------|-----|-------|
| Full width | — | — | Hero sections |
| Max container | `max-w-container` | 1200px | Main content sections |
| Narrow content | `max-w-4xl` | 896px | Text-heavy sections |
| Narrow content | `max-w-3xl` | 768px | FAQs, quotes |

### Padding & Margins

| Context | Value | Notes |
|---------|-------|-------|
| Container horizontal padding | `px-6` | 24px on all screen sizes |
| Section vertical padding | `py-24` | 96px (standard) |
| Card padding | `p-8` to `p-10` | 32px to 40px |
| Gap between grid items | `gap-6` to `gap-12` | 24px to 48px |

### Breakpoints

- Mobile: default (< 768px)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

---

## Components

### Buttons

**Primary CTA Button**
```html
<a href="#" class="bg-brand-blue hover:bg-brand-hover text-white px-8 py-4 rounded font-heading font-bold uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(22,154,220,0.3)] hover:shadow-[0_0_20px_rgba(26,175,232,0.5)]">
  Button Text
</a>
```

**Secondary Button**
```html
<a href="#" class="bg-transparent border-2 border-brand-blue text-white hover:bg-brand-blue/10 px-8 py-4 rounded font-heading font-bold uppercase tracking-wider transition-colors">
  Button Text
</a>
```

### Cards

**Standard Card**
```html
<div class="bg-brand-card border border-brand-border p-8 rounded-xl hover:border-brand-blue transition-colors">
  Content
</div>
```

### Section Labels

- Uppercase, bold, blue text
- Small font size (`text-sm`)
- Wide letter spacing (`tracking-[0.2em]`)
- Example: `<p class="text-brand-blue font-heading font-bold tracking-[0.2em] text-sm">SECTION LABEL</p>`

---

## Effects & Animation

### Shadows

| Context | Classes |
|---------|---------|
| Default card | `shadow-sm` |
| Hover card | `shadow-md` |
| CTA button | `shadow-[0_0_15px_rgba(22,154,220,0.3)]` |
| CTA hover | `shadow-[0_0_20px_rgba(26,175,232,0.5)]` |

### Transitions

- Hover state transition: `transition-colors`
- Scale transition: `transition-all`
- Duration: `duration-300` (default)

### Animations

- Fade-in-up: `animate-fade-in-up` (hero section)
- Reveal on scroll: `.reveal` class with observer

### Border Radius

- Small: `rounded-lg` (8px)
- Medium: `rounded-xl` (12px)
- Large: `rounded-2xl` (16px)

---

## Key Design Patterns

### Hero Section Structure

1. Background image with dark overlay (`bg-brand-bg/85`)
2. Centered text content with max-width
3. Section label (blue, uppercase, small)
4. Large heading (h1, uppercase)
5. Supporting paragraph (muted text)
6. CTA buttons (primary + secondary)

### Feature Cards

- Dark background (`bg-brand-card`)
- Border with hover effect (`hover:border-brand-blue`)
- Icon or image
- Heading and description
- Optional CTA link

### Gradient Overlays

- Used on image cards: `card-gradient` class
- Dark overlay gradient (top to bottom)
- Creates text readability over images

---

## Brand Voice

- **Confident & Professional:** Convey expertise in outdoor event production
- **Service-Oriented:** Focus on solving customer problems (coordination, reliability)
- **Technical:** Mention specific equipment and capabilities
- **Approachable:** Avoid overly corporate language

### Example Headlines

- "Bring The Venue To Your Location"
- "One Provider. One Coordinated Setup."
- "Everything Your Event Needs"

---

## Contact Information

- **Phone:** 480-567-4215
- **Email:** info@avvalley.com
- **Service Area:** Phoenix, Mesa, San Tan Valley, and surrounding Arizona communities

---

## Files to Reference

- **Tailwind Config:** `tailwind.config.mjs` (color tokens)
- **Base Layout:** `src/layouts/BaseLayout.astro` (fonts, scripts)
- **Homepage:** `src/pages/index.astro` (examples)
