import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { form, items, totalPrice, shippingFee, grandTotal } = body;

    // Build order number
    const orderNumber = `KRK-${Date.now()}`;

    // COD fee
    const codFee = form.sposobPlatby === 'dobierka' ? 1.5 : 0;
    const finalTotal = grandTotal + codFee;

    // Build items table for email
    const itemsTable = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:6px 10px;border-bottom:1px solid #f0e0b0;">${item.name}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #f0e0b0;text-align:center;">${item.quantity}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #f0e0b0;text-align:right;">${(item.price * item.quantity).toFixed(2)} €</td>
          </tr>`
      )
      .join('');

    const shippingLabel =
      form.sposobDopravy === 'osobny'
        ? 'Osobný odber – Kraskovo 81'
        : 'Kuriér (Slovenská pošta / GLS)';

    const paymentLabel =
      form.sposobPlatby === 'dobierka' ? 'Dobierka' : 'Bankový prevod';

    // ---- Customer confirmation email ----
    const customerHtml = `
<!DOCTYPE html>
<html lang="sk">
<body style="font-family:Arial,sans-serif;background:#fffbeb;margin:0;padding:20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#92400e;padding:24px 32px;text-align:center;">
      <div style="font-size:32px;">🐝</div>
      <h1 style="color:#fff;margin:8px 0 0;font-size:20px;">Krokavec – Včelárstvo a med</h1>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#92400e;margin-top:0;">Ďakujeme za Vašu objednávku!</h2>
      <p style="color:#555;">Dobrý deň, <strong>${form.meno} ${form.priezvisko}</strong>,</p>
      <p style="color:#555;">Vaša objednávka č. <strong>${orderNumber}</strong> bola úspešne prijatá. Čoskoro sa Vám ozveme.</p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
        <thead>
          <tr style="background:#fef3c7;">
            <th style="padding:8px 10px;text-align:left;">Produkt</th>
            <th style="padding:8px 10px;text-align:center;">Ks</th>
            <th style="padding:8px 10px;text-align:right;">Cena</th>
          </tr>
        </thead>
        <tbody>${itemsTable}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:8px 10px;text-align:right;color:#555;">Doprava:</td>
            <td style="padding:8px 10px;text-align:right;">${shippingFee === 0 ? 'Zdarma' : shippingFee.toFixed(2) + ' €'}</td>
          </tr>
          ${codFee > 0 ? `<tr><td colspan="2" style="padding:8px 10px;text-align:right;color:#555;">Dobierka:</td><td style="padding:8px 10px;text-align:right;">1,50 €</td></tr>` : ''}
          <tr style="font-weight:bold;">
            <td colspan="2" style="padding:10px;text-align:right;font-size:16px;color:#92400e;">Celkom:</td>
            <td style="padding:10px;text-align:right;font-size:16px;color:#92400e;">${finalTotal.toFixed(2)} €</td>
          </tr>
        </tfoot>
      </table>

      <table style="font-size:13px;color:#555;width:100%;">
        <tr><td style="padding:3px 0;"><strong>Doprava:</strong></td><td>${shippingLabel}</td></tr>
        <tr><td style="padding:3px 0;"><strong>Platba:</strong></td><td>${paymentLabel}</td></tr>
        <tr><td style="padding:3px 0;"><strong>Adresa:</strong></td><td>${form.ulica}, ${form.psc} ${form.mesto}, ${form.krajina}</td></tr>
        ${form.poznamka ? `<tr><td style="padding:3px 0;"><strong>Poznámka:</strong></td><td>${form.poznamka}</td></tr>` : ''}
      </table>

      ${form.sposobPlatby === 'prevod' ? `
      <div style="background:#fef3c7;border-radius:10px;padding:16px;margin-top:20px;">
        <strong style="color:#92400e;">Údaje pre bankový prevod:</strong><br/>
        <span style="font-size:13px;color:#555;">
          Číslo účtu: (doplniť IBAN)<br/>
          Suma: ${finalTotal.toFixed(2)} €<br/>
          Variabilný symbol: ${orderNumber}
        </span>
      </div>` : ''}

      <p style="color:#555;margin-top:20px;font-size:13px;">
        V prípade otázok nás kontaktujte na
        <a href="mailto:milan@krokavec.sk" style="color:#b45309;">milan@krokavec.sk</a>
        alebo <a href="tel:+421911768758" style="color:#b45309;">0911 768 758</a>.
      </p>
    </div>
    <div style="background:#78350f;padding:16px;text-align:center;font-size:12px;color:#fde68a;">
      Milan Krokavec · Kraskovo 81, 980 26 Kraskovo · milan@krokavec.sk
    </div>
  </div>
</body>
</html>`;

    // ---- Seller notification email ----
    const sellerHtml = `
<!DOCTYPE html>
<html lang="sk">
<body style="font-family:Arial,sans-serif;">
  <h2>Nová objednávka: ${orderNumber}</h2>
  <p><strong>Zákazník:</strong> ${form.meno} ${form.priezvisko}</p>
  <p><strong>E-mail:</strong> ${form.email}</p>
  <p><strong>Telefón:</strong> ${form.telefon}</p>
  <p><strong>Adresa:</strong> ${form.ulica}, ${form.psc} ${form.mesto}, ${form.krajina}</p>
  <p><strong>Doprava:</strong> ${shippingLabel}</p>
  <p><strong>Platba:</strong> ${paymentLabel}</p>
  ${form.poznamka ? `<p><strong>Poznámka:</strong> ${form.poznamka}</p>` : ''}
  <table border="1" cellpadding="6" style="border-collapse:collapse;font-size:13px;">
    <tr><th>Produkt</th><th>Ks</th><th>Cena</th></tr>
    ${items.map((i) => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${(i.price * i.quantity).toFixed(2)} €</td></tr>`).join('')}
    <tr><td colspan="2"><strong>Doprava</strong></td><td>${shippingFee === 0 ? 'Zdarma' : shippingFee.toFixed(2) + ' €'}</td></tr>
    ${codFee > 0 ? `<tr><td colspan="2"><strong>Dobierka</strong></td><td>1,50 €</td></tr>` : ''}
    <tr><td colspan="2"><strong>CELKOM</strong></td><td><strong>${finalTotal.toFixed(2)} €</strong></td></tr>
  </table>
</body>
</html>`;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const orderEmail = process.env.ORDER_EMAIL || 'milan@krokavec.sk';

    // Send both emails in parallel
    await Promise.all([
      // To customer
      transporter.sendMail({
        from: `"Krokavec – Včelárstvo" <${process.env.SMTP_USER}>`,
        to: form.email,
        subject: `Potvrdenie objednávky ${orderNumber} – Krokavec`,
        html: customerHtml,
      }),
      // To seller
      transporter.sendMail({
        from: `"Krokavec E-shop" <${process.env.SMTP_USER}>`,
        to: orderEmail,
        subject: `Nová objednávka ${orderNumber} – ${form.meno} ${form.priezvisko}`,
        html: sellerHtml,
      }),
    ]);

    return Response.json(
      { success: true, orderNumber },
      { status: 200 }
    );
  } catch (error) {
    console.error('Order error:', error);
    return Response.json(
      {
        success: false,
        message:
          'Nastala chyba pri odosielaní objednávky. Prosím kontaktujte nás priamo na milan@krokavec.sk alebo 0911 768 758.',
      },
      { status: 500 }
    );
  }
}
