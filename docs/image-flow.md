# AV Valley — Image Flow

How images get from upload to the visitor's screen, and to social link previews.

**AV Valley's images are hosted in AV Valley's own Cloudflare account, not in EMD's.** Kingdom Care and 41 Roofing use buckets in the EMD Cloudflare account. AV Valley does not. Do not create an AV Valley bucket in the EMD account. The existing setup works and is left as is.

| Path | What it covers | Storage | Served from |
|---|---|---|---|
| 1. Site media | Page photos, product and rental images, projection mapping and event photos | AV Valley's own Cloudflare account | `https://media.avvalley.com/media/...` |
| 2. Logos and favicon | Header and footer logos, favicon | The repo, in `public/images/` | `https://www.avvalley.com/images/...` through Vercel |
| 3. Social link previews | The image shown when a page link is pasted on Facebook, LinkedIn, iMessage, etc. | The repo, `public/og-image.jpg` | `https://www.avvalley.com/og-image.jpg` through Vercel |

---

## 1. Site media (AV Valley's Cloudflare account)

### Where it lives

- Public domain: `media.avvalley.com`, with all files under the `/media/` path.
- `avvalley.com` uses Cloudflare nameservers (`keaton.ns.cloudflare.com`, `liz.ns.cloudflare.com`). That is AV Valley's own Cloudflare account, separate from the EMD account that holds `kingdom-care-media` and `41-roofing`.
- Responses come back from Cloudflare with `cache-control: max-age=31536000` (one year), so replaced files can look unchanged for a long time. See "Replacing an image" below.

### Not in the EMD account

The EMD R2 account (`rclone` remote `r2:`) only contains `kingdom-care-media` and `41-roofing`. The AV Valley media is not there, so the EMD `rclone` setup cannot upload or list it. Uploads happen in AV Valley's own Cloudflare account, through its dashboard or its own credentials.

### Not yet confirmed

These were not checked when this doc was written. Confirm them before relying on them:

- The storage product behind `media.avvalley.com` (R2 bucket or something else).
- The bucket or storage name.
- Who owns the Cloudflare account login, and how uploads are done today.

Add the answers here when known.

### Where the code reads them

The site uses full URLs. There is no shared constant, so a change of host means a find and replace of `media.avvalley.com` in `src`. About 23 distinct images, 58 references:

- `src/pages/index.astro`
- `src/pages/mobile-stage-rental.astro`
- `src/pages/outdoor-movie-rentals.astro`
- `src/pages/projection-mapping.astro`
- `src/pages/silent-disco-rentals.astro`
- `src/pages/rent-projector.astro`
- `src/pages/purchase-projector.astro`
- `src/lib/schemas.ts`

The project convention in `CLAUDE.md` is `https://avvalley.com/media/image-name.jpg`. In practice the code uses `https://media.avvalley.com/media/...`. Use the `media.` form for new images.

### Request flow

1. Visitor opens a page served by Vercel.
2. The browser requests each media image from `media.avvalley.com`.
3. Cloudflare serves the file from its edge cache, or from the origin on a miss.

---

## 2. Logos and favicon (repo)

Three files in `public/images/`, served with the site:

- `AVValley-Logo.png` — white logo for dark backgrounds
- `Av-Valley-Logo-Dark.png` — dark logo
- `Av-Valley-Logo-icon.jpg` — favicon, linked in `src/layouts/BaseLayout.astro`

Changing one means committing it and redeploying.

---

## 3. Social link previews (OG image)

### File

- `public/og-image.jpg`, 1200×630, about 41 KB.
- The white logo on the brand navy (`#0A1322`) with a blue accent bar and "Outdoor Stage & AV Rentals". There is no photo, because the repo has no stage photos to build from.

### Metadata

`src/layouts/BaseLayout.astro` outputs `og:*` and `twitter:*` tags (`summary_large_image`) with absolute URLs, using the site URL from `astro.config.mjs` (`https://www.avvalley.com`).

Each page can override the default through two optional props on `BaseLayout`:

```astro
<BaseLayout
  title="Mobile Stage Rental | AvValley"
  ogImage="https://media.avvalley.com/media/your-og-image.jpg"
  ogImageAlt="Describe the image"
>
```

`ogImage` accepts a path (`/og-image.jpg`) or a full URL. No page overrides it yet, so every page shows the same preview.

### What happens when a link is pasted

1. The platform fetches the page HTML.
2. It reads `og:image` and `twitter:image` from the tags.
3. It downloads the image from `www.avvalley.com`.
4. It caches the result.

### Replacing the image

- Platforms cache previews. After changing the image, use a **new file name** or clear the cache with Facebook's Sharing Debugger and LinkedIn's Post Inspector.
- Keep 1200×630, under about 300 KB (some apps reject larger files), JPG or PNG.

### Possible improvement

A photo-based OG image, such as a stage at an event, would likely look better than the logo graphic. Upload it to the media domain, then set it as the default in `BaseLayout.astro` or per page with the `ogImage` prop.

---

## Checklist: adding a new media image

1. Prepare the file (WebP for photos, JPG or PNG for 1200×630 OG images).
2. Upload it to AV Valley's Cloudflare account, in the `media` path.
3. Check `curl -I https://media.avvalley.com/media/<file>` returns 200 and the right `content-type`.
4. Reference it with the full `https://media.avvalley.com/media/<file>` URL.
5. Commit and push the code change.

## Replacing an image with the same file name

The media domain caches for one year. Either upload under a new file name and update the references, or purge the file in the Cloudflare dashboard (Caching, Purge Cache) for that account.

## Related

- Same flow for Kingdom Care: `Kingdom Care/docs/image-flow.md` (EMD R2, `kcmedia.evermdesign.com`).
- Same flow for 41 Roofing: `41Roofing/docs/image-flow.md` (EMD R2, `41media.evermdesign.com`).
- Brand tokens used for the OG image: `docs/brand.md`.
