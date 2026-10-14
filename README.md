# Premium Wedding Invitation Template

Tier: **Premium** · Single-page digital wedding invitation.

Royal **maroon & gold heritage** design — deep maroon silks, antique gold
foil and cream paper, with a ceremonial **opening overlay**: guests tap
*Open the Invitation*, petals burst and the invitation rises. Ornaments (mandala, cusped arch, toran garland,
paisley rules) are **drawn generatively in JavaScript** — no image
assets beyond the couple photos — and a looping background nasheed
("NAFSIJI", `assets/music/nafsiji.mp3`) plays behind a floating note button.

## Features

- **Opening intro** — a full-screen overlay with the blessing and the
  couple's names; the *Open the Invitation* tap unlocks the page and
  starts the music (browsers require a tap before audio). Skipped
  instantly for guests who ask for reduced motion, and the page
  degrades gracefully without JavaScript.
- **Foil-stamped names** with a slow mandala behind the hero, toran
  garlands framing the page, drifting rose petals that follow the
  cursor like wind, and a paper-grain overlay
- **Invitation panel** — formal request wording with drop cap, paisley
  corner flourishes and both families named
- **The Couple** — groom and bride portraits with script nicknames,
  parents and short bios; missing photos fall back to monogram art
- **Moments** — the couple photo shown uncropped (never faces-cut)
- **Order of the Evening** — a two-sided timeline whose gold spine
  draws itself as the guest scrolls, nodes lighting up as they pass
- **Live countdown** — days / hours / minutes / seconds to the
  ceremony, flipping to "just married!" when the day arrives
- **Venue** — cusped (multifoil) arch drawn in code, Google Maps
  directions link, and a locally generated **Add-to-Calendar (.ics)**
  file
- **RSVP** — live letterpress-style preview of the reply, attendance
  choice, seats stepper, song request and blessings field, sealed with
  an animated wax seal; a returning guest's reply is remembered and can
  be updated
- **Background music** — a looping nasheed ("NAFSIJI",
  `assets/music/nafsiji.mp3`), toggled from the floating note button
- Toast notifications, `prefers-reduced-motion` honoured throughout,
  mobile-first with a full desktop layout

## Files

| File         | Purpose                                          |
|--------------|--------------------------------------------------|
| `index.html` | Page structure and display copy.                  |
| `styles.css` | All styling; design tokens in `:root` at the top. |
| `config.js`  | Values the script needs: wedding date, calendar, photos, RSVP. |
| `script.js`  | Ornaments, petals, background music, intro, reveals, countdown, RSVP. |
| `assets/music/nafsiji.mp3` | Background nasheed — swap for the client's song. |
| `assets/photos/groom.svg` | Groom placeholder artwork (The Couple). |
| `assets/photos/bride.svg` | Bride placeholder artwork (The Couple). |
| `assets/photos/couple.svg` | Couple placeholder artwork (Moments). |
| `assets/og-cover.png` | 1200×750 social share preview (WhatsApp/Facebook). |
| `assets/favicon.svg` | Browser-tab favicon (maroon A·M monogram). |
| `tests/`     | Guard tests (`node --test tests/`).               |

## Customising for a client

This template was generated for one couple (**Ayan & Mim** — alias
names standing in for the real couple: *Abrar Ibne Karim* and
*Zainab Haque*; 14 February 2027, Army Golf Club, Dhaka), so unlike
the Classic / Signature / Luxury templates most **display copy lives
directly in `index.html`** — each section is marked with a
`<!-- ===== --> section` comment (invitation panel, couple bios,
evening timeline, venue blurb, footer verse). Edit the text in place.
When reusing for another couple, also swap the "A·M" monogram (nav,
gallery fallback, RSVP seal, `assets/favicon.svg`) and the
"#AyanWedsMim" hashtag. The footer credit ("Crafted by Spondora
Invites") and its Instagram/Facebook links are hand-set at the end of
`index.html` — keep them as-is for Spondora deployments.

Everything the **script** needs is in **`config.js`**:

- `weddingDateTime` — ISO format with timezone, e.g.
  `"2027-02-14T19:00:00+06:00"`. Drives both the countdown and the
  Add-to-Calendar file.
- `calendar` — the .ics summary, location, description, duration and
  filename. Commas are escaped automatically.
- `photos` — paths for the three images. The shipped files are
  maroon-and-gold placeholder artwork. For a real client, drop photos
  into `assets/photos/` (portrait ~900×1200 for groom/bride, landscape
  ~1200×750 for couple) and point these paths at them — `groom` and
  `bride` are cropped to a 3:4 frame in The Couple section, `couple`
  is shown uncropped in Moments.
- `assets/og-cover.png` — the preview shown when the link is shared
  (SVG images don't render as share previews, so a PNG is shipped).
  Regenerate it per client from the couple photo at 1200×750.
- `rsvp.storageKey` / `rsvp.maxParty` — the localStorage key and the
  seats stepper cap.
- `music.src` — the looping background nasheed
  (`assets/music/nafsiji.mp3`); `music.volume` sets its level (0–1).
  Replace the file with the client's song when known.

Design tokens (maroon, gold, cream, fonts) are CSS variables in the
`:root` block at the top of `styles.css`; recolour the whole page by
changing `--maroon`, `--gold` and `--cream`.

### RSVP delivery

Replies are remembered **in the guest's own browser** only — the couple
is not notified. If delivery is needed, extend the `submit` handler in
`script.js` (search for `am_rsvp_v1` → `rsvp.storageKey`) the way the
Signature/Luxury templates do: open WhatsApp with the answers pre-typed
and/or POST to a Formspree-style endpoint.

## Running locally

```bash
cd template3-premium
python3 -m http.server 8080
# open http://localhost:8080
```

(Opening `index.html` directly via `file://` also works — photos, the
countdown and the melody all run locally; only the Google Fonts and the
Maps link need internet, and clipboard/calendar downloads prefer a real
http(s) origin when deployed.)

## Deploying

Any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages —
drag the folder in. One URL per couple = the shareable link.

## Fonts

Google Fonts loaded in `index.html`: Cinzel (display names and
headings), Cormorant Garamond (body serif), Great Vibes (script
accents) and Jost (labels, buttons, small caps).

## Tests

```bash
node --test
```

Guards the invariants that broke once already: no temporary CDN photo
links in the page, every referenced local asset exists, config.js loads
before script.js, and the wedding datetime is a valid future date.
