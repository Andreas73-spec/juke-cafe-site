# JuKe Café — DESIGN.md

Huisstijl van jukecafe.nl, afgeleid uit `styles.css`. Lees dit vóór je iets aan de UI
toevoegt of verandert (mens of AI-agent): nieuwe onderdelen horen te voelen alsof ze er
altijd al waren.

---

## 1. Visuele sfeer

Laid-back beach café aan het water bij jachthaven De Uitkijk, Loosdrecht. Warm en
relaxed, met een stoere rand: een cream basis, midnight-paars als donkere tegenhanger en
roze als accent. Zware hoofdletters voor koppen, een handgeschreven script voor het
persoonlijke accent. Veel lucht, grote foto's van het water, weinig franje.

---

## 2. Kleuren

Alle kleuren staan als tokens in `:root` van `styles.css`. **Gebruik altijd het token.**

| Token | Hex | Gebruik |
| --- | --- | --- |
| `--blauw` | `#C45E8E` | **Roze hoofdaccent**: h1/h2, prijzen, accentranden, links en lijnen op licht |
| `--oranje` | `#E879B5` | **Licht roze**: golflijnen, hamburger-streepjes, vega-labels |
| `--marine` (= `--petrol`) | `#221638` | **Midnight-paars**: bodytekst, donkere banden, primaire knoppen, top-strip |
| `--beige` | `#F8F5EE` | Cream paginabasis |
| `--wit` | `#FFFFFF` | Panelen op cream (openingstijden, cateringkaarten) |
| `--line` | `rgba(42,23,41,.18)` | Dunne lijnen en stippellijnen op licht |
| `--line-wit` | `rgba(255,255,255,.2)` | Lijnen op donker |

- Tint voor tags en zachte vlakken: `rgba(196, 94, 142, 0.12)` (roze op 12%).
- Overlay achter een pop-up: `rgba(34, 22, 56, 0.62)` + `blur(3px)`.
- ⚠️ De tokennamen zijn historisch: `--blauw` is roze en `--oranje` is lichtroze. Niet
  hernoemen, niet letterlijk nemen. Er komt geen blauw of oranje op de site.

**Print-menukaart** (`menukaart-print.html`) heeft een eigen palet: sage `#C5CCA5` met
inkt `#1F2618`, plus een JuKe-variant op cream. Die tokens staan in dat bestand zelf.

---

## 3. Typografie

| Rol | Font | Stijl |
| --- | --- | --- |
| Alles (body, UI, koppen) | **Plus Jakarta Sans** 400–800 | via `--font-body` / `--font-display` |
| Persoonlijk accent | **Sacramento** (fallback Caveat) | eyebrows en handgeschreven notities |

- **h1 / h2**: 800, HOOFDLETTERS, `--blauw`, line-height 0.98, letter-spacing −0.02em.
  Sectiekop: `clamp(2rem, 4vw, 3.5rem)`.
- **Eyebrow** (`.eyebrow`): Sacramento 3.5rem (2.2rem op mobiel), roze, direct boven een h2.
- **Body**: 16px, line-height 1.55, `--marine`. Intro/lede: 1.1rem.
- **UI-labels** (knoppen, top-strip, navigatie): 600, HOOFDLETTERS, letter-spacing
  0.18–0.2em, ongeveer 0.78–0.8rem.
- Script nooit voor lange tekst: alleen korte accenten.
- Laad Sacramento op elke pagina waar een eyebrow of notitie staat.
- Trona staat als `@font-face` in de CSS, maar wordt niet gebruikt. Niet inzetten.

---

## 4. Componenten

**Knop `.btn`** — pil (`border-radius: 10rem`), HOOFDLETTERS 0.8rem 600 / 0.2em.
Kenmerk: de **dubbele ring**, een rand van 1.5px plus een outline van 1.5px op 4px
afstand. Bij hover gaat de outline-offset naar 6px.
- `.btn-primary`: midnight vlak met roze ring
- `.btn-ghost`: wit op donker
- `.btn-ghost.is-dark`: roze lijn op licht

**Knoppenrij `.cta-row`** — flex met gap 0.75rem. Onder 520px staan de knoppen
gestapeld en worden ze full-width. Gecentreerd met `justify-content: center`.

