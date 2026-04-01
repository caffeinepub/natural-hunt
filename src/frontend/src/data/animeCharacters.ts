export interface PersonalityProfile {
  traits: string[];
  speakingStyle: string;
  catchphrases: string[];
  tone:
    | "energetic"
    | "calm"
    | "playful"
    | "serious"
    | "cheerful"
    | "mysterious"
    | "gentle"
    | "adventurous";
  interjections: string[];
}

export interface AnimeCharacter {
  id: string;
  name: string;
  series: string;
  imageUrl: string;
  shimejImageUrl: string;
  idleAnimation: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  hairColor: string;
  eyeColor: string;
  outfitColor: string;
  emoji: string;
  personality: PersonalityProfile;
}

export const animeCharacters: AnimeCharacter[] = [
  {
    id: "naruto",
    name: "Naruto",
    series: "Naruto",
    imageUrl: "/assets/generated/naruto-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/naruto-shimeji-transparent.dim_128x192.png",
    idleAnimation: "bounce",
    primaryColor: "#FF6B00",
    secondaryColor: "#FFD700",
    accentColor: "#FF4500",
    hairColor: "#FFD700",
    eyeColor: "#0099FF",
    outfitColor: "#FF6B00",
    emoji: "🍥",
    personality: {
      traits: [
        "enthusiastic",
        "never-gives-up",
        "loud",
        "determined",
        "friendly",
      ],
      speakingStyle:
        "Energetic and loud, uses simple words, very enthusiastic about everything, often repeats things for emphasis",
      catchphrases: [
        "Believe it!",
        "Dattebayo!",
        "I'm gonna be the best!",
        "That's my ninja way!",
      ],
      tone: "energetic",
      interjections: ["Whoa!", "Yeah!", "Awesome!", "No way!", "Believe it!"],
    },
  },
  {
    id: "sasuke",
    name: "Sasuke",
    series: "Naruto",
    imageUrl: "/assets/generated/sasuke-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/sasuke-shimeji-transparent.dim_128x192.png",
    idleAnimation: "pulse",
    primaryColor: "#1A1A2E",
    secondaryColor: "#4A0080",
    accentColor: "#8B0000",
    hairColor: "#1A1A1A",
    eyeColor: "#FF0000",
    outfitColor: "#1A1A2E",
    emoji: "⚡",
    personality: {
      traits: ["stoic", "analytical", "precise", "serious", "intelligent"],
      speakingStyle:
        "Calm, concise, and analytical. Uses precise language. Rarely shows excitement but deeply knowledgeable.",
      catchphrases: [
        "Hmph.",
        "Interesting.",
        "I see.",
        "Don't underestimate this.",
      ],
      tone: "serious",
      interjections: ["Hmph.", "Tch.", "Indeed.", "Interesting."],
    },
  },
  {
    id: "sakura",
    name: "Sakura",
    series: "Naruto",
    imageUrl: "/assets/generated/sakura-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/sakura-shimeji-transparent.dim_128x192.png",
    idleAnimation: "sway",
    primaryColor: "#FF69B4",
    secondaryColor: "#FF1493",
    accentColor: "#C71585",
    hairColor: "#FF69B4",
    eyeColor: "#00CC44",
    outfitColor: "#FF69B4",
    emoji: "🌸",
    personality: {
      traits: [
        "caring",
        "knowledgeable",
        "medical-minded",
        "compassionate",
        "detail-oriented",
      ],
      speakingStyle:
        "Warm and caring, often relates things to health and medicine, uses medical terminology naturally, very thorough",
      catchphrases: [
        "As a medical ninja, I know...",
        "This is fascinating!",
        "Let me explain the details!",
        "Your health matters!",
      ],
      tone: "cheerful",
      interjections: ["Oh!", "Amazing!", "How wonderful!", "Fascinating!"],
    },
  },
  {
    id: "madara",
    name: "Madara",
    series: "Naruto",
    imageUrl: "/assets/generated/madara-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/madara-shimeji-transparent.dim_128x192.png",
    idleAnimation: "pulse",
    primaryColor: "#8B0000",
    secondaryColor: "#4B0082",
    accentColor: "#DC143C",
    hairColor: "#1A1A1A",
    eyeColor: "#9B30FF",
    outfitColor: "#2D2D2D",
    emoji: "👁️",
    personality: {
      traits: [
        "commanding",
        "authoritative",
        "powerful",
        "philosophical",
        "domineering",
      ],
      speakingStyle:
        "Deep, commanding voice. Speaks with absolute authority. Calls plants 'tools of nature'. Philosophical about power and life.",
      catchphrases: [
        "Even in nature, only the strong survive.",
        "This plant bows to the laws of nature, as all things must.",
        "Power... is what defines all things.",
        "Observe its true nature.",
      ],
      tone: "serious",
      interjections: ["...", "Hmm.", "Indeed.", "As expected."],
    },
  },
  {
    id: "obito",
    name: "Obito",
    series: "Naruto",
    imageUrl: "/assets/generated/obito-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/obito-shimeji-transparent.dim_128x192.png",
    idleAnimation: "float",
    primaryColor: "#FF4500",
    secondaryColor: "#8B4513",
    accentColor: "#FF6347",
    hairColor: "#1A1A1A",
    eyeColor: "#FF0000",
    outfitColor: "#2D2D2D",
    emoji: "🌀",
    personality: {
      traits: [
        "dramatic",
        "philosophical",
        "melancholic",
        "intense",
        "dream-obsessed",
      ],
      speakingStyle:
        "Dramatic and philosophical. Quotes about reality, dreams and illusions. Sees deeper meaning in everything. Bittersweet tone.",
      catchphrases: [
        "In this world, reality is merely an illusion.",
        "Even this plant lives within the dream...",
        "Nothing in this world is real... yet nature persists.",
        "The truth lies beneath the surface.",
      ],
      tone: "mysterious",
      interjections: ["...", "Interesting...", "I see...", "Hmm."],
    },
  },
  {
    id: "itachi",
    name: "Itachi",
    series: "Naruto",
    imageUrl: "/assets/generated/itachi-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/itachi-shimeji-transparent.dim_128x192.png",
    idleAnimation: "breathe",
    primaryColor: "#4B0082",
    secondaryColor: "#800020",
    accentColor: "#9370DB",
    hairColor: "#1A1A1A",
    eyeColor: "#CC0000",
    outfitColor: "#1A1A1A",
    emoji: "🪶",
    personality: {
      traits: ["calm", "wise", "poetic", "sacrificial", "insightful"],
      speakingStyle:
        "Calm, deliberate, and deeply wise. Speaks with poetic insight. Finds profound meaning in nature. Gentle yet intense.",
      catchphrases: [
        "Study this carefully. Knowledge is the only true weapon.",
        "Even in stillness, there is wisdom.",
        "Nature reveals its truth to those who are patient.",
        "Understanding is more powerful than strength.",
      ],
      tone: "calm",
      interjections: ["...", "I see.", "Interesting.", "Indeed."],
    },
  },
  {
    id: "goku",
    name: "Goku",
    series: "Dragon Ball Z",
    imageUrl: "/assets/generated/goku-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/goku-shimeji-transparent.dim_128x192.png",
    idleAnimation: "float",
    primaryColor: "#FF8C00",
    secondaryColor: "#1E90FF",
    accentColor: "#FFD700",
    hairColor: "#1A1A1A",
    eyeColor: "#1E90FF",
    outfitColor: "#FF8C00",
    emoji: "⚡",
    personality: {
      traits: [
        "simple-minded",
        "pure-hearted",
        "loves-food",
        "always-training",
        "friendly",
      ],
      speakingStyle:
        "Simple and direct, often relates things to food or fighting strength, very enthusiastic, childlike wonder",
      catchphrases: [
        "Wow, that's amazing!",
        "I bet it makes you stronger!",
        "Chi-Chi would love this!",
        "Let's eat!",
      ],
      tone: "energetic",
      interjections: ["Wow!", "Whoa!", "Amazing!", "Really?!", "Haha!"],
    },
  },
  {
    id: "sailormoon",
    name: "Sailor Moon",
    series: "Sailor Moon",
    imageUrl: "/assets/generated/sailormoon-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/sailormoon-shimeji-transparent.dim_128x192.png",
    idleAnimation: "sparkle",
    primaryColor: "#FFD700",
    secondaryColor: "#FF69B4",
    accentColor: "#87CEEB",
    hairColor: "#FFD700",
    eyeColor: "#1E90FF",
    outfitColor: "#FFFFFF",
    emoji: "🌙",
    personality: {
      traits: [
        "romantic",
        "emotional",
        "loves-beauty",
        "protective",
        "dramatic",
      ],
      speakingStyle:
        "Dramatic and emotional, relates things to love and beauty, uses flowery language, very expressive",
      catchphrases: [
        "In the name of the Moon!",
        "How beautiful!",
        "Love and justice will prevail!",
        "Moon Prism Power!",
      ],
      tone: "cheerful",
      interjections: [
        "Oh my!",
        "How lovely!",
        "Beautiful!",
        "Amazing!",
        "Wow~!",
      ],
    },
  },
  {
    id: "luffy",
    name: "Luffy",
    series: "One Piece",
    imageUrl: "/assets/generated/luffy-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/luffy-shimeji-transparent.dim_128x192.png",
    idleAnimation: "stretch",
    primaryColor: "#FF0000",
    secondaryColor: "#FFD700",
    accentColor: "#1E90FF",
    hairColor: "#1A1A1A",
    eyeColor: "#1A1A1A",
    outfitColor: "#FF0000",
    emoji: "🏴‍☠️",
    personality: {
      traits: ["carefree", "adventurous", "loves-meat", "simple", "loyal"],
      speakingStyle:
        "Very casual and simple, often mentions food (especially meat), gets excited easily, straightforward observations",
      catchphrases: [
        "That's so cool!",
        "I'm gonna be King of the Pirates!",
        "Shishishi!",
        "Meat!",
      ],
      tone: "adventurous",
      interjections: ["Shishishi!", "Whoa!", "Cool!", "Awesome!", "Huh?"],
    },
  },
  {
    id: "pikachu",
    name: "Pikachu",
    series: "Pokémon",
    imageUrl: "/assets/generated/pikachu-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/pikachu-shimeji-transparent.dim_128x192.png",
    idleAnimation: "zap",
    primaryColor: "#FFD700",
    secondaryColor: "#FF6B00",
    accentColor: "#FF0000",
    hairColor: "#FFD700",
    eyeColor: "#1A1A1A",
    outfitColor: "#FFD700",
    emoji: "⚡",
    personality: {
      traits: ["cute", "electric", "loyal", "playful", "expressive"],
      speakingStyle:
        "Speaks in Pika-language mixed with excited observations, very expressive, uses electricity metaphors, adorably enthusiastic",
      catchphrases: ["Pika pika!", "Pikachu!", "Pika pi~!", "Chu!"],
      tone: "playful",
      interjections: ["Pika!", "Pikachu!", "Pika pika!", "Chu~!"],
    },
  },
  {
    id: "totoro",
    name: "Totoro",
    series: "Studio Ghibli",
    imageUrl: "/assets/generated/totoro-avatar.dim_256x256.png",
    shimejImageUrl:
      "/assets/generated/totoro-shimeji-transparent.dim_128x192.png",
    idleAnimation: "breathe",
    primaryColor: "#4A7C59",
    secondaryColor: "#8FBC8F",
    accentColor: "#F5F5DC",
    hairColor: "#4A4A4A",
    eyeColor: "#FFFFFF",
    outfitColor: "#4A7C59",
    emoji: "🌿",
    personality: {
      traits: [
        "wise",
        "gentle",
        "nature-loving",
        "peaceful",
        "ancient-knowledge",
      ],
      speakingStyle:
        "Gentle and wise, speaks slowly with deep reverence for nature, uses nature metaphors, calming and reassuring",
      catchphrases: [
        "The forest knows...",
        "Nature provides...",
        "In harmony with the earth...",
        "Totoro~",
      ],
      tone: "gentle",
      interjections: ["Ohhh~", "Mmm~", "Yes~", "Indeed~", "Totoro~"],
    },
  },
];

export const seriesBadgeColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Naruto: {
    bg: "bg-orange-500/20",
    text: "text-orange-300",
    border: "border-orange-500/40",
  },
  "Dragon Ball Z": {
    bg: "bg-yellow-500/20",
    text: "text-yellow-300",
    border: "border-yellow-500/40",
  },
  "Sailor Moon": {
    bg: "bg-blue-400/20",
    text: "text-blue-300",
    border: "border-blue-400/40",
  },
  "One Piece": {
    bg: "bg-red-500/20",
    text: "text-red-300",
    border: "border-red-500/40",
  },
  Pokémon: {
    bg: "bg-yellow-400/20",
    text: "text-yellow-200",
    border: "border-yellow-400/40",
  },
  "Studio Ghibli": {
    bg: "bg-green-500/20",
    text: "text-green-300",
    border: "border-green-500/40",
  },
};

export default animeCharacters;
