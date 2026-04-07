export const DESTINATIONS = [
  {
    id: 'paris',
    title: 'Paris 1889',
    era: 'Belle Epoque',
    tagline: 'Exposition Universelle & Belle Epoque',
    teaser: "Plongez dans l'effervescence du Paris de 1889, entre Tour Eiffel scintillante et salons mondains de la Belle Epoque.",
    price: '12 500',
    duration: '7 jours',
    image: 'https://images.unsplash.com/photo-1607373080420-66dc14dba2ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcGFyaXMlMjBlaWZmZWwlMjB0b3dlcnxlbnwwfHx8fDE3NzU1OTc4Njl8MA&ixlib=rb-4.1.0&q=85',
    video: 'https://customer-assets.emergentagent.com/job_21ada7b3-46f7-41af-96e3-2e9f5bcb3690/artifacts/i3jv73l2_PARIS.mp4',
    description: "Vivez l'apogee de la Belle Epoque parisienne. Assistez a l'inauguration de la Tour Eiffel, deambulez dans les pavillons de l'Exposition Universelle et laissez-vous porter par l'elegance d'une epoque ou Paris etait la capitale du monde. Decouvrez l'architecture haussmannienne, les cafes litteraires et les premiers eclairages au gaz qui illuminent les boulevards.",
    highlights: [
      "Visite privee de la Tour Eiffel avant son ouverture au public",
      "Soiree au Moulin Rouge avec Toulouse-Lautrec",
      "Promenade dans les Grands Boulevards illumines au gaz",
      "Degustation gastronomique dans un salon Belle Epoque",
      "Visite guidee de l'Exposition Universelle"
    ],
    included: [
      "Costume d'epoque sur mesure (soie et velours)",
      "Guide temporel francophone certifie",
      "Hebergement dans un hotel haussmannien",
      "Assurance paradoxe temporel premium",
      "Kit de retour securise"
    ]
  },
  {
    id: 'cretace',
    title: 'Cretace -65M',
    era: 'Ere Mesozoique',
    tagline: 'Les derniers jours des dinosaures',
    teaser: "Explorez un monde primitif peuple de creatures colossales, entre forets de fougeres geantes et volcans actifs.",
    price: '18 900',
    duration: '5 jours',
    image: 'https://images.unsplash.com/photo-1736942704923-772bb8987bfb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxwcmVoaXN0b3JpYyUyMGp1bmdsZSUyMGRpbm9zYXVyfGVufDB8fHx8MTc3NTU5Nzg2OXww&ixlib=rb-4.1.0&q=85',
    video: 'https://customer-assets.emergentagent.com/job_21ada7b3-46f7-41af-96e3-2e9f5bcb3690/artifacts/qaqxjbna_CRE%CC%81TACE%CC%81.mp4',
    description: "Remontez 65 millions d'annees pour vivre l'aventure ultime. Observez le Tyrannosaurus Rex dans son habitat naturel, traversez des forets de fougeres geantes et contemplez un ciel teinte d'orange par l'activite volcanique. Une expedition unique aux confins du temps, dans un monde ou la nature regne en maitre absolu.",
    highlights: [
      "Observation securisee du Tyrannosaurus Rex",
      "Safari en vehicule blinde parmi les Triceratops",
      "Vol en drone au-dessus des nids de Pteranodons",
      "Bivouac securise au coeur de la jungle prehistorique",
      "Collecte encadree de fossiles authentiques"
    ],
    included: [
      "Combinaison bio-protectrice anti-predateur",
      "Vehicule d'exploration tout-terrain blinde",
      "Guide paleontologue expert certifie",
      "Rations nutritives adaptees a l'atmosphere",
      "Assurance risque dinosaure renforcee"
    ]
  },
  {
    id: 'florence',
    title: 'Florence 1504',
    era: 'Renaissance',
    tagline: "L'age d'or artistique de Florence",
    teaser: "Marchez dans les pas de Michel-Ange et Leonard de Vinci au coeur de la Renaissance italienne.",
    price: '14 200',
    duration: '6 jours',
    image: 'https://images.unsplash.com/photo-1758522276148-08cb5c3c8021?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxyZW5haXNzYW5jZSUyMHN0dWRpbyUyMHBhaW50aW5nfGVufDB8fHx8MTc3NTU5Nzg2OXww&ixlib=rb-4.1.0&q=85',
    video: 'https://customer-assets.emergentagent.com/job_21ada7b3-46f7-41af-96e3-2e9f5bcb3690/artifacts/csbivq1f_FLORENCE%201504.mp4',
    description: "Plongez dans l'age d'or de la Renaissance florentine. Assistez a la creation du David de Michel-Ange, observez Leonard de Vinci peindre La Joconde et deambulez dans les ateliers des plus grands maitres. Florence en 1504 est un creuset d'art, de science et d'humanisme ou chaque rue recele un chef-d'oeuvre.",
    highlights: [
      "Visite privee de l'atelier de Michel-Ange",
      "Audience avec les Medicis au Palazzo Vecchio",
      "Cours de peinture avec un maitre de la Renaissance",
      "Promenade sur le Ponte Vecchio historique",
      "Degustation de cuisine toscane authentique du XVIe"
    ],
    included: [
      "Costume de noble florentin (velours et brocart)",
      "Guide historien d'art certifie",
      "Hebergement dans un palais Renaissance",
      "Laissez-passer pour toutes les cours et ateliers",
      "Assurance paradoxe temporel premium"
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Quel type d'experience recherchez-vous ?",
    options: [
      { label: 'Culturelle', value: 'culturelle', scores: { paris: 1, cretace: 0, florence: 2 } },
      { label: 'Aventure', value: 'aventure', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Elegance', value: 'elegance', scores: { paris: 2, cretace: 0, florence: 1 } },
    ]
  },
  {
    id: 2,
    question: "Votre periode preferee ?",
    options: [
      { label: 'Histoire moderne', value: 'moderne', scores: { paris: 2, cretace: 0, florence: 1 } },
      { label: 'Temps anciens', value: 'anciens', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Renaissance', value: 'renaissance', scores: { paris: 0, cretace: 0, florence: 2 } },
    ]
  },
  {
    id: 3,
    question: "Vous preferez :",
    options: [
      { label: 'Effervescence urbaine', value: 'urbaine', scores: { paris: 2, cretace: 0, florence: 1 } },
      { label: 'Nature sauvage', value: 'nature', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Art et architecture', value: 'art', scores: { paris: 1, cretace: 0, florence: 2 } },
    ]
  },
  {
    id: 4,
    question: "Votre activite ideale :",
    options: [
      { label: 'Monuments', value: 'monuments', scores: { paris: 2, cretace: 0, florence: 1 } },
      { label: 'Faune', value: 'faune', scores: { paris: 0, cretace: 2, florence: 0 } },
      { label: 'Musees', value: 'musees', scores: { paris: 1, cretace: 0, florence: 2 } },
    ]
  }
];

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1751971309844-cd398ffc540f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxnb2xkZW4lMjBjbG9ja3dvcmslMjBibGFjayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzc1NTk3ODY5fDA&ixlib=rb-4.1.0&q=85';

export const MUSIC_URL = 'https://customer-assets.emergentagent.com/job_21ada7b3-46f7-41af-96e3-2e9f5bcb3690/artifacts/yp1rqw7a_Skyline%20of%20Silk.mp3';
