# HamApps art

The HamApps logo and the box cat character, kept on their own branch so the art is easy to find and reuse. Nothing here is deployed.

## What's here

| Folder | Contents |
| --- | --- |
| `logos/` | The HamApps logo (color, white, on blue), app icons and favicons |
| `positions/` | 12 still positions of the box cat, as SVG and 1024×1024 PNG |
| `backgrounds/` | 8 positions made to fall, float or drift behind a page, as SVG and PNG |
| `animations/` | 17 looping animations as self-contained animated SVGs |
| `interactive/boxcat.html` | The full box cat page: the cat follows your pointer, jumps when tapped, and has the falling/floating/drifting demo |

Open any animated SVG directly in a browser to watch it loop. The animations use CSS, so they play when the file is opened on its own or embedded with `<object>` or inline `<svg>`; an `<img>` tag also plays them in current browsers but cannot load the Fredoka font, so text in a few of them (z's, ?, !) falls back to a system font.

Colors: navy `#0f366f`, cream `#f8f4ee`, gold `#e3c06f`, blush `#f29bb0`.

## Animations

- `backflip`
- `coding`
- `coffee-break`
- `curious`
- `dance`
- `hello`
- `hop`
- `idle-hero`
- `in-love`
- `nap`
- `peek`
- `rainy-day`
- `roll`
- `startled`
- `stretch`
- `thinking`
- `zoom`

## Positions

- `balancing`
- `belly-up`
- `facing-left`
- `holding-a-sign`
- `hug`
- `in-a-box`
- `loaf`
- `lying-on-its-side`
- `on-a-book-stack`
- `stacked`
- `standing-tall`
- `with-a-kitten`

## Backgrounds

- `balloon`
- `bubble`
- `cloud-nap`
- `falling`
- `paper-plane`
- `parachute`
- `rocket-boost`
- `umbrella`

The SVGs were exported from `interactive/boxcat.html`, which is the source of truth. To change the art, edit that page and export again.
