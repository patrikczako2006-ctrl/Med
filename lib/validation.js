// Shared by the order form (browser) and the API route (server).
export function validateOrderForm(form = {}) {
  const e = {};
  const str = (k) => (typeof form[k] === 'string' ? form[k].trim() : '');

  if (!str('meno')) e.meno = 'Napíšte svoje meno.';
  if (!str('priezvisko')) e.priezvisko = 'Napíšte svoje priezvisko.';

  const phone = str('telefon').replace(/[\s/-]/g, '');
  if (!phone) e.telefon = 'Napíšte telefónne číslo.';
  else if (!/^(\+|00)?\d{9,13}$/.test(phone)) e.telefon = 'Telefónne číslo nevyzerá správne – napríklad 0911 123 456.';

  const email = str('email');
  if (!email) e.email = 'Napíšte e-mailovú adresu.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = 'E-mailová adresa nevyzerá správne – napríklad jan.novak@gmail.com.';

  if (form.doprava !== 'osobny') {
    if (!str('ulica')) e.ulica = 'Napíšte ulicu a číslo domu.';
    if (!str('mesto')) e.mesto = 'Napíšte obec alebo mesto.';
    const psc = str('psc').replace(/\s/g, '');
    if (!psc) e.psc = 'Napíšte PSČ.';
    else if (!/^\d{5}$/.test(psc)) e.psc = 'PSČ má 5 číslic – napríklad 980 26.';
  }

  if (form.suhlasVop !== true) e.suhlasVop = 'Pre odoslanie objednávky je potrebný súhlas s obchodnými podmienkami.';
  return e;
}
