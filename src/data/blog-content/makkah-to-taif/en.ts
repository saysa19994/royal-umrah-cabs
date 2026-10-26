import { LocalizedArticleBody } from '../types';

export const MAKKAH_TAIF_CONTENT_EN: LocalizedArticleBody = {
  intro: {
    title: 'Planning a Private Car Transfer from Makkah to Taif: Mountain Routes, Rose Farms & Miqat Guide',
    paragraphs: [
      'Perched at an elevation exceeding 1,800 meters in the Sarawat Mountains, Taif is the historic highland sanctuary of western Saudi Arabia. Known for its pleasant climate, fragrant rose harvest, cable car, and historical heritage, it offers pilgrims a refreshing day-trip or weekend retreat.',
      'Traveling between Makkah and Taif involves navigating the winding Al Hada mountain pass and, for pilgrims returning to perform Umrah, observing the mandatory stop at Miqat Qarn al-Manazil to enter the state of Ihram.',
      'This comprehensive guide covers everything you need to know about route conditions, recommended family vehicles, rose distillery visits, and transparent fixed pricing with 100% pay-upon-arrival assurance.',
    ],
  },
  sections: [
    {
      id: 'route-nature',
      title: 'The Mountain Highway: Al Hada Escarpment & Safe Alternatives',
      lead: 'An 85-kilometer highway engineered with dual carriageways and advanced safety guardrails.',
      paragraphs: [
        'Route 15, known as the Al Hada Mountain Highway, connects the holy valley of Makkah to the mountain crest of Taif. In a private vehicle, the drive takes between 75 and 90 minutes under normal traffic conditions.',
        'During seasonal heavy rain or mountain fog, civil authorities may temporarily close the Al Hada escarpment for passenger safety. In such situations, professional chauffeurs seamlessly take Route 287 (As-Sayl Al-Kabeer Highway), ensuring a smooth, safe arrival.',
      ],
      callout: {
        type: 'info',
        title: 'Traveler Tip for Mountain Trips',
        text: 'Opt for late-model VIP vans or SUVs with multi-zone air conditioning and smooth suspension to ensure maximum comfort for children and elderly family members on mountain curves.',
      },
    },
    {
      id: 'miqat-stop',
      title: 'Dedicated Stop at Miqat Qarn al-Manazil (As-Sayl & Wadi Muharram)',
      lead: 'Fulfill your Umrah pilgrimage with an unhurried stop for ghusl and donning the Ihram.',
      paragraphs: [
        'For travelers coming from Taif to Makkah with the intention of performing Umrah, passing through the designated Miqat boundary in Ihram is mandatory. Depending on the route taken, you will stop at either Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) or Wadi Muharram atop Al Hada.',
        'Our private chauffeur service includes a dedicated 30 to 45-minute stop at the Miqat facilities, allowing you ample time to perform ablutions, change into your Ihram garments, and pray before proceeding to the Grand Mosque.',
      ],
      bullets: [
        {
          title: 'Wadi Muharram Miqat',
          text: 'Located at the crest of the Al Hada mountain pass, serving travelers descending via Route 15.',
        },
        {
          title: 'Qarn al-Manazil (As-Sayl Al-Kabeer)',
          text: 'The primary historical Miqat for pilgrims traveling from central Arabia, featuring vast prayer halls and shower facilities.',
        },
      ],
    },
    {
      id: 'rose-farms-attractions',
      title: 'Top Attractions: Rose Distilleries, Teleferique & Heritage Sites',
      lead: 'Experience the fragrant culture and dramatic peaks of Saudi Arabia’s rose capital.',
      paragraphs: [
        'Taif is world-renowned for its prized 30-petal Damask rose (Ward Taifi). Visitors can tour historic distilleries in Al Hada and Al Shafa to witness centuries-old copper alembic extraction and purchase authentic rose water, oils, and soaps.',
        'Families can also ride the scenic Al Hada cable car down to the Al Kar tourist village, explore the royal architecture of Shubra Palace Museum, and stroll through the green lawns of Arruddaf Park.',
      ],
    },
    {
      id: 'pricing-fleet',
      title: 'Authoritative Fixed Fares: Makkah ⇄ Taif Private Transfers',
      lead: 'Transparent pricing in Saudi Riyals with fuel, highway tolls, and Miqat waiting fully included.',
      paragraphs: [
        'In line with Duyuf Alrahman VIP’s 100% Pay-the-Driver policy, you pay your chauffeur directly upon reaching your destination. No credit cards or online deposits are required to confirm your booking.',
      ],
      table: {
        headers: ['Vehicle Model', 'Capacity (Pax / Bags)', 'Route', 'Fixed Total Fare'],
        rows: [
          ['Toyota Camry Executive', '4 Passengers / 3 Bags', 'Makkah ⇄ Taif', '350 SAR'],
          ['Hyundai Staria VIP', '7 Passengers / 6 Bags', 'Makkah ⇄ Taif', '450 SAR'],
          ['GMC Yukon XL VIP', '7 Passengers / 8 Bags', 'Makkah ⇄ Taif', '600 SAR'],
          ['Toyota HiAce VIP', '10 Passengers / 10 Bags', 'Makkah ⇄ Taif', '550 SAR'],
          ['Toyota Coaster VIP', '21 Passengers / 20 Bags', 'Makkah ⇄ Taif', '950 SAR'],
        ],
      },
    },
  ],
  faqTitle: 'Frequently Asked Questions: Makkah to Taif Transfers',
  faqSubtitle: 'Clear answers to help you plan a safe, relaxing mountain journey',
  cta: {
    title: 'Reserve Your Private Chauffeur to Taif Today',
    subtitle: 'Professional mountain drivers • Luxury family fleet • Pay upon arrival in cash or card',
    primaryBtn: 'Book Taif Transfer',
    secondaryBtn: 'Chat on WhatsApp',
    badges: ['Zero Advance Deposit', 'Free Miqat Waiting', '24/7 Dispatch Support'],
  },
};
