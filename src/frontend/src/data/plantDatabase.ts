export interface PlantData {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  category: string;
  healthBenefits: string[];
  ecologicalBenefits: string[];
  funFact: string;
  accentColor: string;
  warnings: string[];
  medicalUses: string[];
}

export const plantDatabase: PlantData[] = [
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    emoji: "🌵",
    category: "Succulent",
    healthBenefits: [
      "Soothes sunburns and skin irritations",
      "Rich in antioxidants and vitamins",
      "Supports digestive health",
      "Boosts immune system",
    ],
    ecologicalBenefits: [
      "Drought-resistant, conserves water",
      "Improves air quality indoors",
      "Provides habitat for pollinators",
    ],
    funFact:
      "Aloe vera has been used medicinally for over 6,000 years, dating back to ancient Egypt.",
    accentColor: "#4ade80",
    warnings: [
      "Oral consumption of aloe latex can cause severe diarrhea and cramping",
      "May interact with diabetes medications and diuretics",
      "Not recommended during pregnancy as it may stimulate uterine contractions",
      "Can cause allergic reactions in some individuals with latex sensitivity",
    ],
    medicalUses: [
      "Topical treatment for burns, wounds, and skin conditions like psoriasis",
      "Used in traditional medicine to treat constipation (aloe latex)",
      "Applied to reduce inflammation and promote wound healing",
      "Incorporated in dental products to treat gum disease and mouth ulcers",
      "Used in eye drops to relieve dry eyes",
    ],
  },
  {
    id: "lavender",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    emoji: "💜",
    category: "Herb",
    healthBenefits: [
      "Reduces anxiety and stress",
      "Promotes better sleep quality",
      "Has antimicrobial properties",
      "Relieves headaches naturally",
    ],
    ecologicalBenefits: [
      "Attracts bees and butterflies",
      "Repels mosquitoes and moths naturally",
      "Drought-tolerant once established",
    ],
    funFact:
      "Lavender was used by the Romans to scent their baths, beds, and clothes.",
    accentColor: "#a78bfa",
    warnings: [
      "May cause skin irritation or allergic reactions when applied undiluted",
      "Can interact with sedative medications, enhancing their effects",
      "Not recommended for young boys as it may disrupt hormone balance",
      "Excessive internal use can cause nausea and headaches",
    ],
    medicalUses: [
      "Aromatherapy for anxiety, depression, and insomnia treatment",
      "Topical application for minor burns, insect bites, and skin irritations",
      "Used in massage therapy to relieve muscle tension and pain",
      "Incorporated in treatments for alopecia areata (hair loss)",
      "Applied as antiseptic for minor wounds and cuts",
    ],
  },
  {
    id: "mint",
    name: "Peppermint",
    scientificName: "Mentha × piperita",
    emoji: "🌿",
    category: "Herb",
    healthBenefits: [
      "Relieves digestive issues and IBS",
      "Freshens breath naturally",
      "Provides cooling sensation for headaches",
      "Contains menthol with decongestant properties",
    ],
    ecologicalBenefits: [
      "Repels pests like aphids and ants",
      "Attracts beneficial insects",
      "Fast-growing ground cover",
    ],
    funFact:
      "Peppermint is a natural hybrid of watermint and spearmint, first described in 1753.",
    accentColor: "#34d399",
    warnings: [
      "Can worsen acid reflux and GERD symptoms",
      "Peppermint oil should never be applied near the face of infants or young children",
      "May interact with cyclosporine and certain medications",
      "Excessive consumption can cause heartburn and mouth sores",
    ],
    medicalUses: [
      "Treatment of irritable bowel syndrome (IBS) with enteric-coated capsules",
      "Topical application for tension headaches and migraines",
      "Used as a decongestant for colds and respiratory infections",
      "Applied to relieve muscle and nerve pain",
      "Used in dental care products for antimicrobial properties",
    ],
  },
  {
    id: "basil",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    emoji: "🌱",
    category: "Herb",
    healthBenefits: [
      "Rich in vitamin K and antioxidants",
      "Has anti-inflammatory properties",
      "Supports cardiovascular health",
      "Contains antibacterial compounds",
    ],
    ecologicalBenefits: [
      "Repels flies and mosquitoes",
      "Companion plant that improves tomato growth",
      "Attracts pollinators when flowering",
    ],
    funFact:
      'In ancient Greece, basil was considered the "king of herbs" — the word basil comes from the Greek word for king.',
    accentColor: "#86efac",
    warnings: [
      "High doses may slow blood clotting — avoid before surgery",
      "Contains estragole, which may be carcinogenic in very large amounts",
      "May lower blood sugar levels, requiring monitoring in diabetics",
      "Can cause allergic reactions in people sensitive to the Lamiaceae family",
    ],
    medicalUses: [
      "Used in Ayurvedic medicine to treat stress, asthma, and diabetes",
      "Applied as an adaptogen to help the body cope with stress",
      "Used to treat digestive disorders and stomach spasms",
      "Applied topically for skin infections and acne",
      "Used in traditional medicine for fever reduction",
    ],
  },
  {
    id: "rosemary",
    name: "Rosemary",
    scientificName: "Salvia rosmarinus",
    emoji: "🌿",
    category: "Herb",
    healthBenefits: [
      "Improves memory and concentration",
      "Rich in antioxidants and anti-inflammatory compounds",
      "Supports hair growth",
      "Boosts immune system",
    ],
    ecologicalBenefits: [
      "Drought-resistant Mediterranean plant",
      "Attracts bees and butterflies",
      "Repels certain garden pests",
    ],
    funFact:
      "Ancient Greek students wore rosemary garlands while studying, believing it improved memory.",
    accentColor: "#6ee7b7",
    warnings: [
      "High doses can cause seizures in susceptible individuals",
      "May increase blood pressure — avoid with hypertension",
      "Can interact with blood thinners and ACE inhibitors",
      "Not safe in medicinal amounts during pregnancy",
    ],
    medicalUses: [
      "Used to improve cognitive function and memory in clinical studies",
      "Applied topically to stimulate hair growth and treat alopecia",
      "Used as an antimicrobial agent in food preservation",
      "Applied for pain relief in muscle and joint conditions",
      "Used in aromatherapy to reduce stress and improve mood",
    ],
  },
  {
    id: "chamomile",
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    emoji: "🌼",
    category: "Flower",
    healthBenefits: [
      "Promotes relaxation and sleep",
      "Soothes digestive discomfort",
      "Has anti-inflammatory properties",
      "Supports skin health",
    ],
    ecologicalBenefits: [
      "Attracts beneficial insects",
      "Improves soil health as a companion plant",
      "Supports biodiversity in gardens",
    ],
    funFact:
      "Chamomile tea is one of the most widely consumed herbal teas in the world, with over 1 million cups drunk daily.",
    accentColor: "#fde68a",
    warnings: [
      "Can cause severe allergic reactions in people allergic to ragweed, chrysanthemums, or daisies",
      "May interact with blood thinners like warfarin",
      "Can cause drowsiness — avoid before driving",
      "Not recommended in large amounts during pregnancy",
    ],
    medicalUses: [
      "Used to treat insomnia and anxiety as a mild sedative",
      "Applied topically for eczema, wounds, and skin inflammation",
      "Used to treat gastrointestinal disorders including colic and indigestion",
      "Used as an anti-inflammatory mouthwash for oral mucositis",
      "Applied in eye washes for conjunctivitis and eye irritation",
    ],
  },
  {
    id: "turmeric",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    emoji: "🟡",
    category: "Spice",
    healthBenefits: [
      "Powerful anti-inflammatory effects",
      "Strong antioxidant properties",
      "May improve brain function",
      "Supports joint health",
    ],
    ecologicalBenefits: [
      "Natural pest deterrent in gardens",
      "Improves soil microbiome",
      "Supports tropical biodiversity",
    ],
    funFact:
      "Turmeric has been used in India for over 4,000 years as both a spice and medicinal herb.",
    accentColor: "#fbbf24",
    warnings: [
      "High doses can cause digestive issues including nausea and diarrhea",
      "May interact with blood thinners and diabetes medications",
      "Can cause gallbladder problems in people with gallstones",
      "May slow blood clotting — avoid before surgery",
    ],
    medicalUses: [
      "Used to treat osteoarthritis and rheumatoid arthritis inflammation",
      "Applied in treatment of metabolic syndrome and diabetes management",
      "Used in Ayurvedic medicine for liver disorders and jaundice",
      "Applied topically for wound healing and skin conditions",
      "Studied for potential anti-cancer properties in clinical trials",
    ],
  },
  {
    id: "ginger",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    emoji: "🫚",
    category: "Root",
    healthBenefits: [
      "Relieves nausea and morning sickness",
      "Reduces muscle pain and soreness",
      "Has powerful anti-inflammatory effects",
      "Supports digestive health",
    ],
    ecologicalBenefits: [
      "Grows well in tropical understory",
      "Supports soil health",
      "Provides habitat for small insects",
    ],
    funFact:
      "Ginger has been used as medicine in Asia for at least 2,000 years and was one of the first spices exported from Asia.",
    accentColor: "#d97706",
    warnings: [
      "May interact with blood thinners and increase bleeding risk",
      "Can cause heartburn and digestive discomfort in high doses",
      "May lower blood sugar — monitor carefully if diabetic",
      "Avoid high doses during pregnancy beyond culinary amounts",
    ],
    medicalUses: [
      "Clinically proven treatment for nausea from chemotherapy and surgery",
      "Used to treat morning sickness during pregnancy",
      "Applied for osteoarthritis pain relief",
      "Used to treat functional dyspepsia and digestive disorders",
      "Applied as anti-inflammatory treatment for muscle soreness",
    ],
  },
  {
    id: "echinacea",
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    emoji: "🌸",
    category: "Flower",
    healthBenefits: [
      "Boosts immune system function",
      "Reduces duration of common cold",
      "Has antiviral properties",
      "Supports respiratory health",
    ],
    ecologicalBenefits: [
      "Native prairie plant supporting biodiversity",
      "Attracts butterflies and bees",
      "Drought-tolerant once established",
    ],
    funFact:
      "Native Americans used echinacea for more ailments than any other plant, including toothaches and snake bites.",
    accentColor: "#f472b6",
    warnings: [
      "Not recommended for people with autoimmune diseases like lupus or MS",
      "May cause allergic reactions in people sensitive to daisy family plants",
      "Should not be used continuously for more than 8 weeks",
      "May interact with immunosuppressant medications",
    ],
    medicalUses: [
      "Used to prevent and treat upper respiratory infections and common cold",
      "Applied to boost immune response during illness",
      "Used topically for wound healing and skin infections",
      "Applied in treatment of urinary tract infections",
      "Used in integrative oncology to support immune function during chemotherapy",
    ],
  },
  {
    id: "dandelion",
    name: "Dandelion",
    scientificName: "Taraxacum officinale",
    emoji: "🌻",
    category: "Wildflower",
    healthBenefits: [
      "Rich in vitamins A, C, and K",
      "Supports liver health and detoxification",
      "Natural diuretic properties",
      "Contains powerful antioxidants",
    ],
    ecologicalBenefits: [
      "One of the first spring flowers for pollinators",
      "Deep taproot aerates compacted soil",
      "Supports over 100 insect species",
    ],
    funFact:
      "Every part of the dandelion is edible — roots, leaves, and flowers — and it has been used as food and medicine for centuries.",
    accentColor: "#facc15",
    warnings: [
      "May cause allergic reactions in people sensitive to related plants",
      "Can interact with diuretics and lithium medications",
      "May affect absorption of certain antibiotics",
      "Avoid if you have bile duct obstruction or gallbladder issues",
    ],
    medicalUses: [
      "Used as a diuretic to treat water retention and urinary disorders",
      "Applied to support liver function and bile production",
      "Used to treat digestive disorders and constipation",
      "Applied as a prebiotic to support gut microbiome health",
      "Used in traditional medicine for diabetes management",
    ],
  },
  {
    id: "sage",
    name: "Sage",
    scientificName: "Salvia officinalis",
    emoji: "🌿",
    category: "Herb",
    healthBenefits: [
      "Improves memory and brain function",
      "Has antimicrobial properties",
      "Supports menopausal symptom relief",
      "Rich in antioxidants",
    ],
    ecologicalBenefits: [
      "Drought-tolerant Mediterranean herb",
      "Attracts bees and hummingbirds",
      "Repels certain garden pests",
    ],
    funFact:
      'The Latin name Salvia comes from "salvere" meaning "to save" — reflecting its long history as a healing herb.',
    accentColor: "#a3e635",
    warnings: [
      "Contains thujone which can be toxic in large amounts",
      "Not safe during pregnancy — can stimulate uterine contractions",
      "May lower blood sugar — monitor if diabetic",
      "Can interact with anticonvulsant and sedative medications",
    ],
    medicalUses: [
      "Used to treat hot flashes and night sweats in menopause",
      "Applied as antimicrobial mouthwash for sore throats and gum disease",
      "Used to improve cognitive function in Alzheimer's disease studies",
      "Applied to reduce excessive sweating (hyperhidrosis)",
      "Used in traditional medicine for digestive disorders",
    ],
  },
  {
    id: "thyme",
    name: "Thyme",
    scientificName: "Thymus vulgaris",
    emoji: "🌱",
    category: "Herb",
    healthBenefits: [
      "Powerful antimicrobial and antifungal properties",
      "Supports respiratory health",
      "Rich in vitamin C and antioxidants",
      "Helps relieve coughs and bronchitis",
    ],
    ecologicalBenefits: [
      "Excellent ground cover preventing soil erosion",
      "Major nectar source for bees",
      "Drought-tolerant and low maintenance",
    ],
    funFact:
      "Ancient Egyptians used thyme in embalming, and ancient Greeks burned it as incense in temples.",
    accentColor: "#84cc16",
    warnings: [
      "May cause allergic reactions in people sensitive to Lamiaceae family",
      "High doses can interfere with thyroid function",
      "May interact with blood thinners",
      "Not recommended in medicinal doses during pregnancy",
    ],
    medicalUses: [
      "Used to treat bronchitis, coughs, and upper respiratory infections",
      "Applied as antimicrobial agent for oral health and throat infections",
      "Used to treat intestinal parasites and digestive disorders",
      "Applied topically for fungal infections like athlete's foot",
      "Used in aromatherapy for respiratory conditions",
    ],
  },
  {
    id: "fern",
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    emoji: "🌿",
    category: "Fern",
    healthBenefits: [
      "Excellent air purifier removing toxins",
      "Increases indoor humidity naturally",
      "Reduces stress and improves mood",
      "Removes formaldehyde from air",
    ],
    ecologicalBenefits: [
      "Provides habitat for small animals",
      "Prevents soil erosion in forests",
      "Supports forest floor biodiversity",
    ],
    funFact:
      "Boston ferns are one of NASA's top-rated air-purifying plants, removing more pollutants than almost any other houseplant.",
    accentColor: "#22c55e",
    warnings: [
      "Non-toxic to humans but can cause mild stomach upset if ingested",
      "Can cause skin irritation in sensitive individuals",
      "Spores may trigger respiratory issues in people with allergies",
      "Overwatering can lead to mold growth which may cause respiratory problems",
    ],
    medicalUses: [
      "Used in traditional medicine for rheumatism and joint pain relief",
      "Applied in folk medicine for kidney and bladder disorders",
      "Used as air purifier in therapeutic environments to reduce VOCs",
      "Applied in traditional medicine for fever and headache treatment",
      "Used in some cultures for wound healing and skin conditions",
    ],
  },
  {
    id: "sunflower",
    name: "Sunflower",
    scientificName: "Helianthus annuus",
    emoji: "🌻",
    category: "Flower",
    healthBenefits: [
      "Seeds rich in vitamin E and healthy fats",
      "Supports heart health",
      "Contains selenium and magnesium",
      "Anti-inflammatory properties",
    ],
    ecologicalBenefits: [
      "Major food source for birds and insects",
      "Phytoremediation — removes toxins from soil",
      "Supports biodiversity as a native plant",
    ],
    funFact:
      "Sunflowers can grow up to 12 feet tall and their heads track the sun — a phenomenon called heliotropism.",
    accentColor: "#eab308",
    warnings: [
      "Seeds are high in calories — overconsumption can lead to weight gain",
      "May cause allergic reactions in people with ragweed allergies",
      "Sunflower oil can cause contact dermatitis in sensitive individuals",
      "High in omega-6 fatty acids which can promote inflammation if overconsumed",
    ],
    medicalUses: [
      "Sunflower oil used in skin care for moisturizing and wound healing",
      "Seeds used to support cardiovascular health and lower cholesterol",
      "Used in traditional medicine for respiratory infections and coughs",
      "Applied in folk medicine for kidney and urinary tract health",
      "Used as a source of linoleic acid for skin barrier repair",
    ],
  },
  {
    id: "oak",
    name: "Oak Tree",
    scientificName: "Quercus robur",
    emoji: "🌳",
    category: "Tree",
    healthBenefits: [
      "Bark has astringent and anti-inflammatory properties",
      "Acorns are nutritious food source",
      "Provides mental health benefits through nature exposure",
      "Supports respiratory health through oxygen production",
    ],
    ecologicalBenefits: [
      "Supports over 500 species of insects",
      "Provides habitat for birds and mammals",
      "Sequesters significant amounts of carbon",
    ],
    funFact:
      "A single oak tree can support more life than almost any other native tree species, hosting hundreds of species of insects, birds, and mammals.",
    accentColor: "#92400e",
    warnings: [
      "Raw acorns contain tannins that are toxic — must be processed before eating",
      "Oak pollen is a major allergen causing hay fever",
      "Bark preparations can be toxic in high doses",
      "May interact with iron absorption when consumed in large amounts",
    ],
    medicalUses: [
      "Oak bark used to treat diarrhea and gastrointestinal disorders",
      "Applied topically for hemorrhoids, skin inflammation, and wounds",
      "Used as astringent gargle for sore throats and mouth inflammation",
      "Applied in traditional medicine for fever and malaria treatment",
      "Used in dermatology for eczema and weeping skin conditions",
    ],
  },
];
