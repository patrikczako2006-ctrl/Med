import nodemailer from 'nodemailer';
import { DELIVERY, PAYMENT, paymentsFor, priceOrder, formatPrice } from '../../../lib/pricing';
import { validateOrderForm } from '../../../lib/validation';
import { site, fullAddress } from '../../../lib/site';

export const runtime = 'nodejs';

const FAIL_MESSAGE = `Objednávku sa nepodarilo odoslať. Skúste to, prosím, znova alebo nám zavolajte na ${site.phone}.`;

// Escape everything the customer typed before putting it into an e-mail.
const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// 10 digits, usable as "variabilný symbol": YYMMDD + 4 random digits
function makeOrderNumber() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}${rand}`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: FAIL_MESSAGE }, { status: 400 });
  }

  const raw = body?.form || {};
  // Spam bots fill the hidden field – pretend success, send nothing.
  if (raw.web) return Response.json({ success: true, orderNumber: makeOrderNumber(), payment: 'prevod', total: 0 });

  const form = {
    meno: clean(raw.meno, 80),
    priezvisko: clean(raw.priezvisko, 80),
    telefon: clean(raw.telefon, 30),
    email: clean(raw.email, 120),
    ulica: clean(raw.ulica, 150),
    mesto: clean(raw.mesto, 80),
    psc: clean(raw.psc, 10),
    doprava: DELIVERY[raw.doprava] ? raw.doprava : 'kurier',
    platba: PAYMENT[raw.platba] ? raw.platba : 'prevod',
    poznamka: clean(raw.poznamka, 1000),
    suhlasVop: raw.suhlasVop === true,
  };
  if (!paymentsFor(form.doprava).includes(form.platba)) form.platba = paymentsFor(form.doprava)[0];

  const errors = validateOrderForm(form);
  if (Object.keys(errors).length) {
    return Response.json({ success: false, errors, message: 'Skontrolujte, prosím, vyplnené údaje.' }, { status: 422 });
  }

  // Prices are recalculated here from our own product list – never taken from the browser.
  const order = priceOrder(body?.items, form.doprava, form.platba);
  if (!order.lines.length) {
    return Response.json({ success: false, message: 'Košík je prázdny alebo tovar už nie je v ponuke.' }, { status: 422 });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Order error: SMTP_USER / SMTP_PASS are not configured in .env.local');
    return Response.json({ success: false, message: FAIL_MESSAGE }, { status: 500 });
  }

  const orderNumber = makeOrderNumber();
  const iban = site.iban;
  const deliveryLabel = DELIVERY[form.doprava].label;
  const paymentLabel = PAYMENT[form.platba].label;
  const name = `${form.meno} ${form.priezvisko}`;
  const address = form.doprava === 'osobny' ? `Osobný odber – ${fullAddress}` : `${form.ulica}, ${form.psc} ${form.mesto}`;

  const rows = order.lines
    .map(
      (l) => `<tr>
        <td style="padding:10px;border-bottom:1px solid #F1D892;">${esc(l.product.name)}${l.variant ? ` (${esc(l.variant)})` : ''}</td>
        <td style="padding:10px;border-bottom:1px solid #F1D892;text-align:center;">${l.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #F1D892;text-align:right;white-space:nowrap;">${formatPrice(l.lineTotal)}</td>
      </tr>`
    )
    .join('');

  const totals = `
    <tr><td colspan="2" style="padding:8px 10px;text-align:right;">Doprava:</td><td style="padding:8px 10px;text-align:right;">${order.shipping === 0 ? 'zdarma' : formatPrice(order.shipping)}</td></tr>
    ${order.codFee ? `<tr><td colspan="2" style="padding:8px 10px;text-align:right;">Dobierka:</td><td style="padding:8px 10px;text-align:right;">${formatPrice(order.codFee)}</td></tr>` : ''}
    <tr><td colspan="2" style="padding:12px 10px;text-align:right;font-size:20px;font-weight:bold;color:#462C14;">Spolu:</td><td style="padding:12px 10px;text-align:right;font-size:20px;font-weight:bold;color:#462C14;white-space:nowrap;">${formatPrice(order.total)}</td></tr>`;

  const customerHtml = `<!DOCTYPE html><html lang="sk"><body style="margin:0;padding:20px;background:#FBF5E9;font-family:Georgia,'Times New Roman',serif;color:#2A1E12;font-size:17px;line-height:1.55;">
  <div style="max-width:600px;margin:0 auto;background:#FFFCF5;border:1px solid #F1D892;border-radius:16px;overflow:hidden;">
    <div style="background:#462C14;padding:24px 32px;color:#FFFCF5;">
      <div style="font-size:26px;font-weight:bold;">Krokavec</div>
      <div style="color:#F7C55A;">Včelárstvo a med z Kraskova</div>
    </div>
    <div style="padding:32px;font-family:Arial,Helvetica,sans-serif;">
      <h1 style="margin:0 0 12px;font-size:24px;color:#462C14;">Ďakujeme za objednávku!</h1>
      <p>Dobrý deň, ${esc(name)},</p>
      <p>vašu objednávku č. <strong>${orderNumber}</strong> sme prijali. Ak budeme niečo potrebovať, zavoláme vám.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:17px;">
        <thead><tr style="background:#F8EAC6;"><th style="padding:10px;text-align:left;">Tovar</th><th style="padding:10px;">Ks</th><th style="padding:10px;text-align:right;">Cena</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot>${totals}</tfoot>
      </table>
      <p><strong>Doprava:</strong> ${esc(deliveryLabel)}<br/><strong>Platba:</strong> ${esc(paymentLabel)}<br/><strong>Adresa:</strong> ${esc(address)}<br/><strong>Telefón:</strong> ${esc(form.telefon)}
      ${form.poznamka ? `<br/><strong>Poznámka:</strong> ${esc(form.poznamka)}` : ''}</p>
      ${
        form.platba === 'prevod'
          ? `<div style="background:#F8EAC6;border-radius:12px;padding:18px;margin-top:20px;">
              <strong style="font-size:19px;">Údaje na platbu</strong><br/>
              Suma: <strong>${formatPrice(order.total)}</strong><br/>
              Variabilný symbol: <strong>${orderNumber}</strong><br/>
              Číslo účtu (IBAN): <strong>${iban ? esc(iban) : 'pošleme vám v samostatnom e-maile'}</strong><br/>
              Tovar odošleme hneď, ako nám platba príde na účet.
            </div>`
          : ''
      }
      <p style="margin-top:24px;">S pozdravom<br/>${esc(site.owner)}<br/>Tel.: <a href="${site.phoneHref}" style="color:#5E3B1B;">${site.phone}</a></p>
    </div>
    <div style="background:#2F1D0D;color:#F8EAC6;padding:16px;text-align:center;font-family:Arial,sans-serif;font-size:14px;">
      ${esc(site.owner)} · ${esc(fullAddress)} · ${site.email}
    </div>
  </div></body></html>`;

  const sellerHtml = `<!DOCTYPE html><html lang="sk"><body style="font-family:Arial,sans-serif;font-size:16px;">
    <h2>Nová objednávka č. ${orderNumber}</h2>
    <p><strong>Zákazník:</strong> ${esc(name)}<br/>
    <strong>Telefón:</strong> ${esc(form.telefon)}<br/>
    <strong>E-mail:</strong> ${esc(form.email)}<br/>
    <strong>Adresa:</strong> ${esc(address)}<br/>
    <strong>Doprava:</strong> ${esc(deliveryLabel)}<br/>
    <strong>Platba:</strong> ${esc(paymentLabel)}</p>
    ${form.poznamka ? `<p><strong>Poznámka:</strong> ${esc(form.poznamka)}</p>` : ''}
    <table style="border-collapse:collapse;" border="1" cellpadding="6"><tr><th>Tovar</th><th>Ks</th><th>Cena</th></tr>${rows}${totals}</table>
  </body></html>`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const from = `"Krokavec – Včelárstvo" <${process.env.SMTP_USER}>`;

  // The seller e-mail is what matters: if it fails, the order is lost, so report an error.
  try {
    await transporter.sendMail({
      from,
      to: process.env.ORDER_EMAIL || site.email,
      replyTo: form.email,
      subject: `Nová objednávka ${orderNumber} – ${name}`,
      html: sellerHtml,
    });
  } catch (err) {
    console.error('Order error (seller e-mail):', err);
    return Response.json({ success: false, message: FAIL_MESSAGE }, { status: 500 });
  }

  let customerEmailSent = true;
  try {
    await transporter.sendMail({
      from,
      to: form.email,
      replyTo: site.email,
      subject: `Potvrdenie objednávky ${orderNumber} – Krokavec`,
      html: customerHtml,
    });
  } catch (err) {
    customerEmailSent = false;
    console.error('Order warning (customer e-mail):', err);
  }

  return Response.json({
    success: true,
    orderNumber,
    total: order.total,
    payment: form.platba,
    iban: form.platba === 'prevod' ? iban : '',
    customerEmailSent,
  });
}