**Ronde icoonknop** (`.nav-toggle`) — midnight cirkel (48px) met een roze outline-ring op
4px afstand; iconen in `--oranje`. Gebruik dit patroon ook voor sluitknoppen.

**Panelen: altijd rechte hoeken**
- Licht paneel (`.hours`): wit vlak met een roze bovenrand van 4px.
- Kaart (`.catering-card`): wit met een rand van 1px `--line`. Bij hover
  `translateY(-3px)` plus `--shadow`.
- Donkere band (`.dark-band`, `.catering-cta`): midnight vlak met witte tekst; CTA's
  gecentreerd.

**Callout** (`.menu-takeaway`) — roze stippelrand van 1.5px, radius 8px. Voor een extra
boodschap binnen een blok. Dit is de enige afgeronde "doos" in de huisstijl.

**Tags** — pil met roze tint en marine tekst in 600 (`.catering-tags li`). Het vega-label
is een pil met een rand in `--oranje`.

**Top-strip** — midnight balk, witte HOOFDLETTERS 0.78rem 600 / 0.18em.

**Golflijn** — SVG-golf, stroke `#E879B5`, 3px, afgeronde uiteinden. Staat onder de kop
in de hero en in de pop-up.

**Pop-up** (`.seizoenspopup`, native `<dialog>`):
- cream paneel met rechte hoeken, roze bovenrand van 4px en `--shadow`
- van boven naar beneden: logo → h2 → golflijn → tekst → callout → `.cta-row`
- sluitknop volgens het ronde icoonknop-patroon
- verschijnt één keer per bezoek; wegklikken kan met ×, Esc of een klik op de achtergrond

---

## 5. Layout & ruimte

- Maximale breedte `--max: 1280px`, zijpadding 2.5rem op desktop.
- Secties ademen: 5–7rem verticale padding.
- Hero: split 1fr / 1fr, met de foto tot aan de rand en een golvende rand (clip-path).
- Menukaart: maximaal 980px breed.

---

## 6. Diepte

- Plat ontwerp: gebruik lijnen en kleurvlakken, geen stapels schaduw.
- Eén schaduwtoken: `--shadow: 0 24px 60px -28px rgba(42,23,41,.45)`. Alleen voor
  zwevende en hover-elementen.
- Geen gradients.

---

## 7. Guardrails

**Wel**
- Tokens gebruiken. Losse hex alleen voor de SVG-stroke `#E879B5`.
- Panelen recht, knoppen en tags als pil, icoonknoppen als cirkel met de dubbele ring.
- Koppen in zware roze hoofdletters, het accent in script.
- Bestaande classes hergebruiken (`.btn`, `.cta-row`, `.eyebrow`, het paneel- en
  callout-patroon).

**Niet**
- Geen afgeronde kaarten of panelen, behalve de callout van 8px.
- Geen nieuwe fonts, kleuren, schaduwen of breakpoints.
- Geen script voor zinnen langer dan een paar woorden.
- Geen letterlijk blauw of oranje (zie de waarschuwing bij Kleuren).

---

## 8. Responsive

- Breakpoints: **980px** (hero stapelt, hamburger verschijnt) en **520px** (telefoon:
  kleinere type, knoppen gestapeld). Voeg geen andere breakpoints toe.
- Telefoon: geen horizontale overloop; tikdoelen minimaal 44px.
- Pop-up: `min(560px, 100vw − 2rem)` breed en scrollt binnenin als hij te hoog is.
- Animaties alleen onder `prefers-reduced-motion: no-preference`.

---

## 9. Voor AI-agents

1. Begin bij de tokens en componenten hierboven; bouw geen parallelle varianten.
2. Content komt uit `_data/*.json` via Nunjucks. Een nieuwe tekst krijgt ook een veld in
   `admin/config.yml`, zodat de eigenaar hem zelf kan aanpassen.
3. Pas je `styles.css` aan? Verhoog dan de `?v=` in `index.njk`, `menu.njk` en
   `catering.njk`. Netlify laat browsers de CSS een dag cachen.
4. Test op 375px en op desktop, en meet of er geen overloop is.
5. De A4-print (`menukaart-print.html`) heeft een eigen layout: blijf binnen 297mm hoogte.
