# Krokavec – E-shop (Včelárstvo a med)

Moderný e-shop pre Milan Krokavec – výroba včelárskych potrieb a predaj medu z Kraskova.

## Technológie

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Nodemailer** (odosielanie e-mailov pri objednávke)

## Spustenie

```bash
npm install
cp .env.example .env.local
# vyplňte .env.local s SMTP údajmi
npm run dev
```

## Konfigurácia e-mailu (.env.local)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas-email@gmail.com
SMTP_PASS=vas-app-heslo
ORDER_EMAIL=milan@krokavec.sk
```

## Štruktúra

- `/` – Domovská stránka
- `/produkty` – Zoznam produktov (filtrovanie podľa kategórie)
- `/produkty/[slug]` – Detail produktu
- `/kosarik` – Košík
- `/objednavka` – Formulár objednávky
- `/o-nas` – O nás
- `/kontakt` – Kontakt
- `/vop` – Všeobecné obchodné podmienky
- `/ochrana-udajov` – Ochrana osobných údajov (GDPR)
- `/reklamacny-poriadok` – Reklamačný poriadok

## Doplniť pred spustením

1. **IČO a DIČ** v `components/Footer.js` a `app/vop/page.js`
2. **IBAN** pre bankový prevod v `app/api/objednavka/route.js`
3. **SMTP nastavenia** v `.env.local`
4. Voliteľne: produktové fotografie
