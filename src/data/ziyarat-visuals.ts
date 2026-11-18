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

const commons = (filename: string) =>
  'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename) + '?width=1200';
const credit = (filename: string) =>
  'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename);

export const ZIYARAT_VISUALS: Record<string, ZiyaratVisual> = {
  'cave-hira': {
    src: commons('Jabal al-Nour And cave Hira.jpg'),
    source: credit('Jabal al-Nour And cave Hira.jpg'),
    author: 'Sadath i', license: 'CC BY-SA 4.0',
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
    src: commons('Quba Mosque in Madinah, Saudi Arabia (2025).jpg'),
    source: credit('Quba Mosque in Madinah, Saudi Arabia (2025).jpg'),
    author: 'Saudi Photo Hub', license: 'CC BY-SA 4.0',
  },
  'mount-uhud': {
    src: commons('Mount Uhud, Medina, 20241002 091216 221.jpg'),
    source: credit('Mount Uhud, Medina, 20241002 091216 221.jpg'),
    author: 'Ahmed', license: 'CC BY 4.0',
  },
  'masjid-qiblatayn': {
    src: commons('Masjid Qiblatain.jpg'),
    source: credit('Masjid Qiblatain.jpg'),
    author: 'Muhammad Mahdi Karim', license: 'CC BY-SA 2.5',
  },
  'seven-mosques': {
    src: commons("Sab'u Masajid.jpg"),
    source: credit("Sab'u Masajid.jpg"),
    author: 'Imam Khairul Annas', license: 'Creative Commons — verify file page',
  },
  'salman-garden': {
    src: commons('Date palm with fruits.jpg'),
    source: credit('Date palm with fruits.jpg'),
    author: 'Kerina yin', license: 'CC0 1.0',
    representative: true, // Madinah date farm; NOT verified as Salman Al-Farsi Garden.
  },
};

export const ZIYARAT_CARD_TO_SITE: Record<string, string> = {
  'cave-hira': 'cave-hira',
  'cave-thawr': 'jabal-thawr',
  'mina-mashair': 'mina',
  'arafat-muzdalifah': 'arafat',
  'masjid-quba': 'masjid-quba',
  'mount-uhud': 'mount-uhud',
  'masjid-qiblatayn': 'masjid-qiblatayn',
  'seven-mosques': 'seven-mosques',
  'salman-garden': 'salman-garden',
};
