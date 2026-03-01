export interface PlantData {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  category: string;
  benefits: string[];
  ecologicalBenefits: string[];
  funFact: string;
  color: string;
}

export const plantDatabase: PlantData[] = [
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    emoji: '🌵',
    category: 'Succulent',
    benefits: [
      'Soothes sunburns and skin irritations with its cooling gel',
      'Contains powerful antioxidants that fight free radicals',
      'Supports digestive health and reduces inflammation',
      'Natural moisturizer that hydrates skin without greasiness',
      'Antimicrobial properties help heal minor wounds and cuts',
    ],
    ecologicalBenefits: [
      'Thrives in arid conditions, requiring minimal water',
      'Provides shelter for small insects and pollinators',
    ],
    funFact: 'Aloe vera has been used medicinally for over 6,000 years!',
    color: '#4a7c59',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    emoji: '💜',
    category: 'Herb',
    benefits: [
      'Reduces anxiety and promotes relaxation and better sleep',
      'Natural antiseptic that helps treat minor burns and insect bites',
      'Relieves headaches and migraines when applied topically',
      'Anti-inflammatory properties soothe skin conditions like eczema',
      'Aromatherapy use improves mood and reduces stress hormones',
    ],
    ecologicalBenefits: [
      'Attracts bees, butterflies, and other beneficial pollinators',
      'Drought-resistant plant that helps prevent soil erosion',
    ],
    funFact: 'Lavender was used by ancient Romans to scent their baths!',
    color: '#7c5cbf',
  },
  {
    id: 'mint',
    name: 'Peppermint',
    scientificName: 'Mentha × piperita',
    emoji: '🌿',
    category: 'Herb',
    benefits: [
      'Relieves digestive issues including bloating and indigestion',
      'Natural decongestant that clears nasal passages and sinuses',
      'Menthol provides cooling pain relief for headaches and muscle aches',
      'Antimicrobial properties freshen breath and support oral health',
      'Boosts energy and mental alertness through its invigorating scent',
    ],
    ecologicalBenefits: [
      'Repels pests like aphids and ants naturally',
      'Attracts beneficial insects including hoverflies',
    ],
    funFact: 'Mint can grow so vigorously it is often called an invasive plant!',
    color: '#2d7a4f',
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    emoji: '🌱',
    category: 'Succulent',
    benefits: [
      'Purifies indoor air by removing toxins like formaldehyde and benzene',
      'Releases oxygen at night, making it ideal for bedrooms',
      'Extremely low maintenance, thriving in low light conditions',
      'Reduces airborne allergens and improves indoor air quality',
      'Boosts mental well-being by bringing nature indoors',
    ],
    ecologicalBenefits: [
      'Excellent air purifier that removes multiple indoor pollutants',
      'Drought-tolerant, requiring very little water to survive',
    ],
    funFact: 'NASA studies found snake plants remove up to 87% of air toxins!',
    color: '#3d6b3a',
  },
  {
    id: 'chamomile',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    emoji: '🌼',
    category: 'Flower',
    benefits: [
      'Promotes relaxation and improves sleep quality naturally',
      'Soothes digestive discomfort, cramps, and irritable bowel syndrome',
      'Anti-inflammatory properties reduce skin redness and irritation',
      'Boosts immune system with its antioxidant-rich compounds',
      'Relieves anxiety and mild depression symptoms',
    ],
    ecologicalBenefits: [
      'Attracts beneficial insects including bees and predatory wasps',
      'Improves soil health when used as a companion plant',
    ],
    funFact: 'Chamomile tea has been consumed for over 5,000 years!',
    color: '#c4a832',
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    scientificName: 'Salvia rosmarinus',
    emoji: '🌿',
    category: 'Herb',
    benefits: [
      'Improves memory, concentration, and cognitive performance',
      'Rich in antioxidants that protect against cell damage',
      'Stimulates hair growth and reduces dandruff when applied topically',
      'Anti-inflammatory compounds help relieve muscle pain',
      'Supports digestive health and reduces bloating',
    ],
    ecologicalBenefits: [
      'Attracts pollinators including bees and butterflies',
      'Drought-resistant and helps stabilize soil on slopes',
    ],
    funFact: 'Ancient Greek students wore rosemary garlands to improve memory!',
    color: '#4a6741',
  },
  {
    id: 'basil',
    name: 'Holy Basil',
    scientificName: 'Ocimum tenuiflorum',
    emoji: '🌿',
    category: 'Herb',
    benefits: [
      'Powerful adaptogen that helps the body manage stress',
      'Anti-inflammatory and antibacterial properties fight infections',
      'Regulates blood sugar levels and supports metabolic health',
      'Rich in vitamin K, essential for bone health and blood clotting',
      'Protects against environmental toxins and oxidative stress',
    ],
    ecologicalBenefits: [
      'Repels mosquitoes and other harmful insects naturally',
      'Attracts beneficial pollinators to gardens',
    ],
    funFact: 'Holy Basil is considered sacred in Hindu tradition!',
    color: '#2e6b3e',
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    emoji: '🌱',
    category: 'Houseplant',
    benefits: [
      'Removes carbon monoxide and formaldehyde from indoor air',
      'Safe for pets and children, making it ideal for family homes',
      'Reduces stress and boosts mood through biophilic connection',
      'Increases humidity levels, benefiting respiratory health',
      'Easy to propagate, providing endless green companions',
    ],
    ecologicalBenefits: [
      'Excellent air purifier for indoor environments',
      'Thrives in various conditions, reducing resource consumption',
    ],
    funFact: 'Spider plants can remove up to 95% of toxic agents from the air!',
    color: '#5a8a3a',
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    emoji: '🌾',
    category: 'Spice Plant',
    benefits: [
      'Curcumin is one of the most powerful natural anti-inflammatories',
      'Powerful antioxidant that neutralizes free radicals',
      'Improves brain function and may lower risk of brain diseases',
      'Lowers risk of heart disease by improving endothelial function',
      'Has anti-cancer properties and may prevent cancer cell growth',
    ],
    ecologicalBenefits: [
      'Grows in tropical regions, supporting biodiversity',
      'Natural pest repellent when used in companion planting',
    ],
    funFact: 'Turmeric has been used in Ayurvedic medicine for 4,000 years!',
    color: '#c47a1e',
  },
  {
    id: 'echinacea',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    emoji: '🌸',
    category: 'Wildflower',
    benefits: [
      'Boosts immune system and reduces duration of colds and flu',
      'Anti-inflammatory properties help reduce pain and swelling',
      'Antioxidant-rich compounds protect cells from oxidative damage',
      'May help manage anxiety and improve mental health',
      'Antiviral properties help fight various viral infections',
    ],
    ecologicalBenefits: [
      'Native wildflower that supports local bee populations',
      'Provides seeds for birds during winter months',
    ],
    funFact: 'Native Americans used echinacea as a cure-all for centuries!',
    color: '#b05090',
  },
  {
    id: 'ginger',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    emoji: '🌿',
    category: 'Root Plant',
    benefits: [
      'Highly effective against nausea, including morning sickness',
      'Reduces muscle pain and soreness after exercise',
      'Powerful anti-inflammatory that helps with osteoarthritis',
      'Lowers blood sugar levels and improves heart disease risk factors',
      'Helps fight infections with its antimicrobial properties',
    ],
    ecologicalBenefits: [
      'Grows in tropical understory, supporting forest ecosystems',
      'Attracts hummingbirds and butterflies with its flowers',
    ],
    funFact: 'Ginger has been used as medicine for over 2,000 years in Asia!',
    color: '#a06030',
  },
  {
    id: 'fern',
    name: 'Boston Fern',
    scientificName: 'Nephrolepis exaltata',
    emoji: '🌿',
    category: 'Fern',
    benefits: [
      'Acts as a natural humidifier, adding moisture to dry indoor air',
      'Removes formaldehyde and xylene from indoor environments',
      'Reduces stress and improves psychological well-being',
      'Provides a calming green aesthetic that promotes relaxation',
      'Improves air quality in homes and offices significantly',
    ],
    ecologicalBenefits: [
      'Provides habitat for small animals and insects in forests',
      'Helps prevent soil erosion with its dense root systems',
    ],
    funFact: 'Ferns are among the oldest plants on Earth, dating back 360 million years!',
    color: '#3a7a3a',
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    emoji: '🌻',
    category: 'Flower',
    benefits: [
      'Seeds are rich in vitamin E, a powerful antioxidant',
      'High in healthy fats that support heart health',
      'Contains selenium which supports thyroid function',
      'Rich in magnesium that helps reduce stress and anxiety',
      'Phytosterols in seeds help lower cholesterol levels',
    ],
    ecologicalBenefits: [
      'Major food source for birds, bees, and other wildlife',
      'Can absorb heavy metals from contaminated soil (phytoremediation)',
    ],
    funFact: 'Sunflowers can grow up to 12 feet tall and track the sun!',
    color: '#d4a020',
  },
  {
    id: 'neem',
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    emoji: '🌳',
    category: 'Tree',
    benefits: [
      'Powerful antibacterial and antifungal properties for skin health',
      'Natural blood purifier that supports liver function',
      'Treats dental problems including gum disease and cavities',
      'Boosts immune system with its immunomodulatory compounds',
      'Anti-inflammatory properties help with arthritis and joint pain',
    ],
    ecologicalBenefits: [
      'Natural pesticide that protects crops without harming beneficial insects',
      'Provides shade and reduces urban heat island effect',
    ],
    funFact: 'Neem is called the "village pharmacy" in India!',
    color: '#2d5a1e',
  },
  {
    id: 'lemon-balm',
    name: 'Lemon Balm',
    scientificName: 'Melissa officinalis',
    emoji: '🍋',
    category: 'Herb',
    benefits: [
      'Reduces anxiety and promotes a calm, relaxed state of mind',
      'Improves sleep quality and helps with insomnia',
      'Antiviral properties help fight cold sores and herpes virus',
      'Improves cognitive function and memory recall',
      'Soothes digestive issues including bloating and cramps',
    ],
    ecologicalBenefits: [
      'Highly attractive to bees, supporting pollinator populations',
      'Easy to grow and provides ground cover to prevent weeds',
    ],
    funFact: 'Lemon balm has been used for over 2,000 years to reduce stress!',
    color: '#7a9a2a',
  },
];

export function getRandomPlant(): PlantData {
  const randomIndex = Math.floor(Math.random() * plantDatabase.length);
  return plantDatabase[randomIndex];
}

export function getPlantById(id: string): PlantData | undefined {
  return plantDatabase.find((p) => p.id === id);
}
