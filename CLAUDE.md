# AvValley Website

## Project Overview

AvValley is a professional outdoor stage and AV rental company based in Phoenix, Arizona. This is a static Astro + Tailwind CSS marketing website designed to showcase rental packages, services, and generate quote requests.

**Domain:** `avvalley.com`
**Type:** Static marketing site (Astro + Tailwind CSS)
**Service Areas:** Phoenix, Mesa, San Tan Valley, Arizona

---

## Project Structure

```
AvValley/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        # Main layout wrapper
│   ├── pages/
│   │   └── index.astro             # Homepage
│   └── components/                 # (To be created)
├── docs/
│   └── brand.md                    # Brand style guide
├── astro.config.mjs                # Astro configuration
├── tailwind.config.mjs             # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

---

## Key Conventions

### Styling

- **Colors:** Use only AvValley brand tokens (`brand-bg`, `brand-blue`, `brand-muted`, etc.)
- **Never use default Tailwind colors** (no `slate-*`, `gray-*`, `blue-*`, etc.)
- **Fonts:** Montserrat (headings), Poppins (body)
- **Tailwind only** — no custom CSS unless absolutely necessary

### Layout & Spacing

- Container max-width: `max-w-container` (1200px)
- Horizontal padding: `px-6` (24px)
- Section padding: `py-24` (96px standard)
- Card padding: `p-8` or `p-10`

### Components

- Create reusable components in `src/components/`
- Put data/logic in `src/lib/` if needed
- All pages must use `BaseLayout` wrapper

### Brand Voice

- **Professional, confident, service-oriented**
- Focus on **coordination, reliability, technical expertise**
- Avoid hype language and overpromising
- Reference specific equipment and capabilities

### Images

- **Image Path Format:** `https://avvalley.com/media/image-name.jpg`
- Replace placeholder Unsplash images with actual branded images using this path
- Example: `https://avvalley.com/media/Stage-Empty-Chairs.jpg`

---

## Pages to Build

### Existing

- ✅ **Homepage** (`/`) — Hero, features bar, coming soon sections

### To Create

- [ ] **Stage Rentals** (`/stage-rentals`) — 22×20 mobile stage details
- [ ] **AV Packages** (`/av-packages`) — Service package showcase
- [ ] **Use Cases** (multiple pages) — Churches, festivals, conferences, etc.
- [ ] **FAQ** (`/faq`) — Frequently asked questions
- [ ] **Quote Request** (`/quote`) — Contact/quote form
- [ ] **Privacy Policy** (`/privacy`)
- [ ] **Terms & Conditions** (`/terms`)

---

## Color Reference

All colors are defined in `tailwind.config.mjs`:

```javascript
brand: {
  bg: '#0A1322',         // Primary background
  secondary: '#0E1B31',  // Section backgrounds
  card: '#111E33',       // Card backgrounds
  border: '#23344F',     // Borders
  blue: '#169ADC',       // Primary accent (CTAs)
  hover: '#1AAFE8',      // Hover state
  text: '#FFFFFF',       // Primary text
  muted: '#B8C4D6'       // Secondary text
}
```

---

## Important Files

- **Brand Guide:** `docs/brand.md` — Color palette, typography, components, patterns
- **Tailwind Config:** `tailwind.config.mjs` — All color tokens and custom settings
- **Base Layout:** `src/layouts/BaseLayout.astro` — Fonts, meta tags, head setup

---

## Setup & Development

### Install dependencies
```bash
npm install
```

### Start dev server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## GoHighLevel Integration

**For complete API integration guide, see:** `../Docs/leadconnector-api.md` (root Websites/Docs folder)

This guide covers:
- Authentication and required headers
- Field types and payload formats
- Common issues and solutions
- Best practices for future scripts

### JS Scripts (AvValley-specific)

Scripts in `js/` folder for AvValley CRM integration:

- **`create-avvalley-fields.js`** — Creates 38 service-specific custom fields
- **`cleanup-test-fields.js`** — Removes test fields from EverReach

### Environment Setup

Create `.env` (copy from `.env.example`):
```
PIT_TOKEN=pit-xxxxxxxxx
LOCATION_ID=location-id
GHL_API_BASE=https://services.leadconnectorhq.com
```

---

## Contact & Brand Info

- **Phone:** 480-567-4215
- **Email:** info@avvalley.com
- **Service Areas:** Phoenix, Mesa, San Tan Valley, and surrounding Arizona communities

---

## Notes

- The homepage HTML template was provided as a design reference
- Mobile-first responsive design (mobile nav, sticky footer CTA)
- Animated reveals on scroll using Intersection Observer
- No external dependencies beyond Astro, Tailwind, and Phosphor Icons
- All images are from Unsplash (placeholder images for development)
