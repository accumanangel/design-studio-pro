## Scope

Build a frontend-only IXIA London ecommerce experience extending the studio's interior-design site. Mock data only — no backend, no real payments. The star screen is the configurable bedside-table product page in the selected "Atelier tray (inset card)" direction.

## Pages (TanStack Start routes under `src/routes/`)

- `/` — Shop landing (editorial hero, shop-by-room trio, featured bedside tables, made-to-order strip, interior-design cross-sell)
- `/shop/bedside-tables` — Category page (tabs: All / Children's / Guest Room / Master Suite, filters sidebar, product grid)
- `/shop/bedside-tables/childrens` · `/guest-room` · `/master-suite` — Collection pages (editorial hero, story, grid, lifestyle image)
- `/shop/bedside-tables/$productSlug` — **Configurator** (the flagship screen, exact composition of the chosen direction)
- `/cart` — Cart with configured line items showing selected options
- `/checkout` — Single-page checkout (contact / delivery / payment — mock form only)
- `/order-confirmation` — Thank-you screen
- `/request-a-quote` — Quote form for bespoke variations

## Configurator behaviour

- Three product families with the exact option trees from the spec:
  - Children's: Size → Wooden{Light Oak/Mid Oak/Walnut} | Painted{Dark Blue/Grey/Pale Green/Off White} → Decorative detail{Flower/Heart/None} → Knob{Small White/Small Gold/Pink/Black}
  - Guest Room: Size → Wooden or Painted{Dark Blue/French Grey/Pale Green/Off White} → Handle{Bronze/Gold/Chrome/Black}
  - Master Suite: Size → Wooden or Painted{Buttery Yellow/Moss Green/Plimsoll Blue/Terracotta} → Top{Wooden/Stone (+£)} → Handle{Bronze/Gold/Chrome/Black}
- Vertical numbered stepper on the right inset card; only the current step is expanded, completed steps collapse to a compact `01 Size · Standard (45cm) — Change` summary, downstream steps show as pending/disabled.
- Every option is a labelled swatch/thumbnail card (never a bare `<select>`), with selected / hover / disabled states, price deltas (`+£80`), and sold-out reasoning.
- Live price = base + sum of deltas; live lead-time note ("8–10 weeks"); primary CTA "Add to basket" (deep olive), secondary "Request a bespoke quote".
- Changing a parent choice clears any newly invalid child.
- Left column: hero image that crossfades on finish/top change (mock image map keyed by finish), 3 thumbnails + a "DIM" dimensions tab.
- Below-the-fold on the product page: craftsmanship strip and "Complementary pieces" trio (matches the chosen direction).
- Mobile: gallery first, stepper stacked, sticky bottom bar with live price + "Review configuration".

## Visual system (locked to the chosen direction)

- Tailwind v4 tokens in `src/styles.css` (as `@theme inline` → `:root` vars):
  `--background #f7f4ef`, `--ivory #ede7de`, `--stone #cfc4b7`, `--taupe #a69584`, `--sage #8b9484`, `--olive #555c4e` (primary CTA), `--ink #24221f`, `--charcoal #34312d`.
- Fonts loaded via `<link>` in `src/routes/__root.tsx` head (never `@import` a URL in styles.css): Cormorant Garamond (serif), Inter (sans), JetBrains Mono (step numerals/eyebrows). Registered as `--font-serif / --font-sans / --font-mono`.
- Editorial slim sticky header (Home · About · Interior Design · Shop · Journal · Contact, IXIA wordmark centred, Search/Account/Basket right), dark ink footer.
- Square-cornered imagery, hairline stone borders, restrained shadow only on the inset configurator card.

## Data + state

- `src/lib/products.ts` — mock product catalogue with the three collections, base prices, option trees (declarative), and finish→image mapping. Structured so it can later be swapped for WooCommerce data.
- Cart state via React context in `src/lib/cart-context.tsx` (localStorage-backed) — stores fully configured line items with resolved options and total.
- Configurator state local to the product route, resets on navigation.

## Images

- Replace each `data-lov-image-placeholder` from the selected direction with a generated image via `imagegen--generate_image` into `src/assets/` (hero bedroom shot, 3 product thumbs, workshop hands, dovetail detail, 3 complementary pieces, plus a per-finish product image set for the crossfade — approx 12 images total). All lifestyle imagery follows the warm-white / natural-materials brief.

## SEO / head metadata

- Real `head()` on `__root.tsx` (title "IXIA London — Furniture & Interiors", matching description, og/twitter). Each route sets its own `head()` with unique title + description. Leaf product route wires the hero image URL into `og:image` / `twitter:image`.

## Technical notes

- No auth, no Cloudflare, no server functions — pure frontend, mock data only.
- Follow TanStack Start file-based routing (flat dot-separated); create every route file before any `<Link to>` references them.
- Delete the placeholder from `src/routes/index.tsx`.
- Use Framer Motion (already fits the "subtle motion only" brief) for the image crossfade and step collapse; nothing bouncy.

## Out of scope

- Real payment gateway, WordPress/WooCommerce integration, user accounts, order persistence, blog/journal content beyond a placeholder link, search functionality.
