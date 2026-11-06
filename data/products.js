export const categories = [
  {
    id: 'ule',
    name: 'Úle a nadstavky',
    description: 'Langstroth a B-typ zo sušeného dreva, steny 25 mm',
    art: 'hive',
  },
  {
    id: 'ramiky',
    name: 'Rámiky',
    description: 'Nové drevené rámiky, balenie po 10 kusov',
    art: 'frames',
  },
  {
    id: 'prislusenstvo',
    name: 'Príslušenstvo',
    description: 'Kŕmidlá, dná a peľochyty',
    art: 'feeder',
  },
  {
    id: 'med',
    name: 'Med a včelie produkty',
    description: 'Z vlastných úľov v Kraskove',
    art: 'honey',
  },
];

const HIVE_TYPES = ['Langstroth', 'B-typ'];

export const products = [
  // ÚLE A NADSTAVKY
  {
    id: 1,
    slug: 'ul-langstroth-zakladny',
    name: 'Úľ Langstroth – základná zostava',
    category: 'ule',
    art: 'hive',
    price: 85,
    description:
      'Klasický úľ Langstroth zo sušeného smrekového a borovicového dreva s hrúbkou stien 25 mm. Zostava obsahuje dno, jedno teleso a striešku. Vhodný pre začínajúcich aj skúsených včelárov.',
    details: [
      'Materiál: sušené smrekové a borovicové drevo',
      'Hrúbka stien: 25 mm',
      'Zostava: dno, teleso, strieška',
      'Rozmer: Langstroth (štandard)',
    ],
    stock: 10,
  },
  {
    id: 2,
    slug: 'ul-b-typ-zakladny',
    name: 'Úľ B-typ – základná zostava',
    category: 'ule',
    art: 'hive',
    price: 75,
    featured: true,
    description:
      'Úľ B-typ zo sušeného dreva s hrúbkou stien 25 mm. Zostava obsahuje dno, jedno teleso a striešku. Osvedčený typ pre slovenské včelárske podmienky.',
    details: [
      'Materiál: sušené smrekové a borovicové drevo',
      'Hrúbka stien: 25 mm',
      'Zostava: dno, teleso, strieška',
      'Rozmer: B-typ (štandard)',
    ],
    stock: 10,
  },
  {
    id: 3,
    slug: 'nadstavok-langstroth',
    name: 'Nadstavok pre úľ Langstroth',
    category: 'ule',
    art: 'box',
    price: 28,
    description:
      'Nadstavok na rozšírenie úľa Langstroth. Sušené drevo, hrúbka stien 25 mm. Predáva sa samostatne.',
    details: ['Materiál: sušené drevo', 'Hrúbka stien: 25 mm', 'Typ: Langstroth'],
    stock: 20,
  },
  {
    id: 4,
    slug: 'nadstavok-b-typ',
    name: 'Nadstavok pre úľ B-typ',
    category: 'ule',
    art: 'box',
    price: 24,
    description:
      'Nadstavok na rozšírenie úľa B-typ zo sušeného dreva s hrúbkou stien 25 mm. Predáva sa samostatne.',
    details: ['Materiál: sušené drevo', 'Hrúbka stien: 25 mm', 'Typ: B-typ'],
    stock: 20,
  },
  {
    id: 5,
    slug: 'kovova-strieska',
    name: 'Kovová strieška na úľ',
    category: 'ule',
    art: 'roof',
    price: 32,
    description:
      'Odolná strieška z pozinkovaného plechu. Chráni úľ pred dažďom aj slnkom. Pri objednávke si vyberte typ úľa.',
    details: ['Materiál: pozinkovaný plech', 'Na výber: Langstroth alebo B-typ'],
    variants: HIVE_TYPES,
    stock: 15,
  },

  // RÁMIKY
  {
    id: 6,
    slug: 'ramiky-b-10ks',
    name: 'Rámiky B – 10 ks',
    category: 'ramiky',
    art: 'frames',
    price: 16,
    featured: true,
    description:
      'Balenie 10 nových drevených rámikov B pre úle B-typ. Štandardný rozmer.',
    details: ['Počet: 10 ks', 'Typ: rámik B', 'Materiál: drevo', 'Stav: nové'],
    stock: 50,
  },
  {
    id: 7,
    slug: 'ramiky-lg159-10ks',
    name: 'Rámiky Langstroth 159 – 10 ks',
    category: 'ramiky',
    art: 'frames',
    price: 19,
    description:
      'Balenie 10 nových drevených rámikov Langstroth s výškou 159 mm. Štandardný rozmer pre úle Langstroth.',
    details: ['Počet: 10 ks', 'Typ: Langstroth 159 mm', 'Materiál: drevo', 'Stav: nové'],
    stock: 50,
  },

  // PRÍSLUŠENSTVO
  {
    id: 8,
    slug: 'stropne-krmidlo',
    name: 'Stropné kŕmidlo',
    category: 'prislusenstvo',
    art: 'feeder',
    price: 13,
    description:
      'Plastové stropné kŕmidlo s objemom približne 2 litre. Ľahko sa nasadí aj vyčistí. Vhodné pre všetky typy úľov.',
    details: [
      'Materiál: plast',
      'Objem: približne 2 l',
      'Montáž: priamo na vrchný nadstavok',
    ],
    stock: 30,
  },
  {
    id: 9,
    slug: 'dno-so-zachytom-pelu',
    name: 'Dno so záchytom peľu',
    category: 'prislusenstvo',
    art: 'bottom',
    price: 22,
    description:
      'Drevené dno s integrovaným peľochytom – peľ zachytíte priamo pri česne. Pri objednávke si vyberte typ úľa.',
    details: [
      'Materiál: drevo a sieťka',
      'Funkcia: zachytávanie peľu',
      'Na výber: Langstroth alebo B-typ',
    ],
    variants: HIVE_TYPES,
    stock: 15,
  },
  {
    id: 10,
    slug: 'pelochyt',
    name: 'Peľochyt na česno',
    category: 'prislusenstvo',
    art: 'trap',
    price: 19,
    description:
      'Samostatný peľochyt, ktorý sa pripevní na česno úľa. Spoľahlivo zachytáva peľ, keď sa včely vracajú domov.',
    details: [
      'Umiestnenie: na česno (vpredu)',
      'Materiál: plast a drevo',
      'Jednoduché nasadenie aj zloženie',
    ],
    stock: 20,
  },

  // MED A VČELIE PRODUKTY
  {
    id: 11,
    slug: 'kvetovy-med-09kg',
    name: 'Kvetový med – 0,9 kg',
    category: 'med',
    art: 'honey',
    price: 8,
    featured: true,
    description:
      'Prírodný kvetový med z našich úľov v Kraskove. Z lúčnych kvetov, nefiltrovaný a bez akýchkoľvek prímesí.',
    details: [
      'Hmotnosť: 0,9 kg',
      'Druh: kvetový',
      'Pôvod: Kraskovo, Slovensko',
      'Časom prirodzene skryštalizuje – je to znak pravého medu',
    ],
    stock: 40,
  },
  {
    id: 12,
    slug: 'kremovy-med-09kg',
    name: 'Krémový med – 0,9 kg',
    category: 'med',
    art: 'cream',
    price: 9,
    featured: true,
    description:
      'Jemný pastovaný med, ktorý sa ľahko natiera na pečivo. Prírodný, bez prímesí, pripravený tradičným spôsobom.',
    details: [
      'Hmotnosť: 0,9 kg',
      'Druh: krémový (pastovaný)',
      'Pôvod: Kraskovo, Slovensko',
    ],
    stock: 35,
  },
  {
    id: 13,
    slug: 'vceli-pel-250g',
    name: 'Včelí peľ – 250 g',
    category: 'med',
    art: 'pollen',
    price: 7,
    description:
      'Peľové obnôžky z našich úľov, šetrne sušené pri nízkej teplote. Chutí do jogurtu, müsli alebo zmiešaný s medom.',
    details: [
      'Hmotnosť: 250 g',
      'Sušený pri nízkej teplote',
      'Pôvod: Kraskovo, Slovensko',
      'Skladovanie: v suchu a chlade',
    ],
    stock: 25,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getCategory(id) {
  return categories.find((c) => c.id === id);
}
