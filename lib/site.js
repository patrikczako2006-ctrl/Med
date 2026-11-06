// All business details in one place. Fill in the empty values before launch.
export const site = {
  name: 'Krokavec',
  tagline: 'Včelárstvo a med',
  owner: 'Milan Krokavec',
  ownerGenitive: 'Milana Krokavca',
  street: 'Kraskovo 81',
  zip: '980 26',
  city: 'Kraskovo',
  district: 'okres Rimavská Sobota, Banskobystrický kraj',
  country: 'Slovenská republika',
  phone: '0911 768 758',
  phoneHref: 'tel:+421911768758',
  email: 'milan@krokavec.sk',
  facebook: 'https://www.facebook.com/krokavec.sk/',
  mapUrl: 'https://maps.google.com/?q=Kraskovo+81,+980+26+Kraskovo',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.krokavec.sk',

  // DOPLNIŤ – zákon vyžaduje uviesť IČO; kým je prázdne, na stránke sa nezobrazí.
  ico: '',
  dic: '',
  // DOPLNIŤ – IBAN pre platbu prevodom (dá sa nastaviť aj cez ORDER_IBAN v .env.local)
  iban: process.env.ORDER_IBAN || '',
};

export const fullAddress = `${site.street}, ${site.zip} ${site.city}`;
