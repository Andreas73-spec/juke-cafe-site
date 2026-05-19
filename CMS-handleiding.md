# JuKe Café — CMS-handleiding

Deze site draait nu op **Eleventy** (een statische site-generator) met **Decap CMS** als
beheerpaneel. De eigenaar kan via `jukecafe.nl/admin/` zelf de menukaart, foto's,
heropening-balk en contactgegevens aanpassen — zonder code aan te raken.

---

## 1. Hoe werkt het?

```
JSON-bestanden in /_data/   ←→   Decap CMS (web-formulier op /admin/)
            ↓
   Eleventy bouwt HTML
            ↓
  Netlify zet 'm live op jukecafe.nl
```

Elke wijziging in het CMS:
1. wordt door Decap als nieuwe commit naar GitHub gepushed,
2. Netlify ziet de commit en start automatisch een nieuwe build (~20 sec),
3. de site is live.

**Geen code-kennis nodig voor de eigenaar.** Alleen inloggen op `/admin/` en bewerken.

---

## 2. Eénmalige setup (door de webbouwer)

### a. Repo naar GitHub

```bash
cd "/Users/credifinandreas/Juke - Uitkijk"
git add .
git commit -m "Initial commit · Eleventy + Decap CMS"

# Maak op github.com een nieuwe (private) repo aan, bijv. 'juke-cafe-site'
git remote add origin git@github.com:<jouw-username>/juke-cafe-site.git
git push -u origin main
```

### b. Netlify-site koppelen

1. Ga naar [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**.
2. Kies de zojuist aangemaakte GitHub-repo.
3. Build-settings worden automatisch overgenomen uit `netlify.toml`:
   - Build command: `npx @11ty/eleventy`
   - Publish directory: `_site`
4. Klik **Deploy**.
5. Eenmalig: in Netlify → Site settings → **Domain management** → koppel `jukecafe.nl`.

### c. Netlify Identity + Git Gateway aanzetten

Dit regelt de login voor de eigenaar zónder dat zij een GitHub-account nodig heeft.

1. In Netlify → **Site configuration** → **Identity** → klik **Enable Identity**.
2. Onder **Registration** kies **Invite only** (anders kan iedereen zich aanmelden).
3. Onder **Services** → klik **Enable Git Gateway**.
4. Klik **Invite users** → vul het mailadres van de eigenaar in.

De eigenaar krijgt nu een e-mail met een uitnodigingslink → ze kiest een wachtwoord →
en kan vanaf nu naar `jukecafe.nl/admin/` om in te loggen.

> Wil je zelf ook toegang? Voeg jezelf op dezelfde manier toe als gebruiker.

---

## 3. Wat kan de eigenaar bewerken?

Na inloggen op `jukecafe.nl/admin/` ziet ze drie blokken:

| Blok | Wat erin staat |
| --- | --- |
| **Site-instellingen** | Heropening-balk, hero (foto + tekst), dagdelen, openingstijden, contact, parkeren, footer |
| **Menukaart** | Alle gerechten, prijzen, secties, wijnen, picknick, voetnoten |
| **Catering-pagina** | De drie cateringkaarten (café / boot / foodtruck) + contactblok |

Per veld staat in het Nederlands wat het is. Foto's kun je rechtstreeks slepen in een upload-veld
— ze komen automatisch in de juiste map terecht.

**Opslaan = publiceren.** Klik rechtsboven op **Publish** en binnen ~20 seconden staat het live
op de site.

---

## 4. Lokaal werken (alleen voor ontwikkelaar)

```bash
# Eenmalig
npm install

# Live preview op http://localhost:8080
npm start

# Productie-build genereren in _site/
npm run build
```

De broncode-structuur:

```
/_data/             ← JSON-data (door Decap bewerkt)
   site.json
   menu.json
   catering.json
/_includes/         ← Herbruikbare Nunjucks-blokken (header, footer, …)
/admin/             ← Decap CMS interface
   index.html
   config.yml      ← CMS-velden definitie
/images/            ← Foto's (incl. upload via CMS)
index.njk           ← Homepage-template
menu.njk            ← Menukaart-template
catering.njk        ← Catering-template
styles.css
.eleventy.js        ← Eleventy build-config
netlify.toml        ← Netlify build-config
```

---

## 5. De print-menukaart op tafel

Op `/admin/` zie je rechtsonder twee knoppen:

- **Print-menukaart openen** → opent de A4 menukaart in een nieuw tabblad
- **Website bekijken** → opent de live site

De print-versie is **dubbelzijdig op A4**, in twee kleurvarianten (4 pagina's totaal):

| Pagina | Variant |
| --- | --- |
| 1 | Sage groen — voorkant |
| 2 | Sage groen — achterkant |
| 3 | JuKe pink/midnight — voorkant |
| 4 | JuKe pink/midnight — achterkant |

Bij Cmd+P kun je kiezen welke variant je print (bv. alleen pagina 1–2 voor sage).

### Wat past per sectie op de print

De website-menukaart heeft geen limiet (scrollt door), maar de print is een vaste A4
met beperkte plek per vak. Richtlijn voor wat er **netjes** past per sectie:

| Sectie | Aantal items netjes |
| --- | --- |
| Voor bij de koffie | ~5 |
| Borrelplanken | ~3 |
| Verse broodjes | ~7 |
| Warme happen | ~7 |
| Koude happen | ~7 |
| Wijnen | ~10 wijnen totaal |
| Picknick | ~2 |

Tot een paar items extra past het automatisch (de tekst krimpt iets in). Daarna wordt
het echt te druk en kan iets over de rand lopen.

### Werkwijze

1. Pas iets aan in **CMS → Menukaart** → Publish.
2. Wacht ~20 sec tot de site herbouwd is.
3. Klik op **Print-menukaart openen** → check of het er nog goed uitziet.
4. Te druk geworden? Verwijder iets ouds, of bel Andreas.

## 6. Veelgestelde vragen

**Wat gebeurt er als ik een tekstvakje leegmaak?**
Dan verdwijnt dat stukje van de site. Wil je bijv. de heropening-balk weghalen,
zet de schakelaar 'Balk tonen?' op uit — handiger dan tekst legen.

**Ik heb iets stoms gedaan, kan ik terug?**
Ja. Alle wijzigingen staan in GitHub. Open de repo → **Commits** → klik de versie
van vóór de fout → **Revert**. De site bouwt opnieuw.

**Hoe voeg ik een nieuw gerecht toe?**
Menukaart → kies de juiste sectie → klik **Add Item** onderaan de lijst →
vul naam, beschrijving en prijs in → Publish.

**Hoe vervang ik de hero-foto?**
Site-instellingen → Hero (homepage) → klik op de huidige foto → **Choose new image**
→ sleep nieuwe foto erin → Publish. Houd de afmetingen vergelijkbaar (~1600 × 1200 px).

**De site is niet ge-update na een wijziging?**
Check in Netlify → **Deploys** of de laatste build is geslaagd. Soms moet je een
hard refresh doen (Cmd+Shift+R) om je browser-cache te wissen.

---

## 7. Wat als het hele CMS-verhaal niet meer hoeft?

De `_data/*.json`-bestanden + `.njk`-templates blijven gewoon werken zonder CMS. Je kunt
ze ook met de hand bewerken in een teksteditor. Decap CMS is alleen een mooi formulier
bovenop; verwijderen heeft geen invloed op de site zelf.
