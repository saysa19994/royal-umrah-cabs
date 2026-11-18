/**
 * Historical destination photography: source pages and photographer/licence
 * kept together for attribution. These are REAL images, NOT AI reconstructions.
 * Special:FilePath is a Wikimedia Commons stable redirect to the media file.
 * If an original photographer/source image is unavailable, the consumer must
 * preserve the textual facts. Do not use vehicle imagery as a site photo.
 */
export interface ZiyaratVisual {
  src: string;
  source: string;
  author: string;
  license: string;
  representative?: boolean;
}

const LOCAL_MAP: Record<string, string> = {
  'Jabbal An-Nour (2024).jpg': '/assets/images/ziyarat/cave-hira.jpg',
  'Masjid Aisha Taneem Makkah.jpg': '/assets/images/ziyarat/masjid-aisha.jpg',
  'Jabl e Thawr.jpg': '/assets/images/ziyarat/jabal-thawr.jpg',
  'Mina Overview.JPG': '/assets/images/ziyarat/mina.jpg',
  'Mount Arafat(Jabal ar-Raḥmah).jpg': '/assets/images/ziyarat/arafat.jpg',
  'Quba Mosque (2024).jpg': '/assets/images/ziyarat/masjid-quba.jpg',
  'Jabal-e-Uhud.jpg': '/assets/images/ziyarat/jabal-uhud.jpg',
  'Masjid Qiblatain.jpg': '/assets/images/ziyarat/masjid-qiblatayn.jpg',
  'Battle of trench, Medina.JPG': '/assets/images/ziyarat/seven-mosques.jpg',
  'Date palm with fruits.jpg': '/assets/images/ziyarat/salman-garden.jpg',
};

const commons = (filename: string) => LOCAL_MAP[filename] || `/assets/images/ziyarat/${filename}`;
const credit = (filename: string) =>
  'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename);

export const ZIYARAT_VISUALS: Record<string, ZiyaratVisual> = {
  'cave-hira': {
    src: commons('Jabbal An-Nour (2024).jpg'),
    source: credit('Jabbal An-Nour (2024).jpg'),
    author: 'Kaliper1', license: 'CC BY-SA 4.0',
  },
  'masjid-aisha': {
    src: commons('Masjid Aisha Taneem Makkah.jpg'),
    source: credit('Masjid Aisha Taneem Makkah.jpg'),
    author: 'King Eliot', license: 'CC BY-SA 4.0',
  },
  'jabal-thawr': {
    src: commons('Jabl e Thawr.jpg'),
    source: credit('Jabl e Thawr.jpg'),
    author: 'King Eliot', license: 'CC BY-SA 4.0',
  },
  'mina': {
    src: commons('Mina Overview.JPG'),
    source: credit('Mina Overview.JPG'),
    author: 'Mubeen Rahman', license: 'CC BY 3.0',
  },
  'arafat': {
    src: commons('Mount Arafat(Jabal ar-Raḥmah).jpg'),
    source: credit('Mount Arafat(Jabal ar-Raḥmah).jpg'),
    author: 'Edibiz', license: 'CC0 1.0',
  },
  'masjid-quba': {
    src: commons('Quba Mosque (2024).jpg'),
    source: credit('Quba Mosque (2024).jpg'),
    author: 'Kaliper1', license: 'CC BY-SA 4.0',
  },
  'mount-uhud': {
    src: commons('Jabal-e-Uhud.jpg'),
    source: credit('Jabal-e-Uhud.jpg'),
    author: 'Bintladen', license: 'CC BY-SA 4.0',
  },
  'masjid-qiblatayn': {
    src: commons('Masjid Qiblatain.jpg'),
    source: credit('Masjid Qiblatain.jpg'),
    author: 'Muhammad Mahdi Karim', license: 'CC BY-SA 2.5',
  },
  'seven-mosques': {
    src: commons("Battle of trench, Medina.JPG"),
    source: credit("Battle of trench, Medina.JPG"),
    author: 'Md iet', license: 'CC BY-SA 3.0',
  },
  'salman-garden': {
    src: commons('Date palm with fruits.jpg'),
    source: credit('Date palm with fruits.jpg'),
    author: 'Kerina yin', license: 'CC0 1.0',
    representative: true, // Madinah date farm; NOT verified as Salman Al-Farsi Garden.
  },
};

export function getZiyaratLicenseUrl(license: string) {
  if (license === 'CC0 1.0') return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (license === 'CC BY-SA 2.5') return 'https://creativecommons.org/licenses/by-sa/2.5/';
  if (license === 'CC BY-SA 3.0') return 'https://creativecommons.org/licenses/by-sa/3.0/';
  if (license === 'CC BY 3.0') return 'https://creativecommons.org/licenses/by/3.0/';
  if (license === 'CC BY 4.0') return 'https://creativecommons.org/licenses/by/4.0/';
  return 'https://creativecommons.org/licenses/by-sa/4.0/';
}

export const ZIYARAT_CARD_TO_SITE: Record<string, string> = {
  'cave-hira': 'cave-hira',
  'cave-thawr': 'jabal-thawr',
  'mina-mashair': 'mina',
  'arafat-muzdalifah': 'arafat',
  'masjid-aisha': 'masjid-aisha',
  'masjid-quba': 'masjid-quba',
  'mount-uhud': 'mount-uhud',
  'masjid-qiblatayn': 'masjid-qiblatayn',
  'seven-mosques': 'seven-mosques',
  'salman-garden': 'salman-garden',
};
