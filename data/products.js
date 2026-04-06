export const categories = [
  { id: 'ule', name: 'Úle a nadstavky', icon: '🐝' },
  { id: 'ramiky', name: 'Rámiky', icon: '🔲' },
  { id: 'prislusenstvo', name: 'Príslušenstvo', icon: '🔧' },
  { id: 'med', name: 'Med a včelie produkty', icon: '🍯' },
];

export const products = [
  // ULE
  {
    id: 1,
    slug: 'ul-langstroth-zakladny',
    name: 'Úľ Langstroth – základný typ',
    category: 'ule',
    price: 85,
    description:
      'Klasický Langstrothov úľ vyrobený zo sušeného smrekového a borovicového dreva, hrúbka stien 25 mm. Obsahuje dno, jedno teleso, strešku. Vhodný pre začínajúcich aj skúsených včelárov.',
    details: [
      'Materiál: sušené smrekové/borovicové drevo',
      'Hrúbka stien: 25 mm',
      'Obsah: dno + teleso + striešku',
      'Rozmer telesa: Langstroth štandard',
    ],
    stock: 10,
  },
  {
    id: 2,
    slug: 'ul-b-typ-zakladny',
    name: 'Úľ B-typ – základný typ',
    category: 'ule',
    price: 75,
    description:
      'Úľ B-typ zo sušeného dreva s hrúbkou stien 25 mm. Obsahuje dno, jedno teleso a strešku. Vhodný pre slovenské včelárske podmienky.',
    details: [
      'Materiál: sušené smrekové/borovicové drevo',
      'Hrúbka stien: 25 mm',
      'Obsah: dno + teleso + striešku',
      'Rozmer: B-typ štandard',
    ],
    stock: 10,
  },
  {
    id: 3,
    slug: 'nadstavok-langstroth',
    name: 'Nástavok pre úľ Langstroth',
    category: 'ule',
    price: 28,
    description:
      'Rozširovací nadstavok pre Langstrothov úľ. Sušené drevo, hrúbka stien 25 mm. Predávaný samostatne.',
    details: [
      'Materiál: sušené drevo',
      'Hrúbka stien: 25 mm',
      'Typ: Langstroth',
    ],
    stock: 20,
  },
  {
    id: 4,
    slug: 'nadstavok-b-typ',
    name: 'Nástavok pre úľ B-typ',
    category: 'ule',
    price: 24,
    description:
      'Rozširovací nadstavok pre B-typ úľ zo sušeného dreva s hrúbkou stien 25 mm.',
    details: [
      'Materiál: sušené drevo',
      'Hrúbka stien: 25 mm',
      'Typ: B-typ',
    ],
    stock: 20,
  },
  {
    id: 5,
    slug: 'kovova-strieska',
    name: 'Kovová striešku pre úľ',
    category: 'ule',
    price: 32,
    description:
      'Odolná kovová striešku pre Langstroth alebo B-typ úľ. Ochráni úľ pred dažďom a slnkom.',
    details: [
      'Materiál: pozinkovaný plech',
      'Kompatibilita: Langstroth, B-typ',
    ],
    stock: 15,
  },

  // RAMIKY
  {
    id: 6,
    slug: 'ramiky-b-10ks',
    name: 'Rámiky B – 10 ks',
    category: 'ramiky',
    price: 16,
    description:
      'Sada 10 kusov nových drevených rámikov B-typ pre včelárske úle. Štandardný rozmer.',
    details: [
      'Počet: 10 ks',
      'Typ: B-rámiky',
      'Materiál: drevo',
      'Stav: nové',
    ],
    stock: 50,
  },
  {
    id: 7,
    slug: 'ramiky-lg159-10ks',
    name: 'Rámiky LG 159 – 10 ks',
    category: 'ramiky',
    price: 19,
    description:
      'Sada 10 kusov nových drevených rámikov Langstroth LG 159. Štandardný rozmer pre Langstrothove úle.',
    details: [
      'Počet: 10 ks',
      'Typ: LG 159',
      'Materiál: drevo',
      'Stav: nové',
    ],
    stock: 50,
  },

  // PRISLUSENSTVO
  {
    id: 8,
    slug: 'stropne-krmidlo',
    name: 'Stropné kŕmidlo',
    category: 'prislusenstvo',
    price: 13,
    description:
      'Plastové stropné kŕmidlo pre včely. Ľahká montáž, jednoduchá údržba. Vhodné pre všetky typy úľov.',
    details: [
      'Materiál: plast',
      'Montáž: priamo na vrchný nástavok',
      'Objem: cca 2 l',
    ],
    stock: 30,
  },
  {
    id: 9,
    slug: 'dno-so-zachytom-pelu',
    name: 'Dno so záchytom peľu',
    category: 'prislusenstvo',
    price: 22,
    description:
      'Drevené dno s integrovanou peľochytou. Umožňuje zbieranie peľu priamo pri vstupe do úľa. Vhodné pre Langstroth aj B-typ.',
    details: [
      'Materiál: drevo + sieťka',
      'Funkcia: zachytávanie peľu',
      'Kompatibilita: Langstroth, B-typ',
    ],
    stock: 15,
  },
  {
    id: 10,
    slug: 'pelochyt',
    name: 'Peľochyt',
    category: 'prislusenstvo',
    price: 19,
    description:
      'Samostatný peľochyt pre montáž na predný vstup úľa. Efektívne zbiera peľ od včiel pri návrate do úľa.',
    details: [
      'Typ: predný',
      'Materiál: plast/drevo',
      'Jednoduchá montáž a demontáž',
    ],
    stock: 20,
  },

  // MED A VCELI PRODUKTY
  {
    id: 11,
    slug: 'kvetovy-med-09kg',
    name: 'Kvetový med – 0,9 kg',
    category: 'med',
    price: 8,
    description:
      'Prírodný kvetový med od Milana Krokavca z Kraskova. Zbieraný z lúčnych kvetov, nefiltrovaný, bez pridaných látok.',
    details: [
      'Hmotnosť: 0,9 kg',
      'Typ: kvetový',
      'Pôvod: Kraskovo, Slovensko',
      'Bez pridaných cukrov',
    ],
    stock: 40,
  },
  {
    id: 12,
    slug: 'kremovy-med-09kg',
    name: 'Krémový med – 0,9 kg',
    category: 'med',
    price: 9,
    description:
      'Jemný krémový med vhodný na natieranie. Prírodný, bez pridaných látok. Vyrábané tradičnou metódou.',
    details: [
      'Hmotnosť: 0,9 kg',
      'Typ: krémový (na natieranie)',
      'Pôvod: Kraskovo, Slovensko',
      'Bez pridaných cukrov',
    ],
    stock: 35,
  },
  {
    id: 13,
    slug: 'vceli-pel-250g',
    name: 'Včelí peľ – 250 g',
    category: 'med',
    price: 7,
    description:
      'Čerstvý včelí peľ zbieraný z vlastných úľov. Prírodný zdroj vitamínov, minerálov a aminokyselín.',
    details: [
      'Hmotnosť: 250 g',
      'Sušený pri nízkej teplote',
      'Pôvod: Kraskovo, Slovensko',
      'Skladovanie: chladné a suché miesto',
    ],
    stock: 25,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId);
}
