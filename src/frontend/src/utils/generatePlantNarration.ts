import type { AnimeCharacter } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";

export interface SessionInteraction {
  plantName: string;
  timestamp: number;
  topics: string[];
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePlantNarration(
  plant: PlantData,
  character: AnimeCharacter,
  sessionInteractions?: SessionInteraction[],
): string {
  const { personality } = character;
  const catchphrase = pickRandom(personality.catchphrases);
  const interjection = pickRandom(personality.interjections);
  const benefit =
    plant.healthBenefits?.[0] ||
    plant.ecologicalBenefits?.[0] ||
    "amazing properties";
  const funFact = plant.funFact || "it has been used for centuries";
  const medicalUse = plant.medicalUses?.[0] || benefit;
  const warning = plant.warnings?.[0] || "use with care";

  let narration = "";

  switch (character.id) {
    case "naruto":
      narration = `${catchphrase} This is ${plant.name}, dattebayo! It's a ${plant.category} plant and believe it — it's incredible! ${interjection} Did you know it can help with ${medicalUse}? That's like having a secret jutsu for your health! And here's something awesome — ${funFact}! My ninja way says we should respect all living things, especially ones this amazing!`;
      break;

    case "sasuke":
      narration = `${catchphrase} ${plant.name}. A ${plant.category} specimen. Analysis: ${medicalUse}. ${funFact}. Its properties are... noteworthy. A shinobi who understands nature has a significant advantage. Don't underestimate what this plant can do.`;
      break;

    case "sakura":
      narration = `${interjection} This is ${plant.name}! As someone with medical training, I find this absolutely fascinating! It belongs to the ${plant.category} family and has remarkable healing properties. It can help with ${medicalUse}. ${funFact}! From a medical perspective, plants like this are invaluable. Your health is so important — nature gives us such wonderful gifts!`;
      break;

    case "madara":
      narration = `...${plant.name}. A ${plant.category} — a mere tool of nature, yet one that holds considerable power. ${funFact}. Its primary value lies in ${medicalUse}. However, remember this: ${warning}. Even in nature, only those who understand true power can wield it without consequence. Study it thoroughly. Power without knowledge is... worthless.`;
      break;

    case "obito":
      narration = `Even this plant... ${plant.name}... lives and dies as part of an infinite dream. ${interjection} It is a ${plant.category}, existing in what you call reality. ${funFact}. It offers ${medicalUse} — yet nothing in this world comes without cost. ${warning}. The truth of all things, even plants, lies beneath the surface. I have seen enough of this world to know... nature's dreams are more honest than human ones.`;
      break;

    case "itachi":
      narration = `Study this plant carefully. ${plant.name}. Knowledge is the only true weapon. It is a ${plant.category} — ${funFact}. It possesses the ability to ${medicalUse}. Yet wisdom demands we also understand its limits: ${warning}. Nature, like the shinobi world, rewards patience and understanding. Those who rush past what they do not comprehend... will miss what matters most.`;
      break;

    case "goku":
      narration = `${interjection} Wow, this is ${plant.name}! It's a ${plant.category} plant and it's so cool! I bet it helps with ${medicalUse} — that probably makes you way stronger! ${funFact}! Chi-Chi would definitely want me to learn about this. Maybe it tastes good too? Haha! Everything in nature has power if you know how to use it!`;
      break;

    case "sailormoon":
      narration = `${interjection} How beautiful! This is ${plant.name}, a lovely ${plant.category} plant! In the name of the Moon, I declare that nature's beauty is truly magical! It can help with ${medicalUse} — love and healing go hand in hand! ${funFact}! Just like how love conquers all, this plant conquers ailments with grace and beauty!`;
      break;

    case "luffy":
      narration = `${interjection} Whoa, this is ${plant.name}! Shishishi! It's a ${plant.category} plant and that's so cool! It can do ${medicalUse}?! That's amazing! ${funFact}! I wonder if you can eat it... Anyway, on my adventure to be King of the Pirates, I've learned that nature is full of incredible things! This is one of them!`;
      break;

    case "pikachu":
      narration = `Pika pika! ${interjection} This is ${plant.name}! Pikachu is so excited! It's a ${plant.category} plant — pika pi! It can help with ${medicalUse}! Chu~ ${funFact}! Pika pika! Nature is full of electric surprises, just like me! This plant is super effective! Pikachu approves! Pika~!`;
      break;

    case "totoro":
      narration = `Ohhh~ This is ${plant.name}. The forest knows this one well. It is a ${plant.category} plant, ancient and wise. ${funFact}. It offers ${medicalUse} to those who seek it. Mmm~ The earth provides everything we need, if only we listen. This plant has been a friend to the forest for a very long time. Totoro~`;
      break;

    default:
      narration = `${interjection} This is ${plant.name}! It's a ${plant.category} plant with amazing properties. It can help with ${medicalUse}. ${funFact}! ${catchphrase}`;
  }

  // Add cross-plant contextual remark if session has prior scans
  if (sessionInteractions && sessionInteractions.length > 0) {
    const previousPlants = sessionInteractions.filter(
      (s) => s.plantName !== plant.name,
    );
    if (previousPlants.length > 0) {
      const prevPlant = previousPlants[previousPlants.length - 1];
      const contextRemark = generateContextRemark(character, plant, prevPlant);
      narration += ` ${contextRemark}`;
    }
  }

  return narration;
}

function generateContextRemark(
  character: AnimeCharacter,
  _currentPlant: PlantData,
  prevInteraction: SessionInteraction,
): string {
  switch (character.id) {
    case "naruto":
      return `Believe it — you also scanned ${prevInteraction.plantName} earlier! Both plants are amazing in their own way, dattebayo!`;
    case "sasuke":
      return `Hmph. You previously analyzed ${prevInteraction.plantName}. Comparing the two reveals interesting patterns.`;
    case "sakura":
      return `Oh! You scanned ${prevInteraction.plantName} earlier too! Both have wonderful health benefits — nature is so generous!`;
    case "madara":
      return `You have already observed ${prevInteraction.plantName}. Compare them. The strong learn from every encounter.`;
    case "obito":
      return `${prevInteraction.plantName}... you encountered it before. Every plant in this dream of a world has its role to play.`;
    case "itachi":
      return `You studied ${prevInteraction.plantName} before this. The connections between plants reveal a deeper pattern — observe it.`;
    case "goku":
      return `Hey, you looked at ${prevInteraction.plantName} before this one! I wonder which one makes you stronger? Haha!`;
    case "sailormoon":
      return `How lovely! You discovered ${prevInteraction.plantName} earlier — both plants are beautiful gifts from nature!`;
    case "luffy":
      return `Shishishi! You found ${prevInteraction.plantName} before this! You're like a plant explorer! So cool!`;
    case "pikachu":
      return `Pika! You also found ${prevInteraction.plantName}! Pikachu remembers! Two plants — double the power! Chu~!`;
    case "totoro":
      return `Mmm~ You also encountered ${prevInteraction.plantName} today. The forest guided you to both. They are connected, as all things are.`;
    default:
      return `You also scanned ${prevInteraction.plantName} earlier — great exploring!`;
  }
}
