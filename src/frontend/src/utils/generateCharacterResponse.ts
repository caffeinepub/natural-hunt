import type { AnimeCharacter } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";
import type { SessionInteraction } from "./generatePlantNarration";

export interface ConversationMessage {
  role: "user" | "character";
  text: string;
  timestamp: number;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCharacterResponse(
  question: string,
  plant: PlantData,
  character: AnimeCharacter,
  _conversationHistory: ConversationMessage[],
  sessionInteractions?: SessionInteraction[],
): string {
  const { personality } = character;
  const interjection = pickRandom(personality.interjections);
  const catchphrase = pickRandom(personality.catchphrases);

  const lowerQ = question.toLowerCase();

  let baseResponse = "";

  if (
    lowerQ.includes("tell me more") ||
    lowerQ.includes("more about") ||
    lowerQ.includes("more info")
  ) {
    baseResponse = generateTellMeMore(plant, character, interjection);
  } else if (
    lowerQ.includes("safe") ||
    lowerQ.includes("dangerous") ||
    lowerQ.includes("toxic") ||
    lowerQ.includes("warning")
  ) {
    baseResponse = generateSafetyResponse(plant, character, interjection);
  } else if (
    lowerQ.includes("grow") ||
    lowerQ.includes("plant it") ||
    lowerQ.includes("garden") ||
    lowerQ.includes("cultivate")
  ) {
    baseResponse = generateGrowingTips(plant, character, interjection);
  } else if (
    lowerQ.includes("tip") ||
    lowerQ.includes("advice") ||
    lowerQ.includes("suggest")
  ) {
    baseResponse = generateTips(plant, character, interjection, catchphrase);
  } else if (
    lowerQ.includes("use") ||
    lowerQ.includes("benefit") ||
    lowerQ.includes("help")
  ) {
    baseResponse = generateBenefitsResponse(plant, character, interjection);
  } else if (
    lowerQ.includes("fun fact") ||
    lowerQ.includes("interesting") ||
    lowerQ.includes("cool")
  ) {
    baseResponse = generateFunFactResponse(plant, character, interjection);
  } else {
    baseResponse = generateGenericResponse(
      question,
      plant,
      character,
      interjection,
      catchphrase,
    );
  }

  // Add cross-plant context if multiple plants scanned
  if (sessionInteractions && sessionInteractions.length > 1) {
    const otherPlants = sessionInteractions.filter(
      (s) => s.plantName !== plant.name,
    );
    if (otherPlants.length > 0 && Math.random() > 0.5) {
      const prevPlant = pickRandom(otherPlants);
      baseResponse += ` ${generateCrossPlantRemark(character, plant, prevPlant)}`;
    }
  }

  return baseResponse;
}

function generateTellMeMore(
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
): string {
  const benefits =
    plant.healthBenefits?.join(", ") ||
    plant.ecologicalBenefits?.join(", ") ||
    "many amazing properties";
  const medicalUses =
    plant.medicalUses?.join(", ") || "various health applications";

  switch (character.id) {
    case "naruto":
      return `${interjection} Okay, listen up! ${plant.name} is seriously amazing, dattebayo! Its health benefits include: ${benefits}. And for medical uses, it's known for ${medicalUses}. This plant is like a hidden jutsu — the more you know about it, the more powerful you become! Believe it!`;
    case "sasuke":
      return `${plant.name} — full analysis. Health properties: ${benefits}. Medical applications: ${medicalUses}. ${plant.funFact}. The data is clear. This plant has significant value.`;
    case "sakura":
      return `${interjection} I'm so glad you asked! ${plant.name} has wonderful properties! Health benefits include ${benefits}. Medically, it's used for ${medicalUses}. As a healer, I find plants like this absolutely invaluable for natural medicine!`;
    case "goku":
      return `${interjection} Okay so ${plant.name} is really cool! It has ${benefits} — that's like power-ups for your body! And it helps with ${medicalUses}! I wonder if eating it would help my training? Haha, probably! Nature is full of strength!`;
    case "sailormoon":
      return `${interjection} Oh how wonderful! ${plant.name} is truly a gift! Its beautiful benefits include ${benefits}. And for healing, it helps with ${medicalUses}. In the name of the Moon, I say nature's pharmacy is the most magical of all!`;
    case "luffy":
      return `Shishishi! So ${plant.name} does all this cool stuff: ${benefits}! And it helps with ${medicalUses}?! That's so awesome! I bet the people in my crew would love knowing this! So cool!`;
    case "pikachu":
      return `Pika pika! ${plant.name} is super! Benefits: ${benefits}! Chu~ Medical uses: ${medicalUses}! Pikachu thinks this plant is super effective! Pika pi~!`;
    case "totoro":
      return `Mmm~ ${plant.name} offers much to those who seek it. Its gifts include ${benefits}. For healing, it provides ${medicalUses}. The forest has known this for centuries. We need only listen.`;
    default:
      return `${plant.name} has these amazing benefits: ${benefits}. For medical uses: ${medicalUses}. ${plant.funFact}!`;
  }
}

function generateSafetyResponse(
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
): string {
  const warnings = plant.warnings?.join(", ") || null;

  if (!warnings) {
    switch (character.id) {
      case "naruto":
        return `${interjection} Good question! ${plant.name} is generally safe, dattebayo! But always be careful — even the best ninja knows their limits! When in doubt, ask a doctor. That's my ninja way of staying safe!`;
      case "sasuke":
        return `${plant.name} presents no significant known hazards. However, individual reactions vary. Proceed with appropriate caution. Consulting a professional is always advisable.`;
      case "sakura":
        return `${interjection} Great question! ${plant.name} is generally considered safe. But as a medical professional, I always recommend consulting with a doctor before using any plant medicinally. Safety first!`;
      case "goku":
        return `${interjection} I think ${plant.name} is safe! But you know, even I check with Bulma before trying new things. Better safe than sorry, right? Haha!`;
      case "sailormoon":
        return `${interjection} ${plant.name} is generally safe, but love means being careful! Always consult a healer before using plants medicinally. In the name of the Moon, I say safety is beautiful!`;
      case "luffy":
        return `Shishishi! ${plant.name} seems safe to me! But I always say — if you're not sure, ask someone who knows! That's how a good captain takes care of their crew!`;
      case "pikachu":
        return `Pika! ${plant.name} is safe! Chu~ But Pikachu says always be careful! Ask a doctor! Pika pi~!`;
      case "totoro":
        return `Mmm~ ${plant.name} is gentle and safe in its natural form. But the forest teaches us to approach all things with respect and care. Seek wisdom before use.`;
      default:
        return `${plant.name} is generally considered safe. Always consult a healthcare professional before medicinal use.`;
    }
  }
  switch (character.id) {
    case "naruto":
      return `${interjection} Hey, important warning, dattebayo! ${plant.name} has some things to watch out for: ${warnings}. A true ninja is always prepared — so be careful and talk to a doctor first! Believe it!`;
    case "sasuke":
      return `Warning noted. ${plant.name} has documented cautions: ${warnings}. Do not ignore these. Consult a professional before any medicinal application.`;
    case "sakura":
      return `${interjection} Oh, this is important! ${plant.name} does have some warnings: ${warnings}. As a medical ninja, I strongly advise consulting a healthcare professional before using this plant. Your safety is my priority!`;
    case "goku":
      return `${interjection} Whoa, careful! ${plant.name} has some warnings: ${warnings}. Even strong fighters need to be careful about what they put in their body! Ask a doctor first!`;
    case "sailormoon":
      return `${interjection} Oh dear! ${plant.name} has some cautions: ${warnings}. Love means protecting yourself too! Please consult a healer before using this plant. Safety is part of justice!`;
    case "luffy":
      return `Hey wait! ${plant.name} has some warnings: ${warnings}! A good captain always warns their crew about dangers! Be careful and ask someone who knows!`;
    case "pikachu":
      return `Pika! Warning! ${plant.name} — careful! ${warnings}! Chu~ Pikachu says ask a doctor! Safety first! Pika pi!`;
    case "totoro":
      return `Mmm~ Approach ${plant.name} with great care. The forest warns: ${warnings}. Respect these boundaries. Seek guidance from a healer before proceeding.`;
    default:
      return `Important: ${plant.name} has these warnings: ${warnings}. Please consult a healthcare professional.`;
  }
}

function generateGrowingTips(
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
): string {
  const ecoInfo =
    plant.ecologicalBenefits?.join(", ") || "supports local ecosystems";

  switch (character.id) {
    case "naruto":
      return `${interjection} Growing ${plant.name}? That's awesome, dattebayo! It loves ${plant.category === "herb" ? "well-drained soil and plenty of sunlight" : "its natural environment"}. It's great for the environment too — ${ecoInfo}! Growing your own plants is like training — it takes patience but the results are worth it! Believe it!`;
    case "sasuke":
      return `${plant.name} cultivation: Requires conditions suited to a ${plant.category}. Ecological role: ${ecoInfo}. Patience and precision are required. Rushing the process yields inferior results.`;
    case "sakura":
      return `${interjection} Growing ${plant.name} is such a rewarding experience! As a ${plant.category}, it thrives with proper care. It's also wonderful for the environment — ${ecoInfo}! Gardening is like healing — nurturing something to its full potential!`;
    case "goku":
      return `${interjection} Growing ${plant.name}?! That's so cool! It's a ${plant.category} so it needs the right conditions to get strong — just like training! It helps the environment by ${ecoInfo}. I bet Gohan would love having a garden!`;
    case "sailormoon":
      return `${interjection} How lovely! Growing ${plant.name} is like nurturing love! This beautiful ${plant.category} thrives with care and attention. It also helps nature by ${ecoInfo}. A garden is like a little kingdom of love!`;
    case "luffy":
      return `Shishishi! Growing ${plant.name}?! That's so cool! It's a ${plant.category} and it helps the world by ${ecoInfo}! I don't know much about gardening but I know adventure, and growing plants is a great adventure!`;
    case "pikachu":
      return `Pika pika! Growing ${plant.name}! Chu~ It's a ${plant.category}! It helps nature — ${ecoInfo}! Pikachu loves plants! Give it love and sunshine! Pika pi~!`;
    case "totoro":
      return `Mmm~ To grow ${plant.name}, one must understand its nature. It is a ${plant.category}, connected to the earth. It gives back to the forest — ${ecoInfo}. Plant it with intention. Water it with patience. The forest will guide the rest.`;
    default:
      return `${plant.name} is a ${plant.category} that thrives with proper care. It benefits the environment through ${ecoInfo}. Give it appropriate conditions and it will flourish!`;
  }
}

function generateTips(
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
  catchphrase: string,
): string {
  const tip =
    plant.healthBenefits?.[0] ||
    plant.medicalUses?.[0] ||
    "its natural properties";

  switch (character.id) {
    case "naruto":
      return `${catchphrase} Here's my tip for ${plant.name}, dattebayo! The best way to use it is for ${tip}. Always get it from a trusted source, and never overdo it — even the best jutsu needs balance! That's my ninja way!`;
    case "sasuke":
      return `Tip: ${plant.name} is most effective when used for ${tip}. Quality matters. Source it carefully. Moderation is key. That is all.`;
    case "sakura":
      return `${interjection} My top tip for ${plant.name}! It's most beneficial for ${tip}. Always use fresh, quality specimens. And remember — natural doesn't always mean safe in large quantities. Consult a professional for medicinal use!`;
    case "goku":
      return `${interjection} My tip? Use ${plant.name} for ${tip}! It's like a power-up — use it right and you'll feel amazing! Just don't eat too much of anything, even I know that! Haha!`;
    case "sailormoon":
      return `${interjection} My tip for ${plant.name}! Use it for ${tip} — it's like a love potion from nature! Always handle it with care and gratitude. In the name of the Moon, respect nature's gifts!`;
    case "luffy":
      return `Shishishi! My tip: ${plant.name} is great for ${tip}! Just be smart about it — even I know you can't just eat everything you find! Ask someone who knows first!`;
    case "pikachu":
      return `Pika! Tip for ${plant.name}: use for ${tip}! Chu~ Be careful! Ask adults! Pikachu says safety is super effective! Pika pi~!`;
    case "totoro":
      return `Mmm~ For ${plant.name}, the ancient wisdom says: use it for ${tip}. Take only what you need. Give thanks to the earth. The forest provides, but we must not take more than our share.`;
    default:
      return `${catchphrase} My tip for ${plant.name}: it's best used for ${tip}. Always source quality specimens and use in moderation!`;
  }
}

function generateBenefitsResponse(
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
): string {
  const benefits =
    plant.healthBenefits?.slice(0, 3).join(", ") || "various health properties";
  const medUses =
    plant.medicalUses?.slice(0, 2).join(" and ") || "natural healing";

  switch (character.id) {
    case "naruto":
      return `${interjection} The benefits of ${plant.name} are incredible, dattebayo! Health-wise: ${benefits}. And it's used medically for ${medUses}! This plant is like having multiple jutsu in one — so powerful! Believe it!`;
    case "sasuke":
      return `${plant.name} benefits: ${benefits}. Medical utility: ${medUses}. Efficient. Effective. Worth knowing.`;
    case "sakura":
      return `${interjection} The benefits of ${plant.name} are wonderful! It provides ${benefits}. Medically, it's excellent for ${medUses}. Nature's pharmacy is truly remarkable!`;
    case "goku":
      return `${interjection} ${plant.name} has amazing benefits: ${benefits}! And it helps with ${medUses}! That's like having a Senzu Bean from nature! So cool!`;
    case "sailormoon":
      return `${interjection} The beautiful benefits of ${plant.name}! It offers ${benefits} — how wonderful! And for healing, it helps with ${medUses}. Nature's love is truly magical!`;
    case "luffy":
      return `Shishishi! ${plant.name} benefits: ${benefits}! And it helps with ${medUses}! That's so cool! Nature is full of amazing things!`;
    case "pikachu":
      return `Pika pika! ${plant.name} benefits: ${benefits}! Chu~ Helps with ${medUses}! Super effective! Pikachu approves! Pika~!`;
    case "totoro":
      return `Mmm~ ${plant.name} offers these gifts: ${benefits}. For healing, it provides ${medUses}. The earth is generous to those who pay attention.`;
    default:
      return `${plant.name} offers these benefits: ${benefits}. It's used medically for ${medUses}. A truly valuable plant!`;
  }
}

function generateFunFactResponse(
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
): string {
  const funFact =
    plant.funFact ||
    `${plant.name} has been used by humans for thousands of years`;

  switch (character.id) {
    case "naruto":
      return `${interjection} Fun fact time, dattebayo! ${funFact}! How cool is that?! This is the kind of knowledge that makes a true ninja! Believe it!`;
    case "sasuke":
      return `Interesting. ${funFact}. This information has strategic value. File it away.`;
    case "sakura":
      return `${interjection} Oh, this is so fascinating! ${funFact}! I love learning these things — every plant has such an incredible story!`;
    case "goku":
      return `${interjection} Whoa, really?! ${funFact}! That's so amazing! I never knew plants could be so interesting! Haha!`;
    case "sailormoon":
      return `${interjection} How magical! ${funFact}! Nature is full of the most wonderful secrets! In the name of the Moon, I am amazed!`;
    case "luffy":
      return `Shishishi! ${funFact}! That's so cool! I love learning new things on my adventure!`;
    case "pikachu":
      return `Pika pika! Fun fact: ${funFact}! Chu~ So cool! Pikachu is amazed! Pika pi~!`;
    case "totoro":
      return `Mmm~ ${funFact}. The forest holds many such secrets. Those who walk quietly learn the most.`;
    default:
      return `${interjection} Fun fact: ${funFact}! Isn't that amazing?`;
  }
}

function generateGenericResponse(
  _question: string,
  plant: PlantData,
  character: AnimeCharacter,
  interjection: string,
  catchphrase: string,
): string {
  const benefit =
    plant.healthBenefits?.[0] ||
    plant.ecologicalBenefits?.[0] ||
    "amazing properties";

  switch (character.id) {
    case "naruto":
      return `${interjection} Great question about ${plant.name}, dattebayo! I know it's a ${plant.category} with ${benefit}. ${catchphrase} Keep asking questions — that's the ninja way of learning!`;
    case "sasuke":
      return `${plant.name}. ${plant.category}. ${benefit}. Your question is noted. The answer lies in careful observation.`;
    case "sakura":
      return `${interjection} About ${plant.name} — it's a wonderful ${plant.category} known for ${benefit}. I love that you're curious about plants! Keep exploring!`;
    case "goku":
      return `${interjection} ${plant.name} is a ${plant.category} and it has ${benefit}! I'm still learning about plants too — it's like training, you never stop! Haha!`;
    case "sailormoon":
      return `${interjection} ${plant.name} is a beautiful ${plant.category} with ${benefit}! Every question brings us closer to understanding nature's magic!`;
    case "luffy":
      return `Shishishi! ${plant.name} is a ${plant.category} with ${benefit}! I don't know everything but I know it's cool! Keep exploring!`;
    case "pikachu":
      return `Pika! ${plant.name} — ${plant.category}! ${benefit}! Chu~ Pikachu is learning too! Pika pi~!`;
    case "totoro":
      return `Mmm~ ${plant.name} is a ${plant.category}. It offers ${benefit}. The forest has much to teach. Ask, and it will answer in time.`;
    default:
      return `${catchphrase} ${plant.name} is a ${plant.category} with ${benefit}. Great question — keep exploring nature!`;
  }
}

function generateCrossPlantRemark(
  character: AnimeCharacter,
  _currentPlant: PlantData,
  prevInteraction: SessionInteraction,
): string {
  switch (character.id) {
    case "naruto":
      return `Oh! And you scanned ${prevInteraction.plantName} earlier too, dattebayo! Both plants are amazing — you're becoming a real plant ninja! Believe it!`;
    case "sasuke":
      return `Note: You previously analyzed ${prevInteraction.plantName}. Comparing the two reveals complementary properties worth studying.`;
    case "sakura":
      return `Oh! You also looked at ${prevInteraction.plantName} earlier! Both plants have wonderful health benefits — you're building quite the botanical knowledge!`;
    case "goku":
      return `Hey, you found ${prevInteraction.plantName} before this one! You're like a plant explorer! I wonder which one gives more power? Haha!`;
    case "sailormoon":
      return `How lovely! You discovered ${prevInteraction.plantName} earlier too! Both plants are beautiful gifts — your plant journey is magical!`;
    case "luffy":
      return `Shishishi! You also found ${prevInteraction.plantName}! You're like a plant explorer on a great adventure! So cool!`;
    case "pikachu":
      return `Pika! You found ${prevInteraction.plantName} too! Pikachu remembers! Two plants — double the discovery! Chu~!`;
    case "totoro":
      return `Mmm~ You also encountered ${prevInteraction.plantName} today. The forest guided you to both. They are connected, as all living things are.`;
    default:
      return `You also scanned ${prevInteraction.plantName} earlier — great plant exploration!`;
  }
}
