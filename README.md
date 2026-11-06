# Krokavec – E-shop (Včelárstvo a med)

E-shop pre Milana Krokavca – výroba včelárskych potrieb a predaj medu z Kraskova.

Dizajn je prispôsobený hlavne starším zákazníkom (včelárom): veľké písmo (18 px, tlačidlo
„Väčšie písmo“ ho zväčší na 21 px), vysoký kontrast, veľké tlačidlá s textom, telefónne číslo
stále viditeľné a jednoduchá objednávka krok za krokom.

## Technológie

- **Next.js 16** (App Router), **React 19**
- **Tailwind CSS 3**
- **Nodemailer** (e-maily pri objednávke)

## Spustenie

```bash
npm install
cp .env.example .env.local   # vyplňte SMTP údaje a IBAN
npm run dev
```

## Doplniť pred spustením

1. **IČO a DIČ** v `lib/site.js` (IČO je povinný údaj – kým je prázdne, nezobrazí sa)
2. **IBAN** v `.env.local` (`ORDER_IBAN`) alebo v `lib/site.js`
3. **SMTP nastavenia** v `.env.local`
4. Skontrolovať okres v `lib/site.js` (`district`) a texty obchodných podmienok
5. Voliteľne: skutočné fotografie produktov namiesto ilustrácií (`components/Art.js`)

## Kde čo upraviť

- `data/products.js` – produkty, ceny, sklad
- `lib/pricing.js` – doprava, dobierka, hranica dopravy zdarma
- `lib/site.js` – kontakt a firemné údaje (používajú sa na celom webe)
