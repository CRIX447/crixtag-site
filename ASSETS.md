# Crix Tag site — asset checklist

Drop each file in at the exact path below and it appears on the site.
You don't have to add them all at once. Anything missing shows a tidy
"coming soon" card instead of a broken image, or stays hidden.

**Tip:** open any page with `?assets` on the end (e.g. `index.html?assets`)
and every empty slot shows the file name it's waiting for, plus the size to make it.

Uploading on GitHub: open the folder (e.g. `assets/screenshots`), click
**Add file → Upload files**, and make sure the file name matches exactly
(lowercase, dashes, `.png`).

## Done already

| File | What it is |
|---|---|
| `assets/fonts/font.otf` | Site font (Bubble Sans) |
| `assets/favicon.png` | Browser tab icon, gold "CT" tile |
| `assets/apple-touch-icon.png` | Icon when someone saves the site to their phone home screen |
| `assets/og-image.png` | Preview picture when the link is posted in Discord, X, etc. |

## Screenshots: home page gallery

Six slots under the map carousel. The whole gallery stays hidden until at
least one exists. Size: **1920 × 1080** (16:9), PNG or JPG.

- [ ] `assets/screenshots/screenshot-1.png`
- [ ] `assets/screenshots/screenshot-2.png`
- [ ] `assets/screenshots/screenshot-3.png`
- [ ] `assets/screenshots/screenshot-4.png`
- [ ] `assets/screenshots/screenshot-5.png`
- [ ] `assets/screenshots/screenshot-6.png`

To change the caption under a screenshot ("In game"), edit its
`<figcaption>` in `index.html`. Want more than six? Copy one of the
`<figure class="shot-item">` lines and bump the number.

## Map screenshots: home page carousel

Size: **1600 × 1000** (16:10), PNG or JPG.

- [ ] `assets/map-spawn.png`
- [ ] `assets/map-forest.png`
- [ ] `assets/map-shop.png`
- [ ] `assets/map-movie-theatre.png`
- [ ] `assets/map-fanart-room.png`
- [ ] `assets/map-recording-studio.png` (also used in the Creators section)

## Hero (top of the home page)

- [ ] `assets/logo.png`: the Crix Tag logo, **transparent PNG, about 1200 px wide**.
      Once it's there it replaces the "CRIX TAG" text.
- [ ] `assets/background.png`: a wide in-game shot behind the logo,
      **2400 × 1350** or bigger. It's dimmed automatically (change `opacity` under `.hero-art` in `style.css`).

## Cosmetics: item renders

All **1024 × 1024 transparent PNG**, item centred with some empty space around it.

VIP (cosmetics page):
- [ ] `assets/cosmetics/golden-tophat.png`
- [ ] `assets/cosmetics/golden-nametag.png`
- [ ] `assets/cosmetics/vip-badge.png`
- [ ] `assets/cosmetics/vip-shirt.png`
- [ ] `assets/cosmetics/fling-hammer.png`
- [ ] `assets/cosmetics/money-gun.png`

Store (listed in `store.json`):
- [ ] `assets/cosmetics/tophat.png`
- [ ] `assets/cosmetics/banana-hat.png`
- [ ] `assets/cosmetics/coconut-hat.png`
- [ ] `assets/cosmetics/headphones.png`
- [ ] `assets/cosmetics/crix-shirt.png`
- [ ] `assets/cosmetics/sunglasses.png`

## Creator badges (cosmetics page)

**512 × 512 transparent PNG.** These stay hidden until added.

- [ ] `assets/cosmetics/badge-creator.png`
- [ ] `assets/cosmetics/badge-verified.png`
- [ ] `assets/cosmetics/badge-paw-painter.png`

## Note on the link preview

Some sites (Discord, X) only show `og-image.png` if the address is the full
URL. Once you know the site's web address, change this line in `index.html`:

```html
<meta property="og:image" content="assets/og-image.png">
```

to the full address, e.g. `https://yourname.github.io/crixtag-site/assets/og-image.png`.
