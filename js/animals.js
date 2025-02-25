// Define the 64 unique animal personality types based on the 6 metrics:
//
// 1. Extraversion (E) vs. Introversion (I)
// 2. Intuition (N) vs. Sensing (S)
// 3. Thinking (T) vs. Feeling (F)
// 4. Judging (J) vs. Perceiving (P)
// 5. Assertive (A) vs. Turbulent (T)
// 6. Pragmatic (P) vs. Idealistic (I)
//
// Each type's 6-letter code is built in order (using the first letter if the score > 50)
// and is paired with a unique animal.
const animalTypes = {
  // -------- Group 1: E + N types (16 types) --------
  "ENTJAP": {
    animal: "Lion",
    image: "https://example.com/images/lion.svg",
    description: "Regal and commanding—like a lion, you lead with authority.",
    strengths: ["Leadership", "Courage", "Strategic thinking"],
    challenges: ["Impatient", "Domineering"],
    compatibleWith: ["ISFJAI", "ENFJTP", "INTPAI"],
    growthAreas: "Practice empathy to balance your assertiveness."
  },
  "ENTJAI": {
    animal: "Eagle",
    image: "https://example.com/images/eagle.svg",
    description: "Sharp-eyed and focused—you soar high above challenges.",
    strengths: ["Visionary", "Decisive", "Focused"],
    challenges: ["Perfectionistic", "Detached"],
    compatibleWith: ["ISFJTP", "ENFJAP", "INTPTI"],
    growthAreas: "Embrace vulnerability to connect with others."
  },
  "ENTJTP": {
    animal: "Wolf",
    image: "https://example.com/images/wolf.svg",
    description: "Loyal and tactical—your strategic mind unites your pack.",
    strengths: ["Determined", "Loyal", "Tactical"],
    challenges: ["Controlling", "Overcautious"],
    compatibleWith: ["INFJTI", "ESFJAP", "ISTPAI"],
    growthAreas: "Learn to trust and delegate for better collaboration."
  },
  "ENTJTI": {
    animal: "Falcon",
    image: "https://example.com/images/falcon.svg",
    description: "Swift and precise—like a falcon, you strike with clarity.",
    strengths: ["Precision", "Fast-paced", "Innovative"],
    challenges: ["Impatient", "Critical"],
    compatibleWith: ["ISFJAP", "INFPAI", "ISTJAI"],
    growthAreas: "Cultivate patience to harness your focus."
  },
  "ENTPAP": {
    animal: "Monkey",
    image: "https://example.com/images/monkey.svg",
    description: "Curious and playful—your inventive mind leaps from idea to idea.",
    strengths: ["Creative", "Adaptable", "Inventive"],
    challenges: ["Scatterbrained", "Impulsive"],
    compatibleWith: ["ISFJAP", "ENFJAP", "INFPAP"],
    growthAreas: "Focus on follow-through to see your ideas to fruition."
  },
  "ENTPAI": {
    animal: "Dolphin",
    image: "https://example.com/images/dolphin.svg",
    description: "Intelligent and social—your joyful intuition makes waves.",
    strengths: ["Social", "Intuitive", "Playful"],
    challenges: ["Easily distracted", "Overidealistic"],
    compatibleWith: ["ISTJAP", "INFJTI", "ISFJAP"],
    growthAreas: "Balance creativity with discipline."
  },
  "ENTPTP": {
    animal: "Raccoon",
    image: "https://example.com/images/raccoon.svg",
    description: "Resourceful and clever—you find solutions in unexpected places.",
    strengths: ["Resourceful", "Clever", "Adaptable"],
    challenges: ["Impulsive", "Opportunistic"],
    compatibleWith: ["ISFJAI", "INFJAP", "ISTJTI"],
    growthAreas: "Enhance consistency to match a spark of creativity."
  },
  "ENTPTI": {
    animal: "Cheetah",
    image: "https://example.com/images/cheetah.svg",
    description: "Fast and agile—your drive for excellence is relentless.",
    strengths: ["Quick", "Agile", "Energetic"],
    challenges: ["Impetuous", "Competitive"],
    compatibleWith: ["ISFJAP", "ENFJAI", "ISTJTI"],
    growthAreas: "Practice mindfulness to channel your energy."
  },
  "ENFJAP": {
    animal: "Elephant",
    image: "https://example.com/images/elephant.svg",
    description: "Wise and nurturing—like an elephant, you lead with compassion.",
    strengths: ["Empathetic", "Patient", "Reliable"],
    challenges: ["Self-sacrificing", "Stubborn"],
    compatibleWith: ["INFPAP", "ISTJAP", "INFJAI"],
    growthAreas: "Remember to care for yourself as you care for others."
  },
  "ENFJAI": {
    animal: "Peacock",
    image: "https://example.com/images/peacock.svg",
    description: "Vibrant and charismatic—you express yourself with a brilliant flair.",
    strengths: ["Charismatic", "Creative", "Expressive"],
    challenges: ["Attention-seeking", "Sensitive"],
    compatibleWith: ["INTJAI", "ISFJAP", "ESTJAI"],
    growthAreas: "Focus on genuine connection over external approval."
  },
  "ENFJTP": {
    animal: "Giraffe",
    image: "https://example.com/images/giraffe.svg",
    description: "With a broad perspective, you see both the forest and the trees.",
    strengths: ["Visionary", "Attentive", "Graceful"],
    challenges: ["Overidealistic", "Detached"],
    compatibleWith: ["INTJTI", "ISFJAI", "ESTJTP"],
    growthAreas: "Ground your ideas with practical steps."
  },
  "ENFJTI": {
    animal: "Leopard",
    image: "https://example.com/images/leopard.svg",
    description: "Sleek and adaptive, you navigate dynamic environments with finesse.",
    strengths: ["Adaptable", "Keen", "Quick-witted"],
    challenges: ["Impatient", "Restless"],
    compatibleWith: ["INTJTI", "ISFJAP", "ESTJAP"],
    growthAreas: "Slow down sometimes to enjoy the journey."
  },
  "ENFPAP": {
    animal: "Parrot",
    image: "https://example.com/images/parrot.svg",
    description: "Colorful and expressive—your vibrant spirit is as lively as a parrot's call.",
    strengths: ["Expressive", "Energetic", "Optimistic"],
    challenges: ["Scattered", "Impulsive"],
    compatibleWith: ["INFJAP", "ESFJAP", "INFPAP"],
    growthAreas: "Direct your energy with focused creativity."
  },
  "ENFPAI": {
    animal: "Swan",
    image: "https://example.com/images/swan.svg",
    description: "Graceful and serene—you glide through life with quiet elegance.",
    strengths: ["Graceful", "Calm", "Empathetic"],
    challenges: ["Overidealistic", "Reserved"],
    compatibleWith: ["INFJAI", "ESFJAI", "INFPAP"],
    growthAreas: "Balance sensitivity with assertiveness."
  },
  "ENFPTP": {
    animal: "Flamingo",
    image: "https://example.com/images/flamingo.svg",
    description: "Bold and eye-catching—your unique style lights up the room.",
    strengths: ["Unique", "Expressive", "Social"],
    challenges: ["Melodramatic", "Easily swayed"],
    compatibleWith: ["INFJTP", "ESFJTP", "INFPAP"],
    growthAreas: "Cultivate inner balance to support your flair."
  },
  "ENFPTI": {
    animal: "Hummingbird",
    image: "https://example.com/images/hummingbird.svg",
    description: "Delicate yet energetic—you flit from idea to idea with spirited grace.",
    strengths: ["Energetic", "Delicate", "Resilient"],
    challenges: ["Fleeting", "Easily distracted"],
    compatibleWith: ["INFJTI", "ESFJTI", "INFPAP"],
    growthAreas: "Develop sustained focus to harness your vibrant energy."
  },

  // -------- Group 2: E + S types (16 types) --------
  "ESTJAP": {
    animal: "Buffalo",
    image: "https://example.com/images/buffalo.svg",
    description: "Strong and steadfast—you bear challenges like a mighty buffalo.",
    strengths: ["Reliable", "Determined", "Practical"],
    challenges: ["Rigid", "Stubborn"],
    compatibleWith: ["INFPAP", "ISTJAI", "ESFJAP"],
    growthAreas: "Embrace flexibility to broaden your perspective."
  },
  "ESTJAI": {
    animal: "Rhinoceros",
    image: "https://example.com/images/rhinoceros.svg",
    description: "Tough and resilient—you charge forward with an unyielding force.",
    strengths: ["Resilient", "Bold", "Focused"],
    challenges: ["Unyielding", "Insensitive"],
    compatibleWith: ["INFPAP", "ISTJAP", "ESFJAP"],
    growthAreas: "Allow compassion to soften your robust exterior."
  },
  "ESTJTP": {
    animal: "Crocodile",
    image: "https://example.com/images/crocodile.svg",
    description: "Ancient and formidable—you navigate life with a primal sense of strategy.",
    strengths: ["Strategic", "Persistent", "Tactical"],
    challenges: ["Harsh", "Inflexible"],
    compatibleWith: ["INFPAP", "ISTJAI", "ESFJTI"],
    growthAreas: "Blend empathy with strength for a balanced approach."
  },
  "ESTJTI": {
    animal: "Hippopotamus",
    image: "https://example.com/images/hippopotamus.svg",
    description: "Massive and grounded—you bring calm power to every challenge.",
    strengths: ["Grounded", "Reliable", "Patient"],
    challenges: ["Stubborn", "Unyielding"],
    compatibleWith: ["INFPAP", "ISTJAP", "ESFJAP"],
    growthAreas: "Allow adaptability to complement your steadfast nature."
  },
  "ESTPAP": {
    animal: "Antelope",
    image: "https://example.com/images/antelope.svg",
    description: "Swift and graceful—you sprint through challenges with agile determination.",
    strengths: ["Agile", "Quick", "Energetic"],
    challenges: ["Impulsive", "Restless"],
    compatibleWith: ["INTPAI", "ISTPAP", "ESFPAP"],
    growthAreas: "Channel your vigor into steady, planned actions."
  },
  "ESTPAI": {
    animal: "Wildebeest",
    image: "https://example.com/images/wildebeest.svg",
    description: "Enduring and communal—you face life head-on with great stamina.",
    strengths: ["Resilient", "Persistent", "Community-oriented"],
    challenges: ["Stubborn", "Impulsive"],
    compatibleWith: ["INTPAI", "ISTPAP", "ESFPAP"],
    growthAreas: "Cultivate patience to temper your raw energy."
  },
  "ESTPTP": {
    animal: "Jackal",
    image: "https://example.com/images/jackal.svg",
    description: "Cunning and adaptive—you unravel challenges with strategic savvy.",
    strengths: ["Cunning", "Adaptive", "Resourceful"],
    challenges: ["Mischievous", "Distrustful"],
    compatibleWith: ["INTPTP", "ISTPTI", "ESFPAP"],
    growthAreas: "Build trust to balance your independent streak."
  },
  "ESTPTI": {
    animal: "Hyena",
    image: "https://example.com/images/hyena.svg",
    description: "Wily and resilient—you use humor to overcome life's hurdles.",
    strengths: ["Resilient", "Adaptable", "Quick-witted"],
    challenges: ["Cynical", "Restless"],
    compatibleWith: ["INTPTP", "ISTPTP", "ESFPAP"],
    growthAreas: "Invest in collaborative relationships to complement your humor."
  },
  "ESFJAP": {
    animal: "German Shepherd",
    image: "https://example.com/images/german-shepherd.svg",
    description: "Loyal and protective—you guard your community with unwavering commitment.",
    strengths: ["Loyal", "Reliable", "Protective"],
    challenges: ["Overprotective", "Inflexible"],
    compatibleWith: ["INFPAP", "ISTJAP", "ESFJAI"],
    growthAreas: "Keep an open mind to nurture innovative ideas."
  },
  "ESFJAI": {
    animal: "Labrador Retriever",
    image: "https://example.com/images/labrador-retriever.svg",
    description: "Friendly and warm—you connect deeply through authentic compassion.",
    strengths: ["Friendly", "Compassionate", "Sociable"],
    challenges: ["Overly accommodating", "Sensitive"],
    compatibleWith: ["INFPAP", "ISTJAP", "ESFJAP"],
    growthAreas: "Learn to assert yourself to ensure balanced relationships."
  },
  "ESFJTP": {
    animal: "Horse",
    image: "https://example.com/images/horse.svg",
    description: "Stately and dependable—you carry tradition and pride with elegance.",
    strengths: ["Dependable", "Noble", "Steady"],
    challenges: ["Stubborn", "Conventional"],
    compatibleWith: ["INFPAP", "ISTJAI", "ESFJTI"],
    growthAreas: "Embrace flexibility to infuse innovation into your traditions."
  },
  "ESFJTI": {
    animal: "Sheep",
    image: "https://example.com/images/sheep.svg",
    description: "Gentle and compliant—you cherish harmony and soft-spoken care.",
    strengths: ["Gentle", "Kind", "Patient"],
    challenges: ["Indecisive", "Overly compliant"],
    compatibleWith: ["INFPAP", "ISTJAP", "ESFJAP"],
    growthAreas: "Assert your individuality to foster personal growth."
  },
  "ESFPAP": {
    animal: "Penguin",
    image: "https://example.com/images/penguin.svg",
    description: "Charming and playful—your delightful energy brightens every space.",
    strengths: ["Playful", "Charming", "Social"],
    challenges: ["Easily distracted", "Fickle"],
    compatibleWith: ["INFPAP", "ISTPAI", "ESFPAP"],
    growthAreas: "Focus your energy to achieve consistency."
  },
  "ESFPAI": {
    animal: "Seal",
    image: "https://example.com/images/seal.svg",
    description: "Adaptable and endearing—like a seal, you remain resilient amid change.",
    strengths: ["Adaptable", "Endearing", "Resilient"],
    challenges: ["Reserved", "Overly cautious"],
    compatibleWith: ["INFPAP", "ISTPAI", "ESFPAI"],
    growthAreas: "Embrace your inner voice for confident self-expression."
  },
  "ESFPTP": {
    animal: "Parakeet",
    image: "https://example.com/images/parakeet.svg",
    description: "Bright and articulate—you color your world and those around you with lively speech.",
    strengths: ["Vibrant", "Expressive", "Cheerful"],
    challenges: ["Overly talkative", "Impulsive"],
    compatibleWith: ["INFPAP", "ISTPAI", "ESFPTI"],
    growthAreas: "Enhance your listening skills to deepen connections."
  },
  "ESFPTI": {
    animal: "Goldfish",
    image: "https://example.com/images/goldfish.svg",
    description: "Delicate and reflective—you bring calm, subtle beauty to your surroundings.",
    strengths: ["Calm", "Gentle", "Observant"],
    challenges: ["Forgetful", "Easily overwhelmed"],
    compatibleWith: ["INFPAP", "ISTPAI", "ESFPTP"],
    growthAreas: "Strengthen focus to better reflect your gentle nature."
  },

  // -------- Group 3: I + N types (16 types) --------
  "INTJAP": {
    animal: "Owl",
    image: "https://example.com/images/owl.svg",
    description: "Wise and introspective—you seek truth with deep contemplation.",
    strengths: ["Insightful", "Strategic", "Thoughtful"],
    challenges: ["Reserved", "Over-analytical"],
    compatibleWith: ["INFPAP", "ISFJAP", "INTJAI"],
    growthAreas: "Trust your intuition beyond just logic."
  },
  "INTJAI": {
    animal: "Hawk",
    image: "https://example.com/images/hawk.svg",
    description: "Keen and observant—you notice details that others might miss.",
    strengths: ["Observant", "Decisive", "Focused"],
    challenges: ["Aloof", "Critical"],
    compatibleWith: ["INFPAP", "ISFJAP", "INTJAP"],
    growthAreas: "Engage more emotionally to round out your analytical mind."
  },
  "INTJTP": {
    animal: "Raven",
    image: "https://example.com/images/raven.svg",
    description: "Mysterious and clever—you decipher the world with inventive insight.",
    strengths: ["Clever", "Resourceful", "Analytical"],
    challenges: ["Secretive", "Reserved"],
    compatibleWith: ["INFPAP", "ISFJAI", "INTJTI"],
    growthAreas: "Share your insights to gain fresh perspectives."
  },
  "INTJTI": {
    animal: "Vulture",
    image: "https://example.com/images/vulture.svg",
    description: "Perceptive and unyielding—you transform challenges into opportunities.",
    strengths: ["Perceptive", "Persistent", "Strategic"],
    challenges: ["Pessimistic", "Judgmental"],
    compatibleWith: ["INFPAP", "ISFJAI", "INTJTP"],
    growthAreas: "Adopt optimism to balance your keen analysis."
  },
  "INTPAP": {
    animal: "Ibex",
    image: "https://example.com/images/ibex.svg",
    description: "Independent and resourceful—you scale challenges with rugged ingenuity.",
    strengths: ["Curious", "Independent", "Creative"],
    challenges: ["Overly analytical", "Detached"],
    compatibleWith: ["ESFJAP", "INFJAP", "INTPAI"],
    growthAreas: "Allow emotion to inform your logical insights."
  },
  "INTPAI": {
    animal: "Gazelle",
    image: "https://example.com/images/gazelle.svg",
    description: "Graceful and swift—you navigate complexities with effortless agility.",
    strengths: ["Graceful", "Agile", "Energetic"],
    challenges: ["Impulsive", "Easily distracted"],
    compatibleWith: ["ESFJAI", "INFJAP", "INTPAP"],
    growthAreas: "Channel your vitality into sustained pursuits."
  },
  "INTPTP": {
    animal: "Sea Lion",
    image: "https://example.com/images/sea-lion.svg",
    description: "Sociable and reflective—you mix playfulness with insightful observation.",
    strengths: ["Sociable", "Insightful", "Adaptable"],
    challenges: ["Noncommittal", "Easily diverted"],
    compatibleWith: ["ESFJTI", "INFJAI", "INTPTI"],
    growthAreas: "Focus on long-term goals to harness your energy."
  },
  "INTPTI": {
    animal: "Camel",
    image: "https://example.com/images/camel.svg",
    description: "Enduring and philosophical—you traverse vast terrains with a steady resolve.",
    strengths: ["Resilient", "Philosophical", "Patient"],
    challenges: ["Stubborn", "Reserved"],
    compatibleWith: ["ESFJTI", "INFJAI", "INTPTP"],
    growthAreas: "Stay open to change to complement your steadfast nature."
  },
  "INFJAP": {
    animal: "Koala",
    image: "https://example.com/images/koala.svg",
    description: "Gentle and nurturing—you comfort others with a quiet, loving presence.",
    strengths: ["Calm", "Empathetic", "Thoughtful"],
    challenges: ["Overcautious", "Reserved"],
    compatibleWith: ["ESFJAP", "ISTJAP", "INFJAI"],
    growthAreas: "Allow yourself to be vulnerable to build deeper bonds."
  },
  "INFJAI": {
    animal: "Panda",
    image: "https://example.com/images/panda.svg",
    description: "Peaceful and endearing—you radiate a warmth that invites trust.",
    strengths: ["Gentle", "Patient", "Loving"],
    challenges: ["Passive", "Overly accommodating"],
    compatibleWith: ["ESFJAI", "ISTJAI", "INFJAP"],
    growthAreas: "Assert your needs to ensure mutual respect."
  },
  "INFJTP": {
    animal: "Sloth",
    image: "https://example.com/images/sloth.svg",
    description: "Laid-back and insightful—you approach life at a reflective pace.",
    strengths: ["Patient", "Observant", "Calm"],
    challenges: ["Slow to act", "Indecisive"],
    compatibleWith: ["ESFJTP", "ISTJTP", "INFJAI"],
    growthAreas: "Boost your initiative to match your thoughtful nature."
  },
  "INFJTI": {
    animal: "Otter",
    image: "https://example.com/images/otter.svg",
    description: "Playful and intelligent—you mix curiosity with a joyful spirit.",
    strengths: ["Playful", "Adaptable", "Social"],
    challenges: ["Distracted", "Overindulgent"],
    compatibleWith: ["ESFJTI", "ISTJTI", "INFJAP"],
    growthAreas: "Focus your energy on creative projects with purpose."
  },
  "INFPAP": {
    animal: "Bunny",
    image: "https://example.com/images/bunny.svg",
    description: "Soft and gentle—your tender nature exudes warmth and kindness.",
    strengths: ["Kind", "Imaginative", "Compassionate"],
    challenges: ["Overly sentimental", "Shy"],
    compatibleWith: ["INTJAP", "ISFJAP", "INFJAP"],
    growthAreas: "Build self-confidence to let your light shine."
  },
  "INFPAI": {
    animal: "Deer",
    image: "https://example.com/images/deer.svg",
    description: "Graceful and sensitive—you move delicately with quiet inner strength.",
    strengths: ["Graceful", "Intuitive", "Gentle"],
    challenges: ["Timid", "Easily overwhelmed"],
    compatibleWith: ["INTJAI", "ISFJAI", "INFJAP"],
    growthAreas: "Stand tall in your values to overcome self-doubt."
  },
  "INFPTP": {
    animal: "Fox",
    image: "https://example.com/images/fox.svg",
    description: "Clever and warm—you blend resourcefulness with a subtle charm.",
    strengths: ["Clever", "Resourceful", "Warm"],
    challenges: ["Secretive", "Mistrustful"],
    compatibleWith: ["INTJTP", "ISFJTP", "INFJTP"],
    growthAreas: "Open up to share your insights and deepen connections."
  },
  "INFPTI": {
    animal: "Hedgehog",
    image: "https://example.com/images/hedgehog.svg",
    description: "Thoughtful and protective—you retreat inward to nurture your sensitive core.",
    strengths: ["Sensitive", "Thoughtful", "Resilient"],
    challenges: ["Reserved", "Overcautious"],
    compatibleWith: ["INTJTI", "ISFJTI", "INFJTP"],
    growthAreas: "Allow gradual openness to build trust with others."
  },

  // -------- Group 4: I + S types (16 types) --------
  "ISTJAP": {
    animal: "Beaver",
    image: "https://example.com/images/beaver.svg",
    description: "Diligent and practical—you build lasting foundations with tireless effort.",
    strengths: ["Hardworking", "Detail-oriented", "Reliable"],
    challenges: ["Inflexible", "Stubborn"],
    compatibleWith: ["ENFPAP", "ISFJAP", "ISTJAI"],
    growthAreas: "Embrace change to enhance your methods."
  },
  "ISTJAI": {
    animal: "Tortoise",
    image: "https://example.com/images/tortoise.svg",
    description: "Steady and wise—like a tortoise, you persist with calm determination.",
    strengths: ["Patient", "Persistent", "Methodical"],
    challenges: ["Slow to adapt", "Rigid"],
    compatibleWith: ["ENFPAP", "ISFJAI", "ISTJAP"],
    growthAreas: "Adopt a more flexible pace to complement your persistence."
  },
  "ISTJTP": {
    animal: "Ant",
    image: "https://example.com/images/ant.svg",
    description: "Small yet mighty—you succeed through teamwork and consistent effort.",
    strengths: ["Diligent", "Cooperative", "Systematic"],
    challenges: ["Overly meticulous", "Reserved"],
    compatibleWith: ["ENFPAP", "ISFJTP", "ISTJAI"],
    growthAreas: "Balance attention to detail with a broader perspective."
  },
  "ISTJTI": {
    animal: "Mole",
    image: "https://example.com/images/mole.svg",
    description: "Quiet and persistent—you work steadily behind the scenes.",
    strengths: ["Stealthy", "Focused", "Persistent"],
    challenges: ["Withdrawn", "Overcautious"],
    compatibleWith: ["ENFPAP", "ISFJTI", "ISTJAP"],
    growthAreas: "Collaborate more openly to share your valuable insights."
  },
  "ISTPAP": {
    animal: "Wolverine",
    image: "https://example.com/images/wolverine.svg",
    description: "Fierce and resourceful—you meet obstacles with scrappy determination.",
    strengths: ["Resourceful", "Tough", "Independent"],
    challenges: ["Impulsive", "Reserved"],
    compatibleWith: ["ENFJAI", "ISTPAP", "ESTPAP"],
    growthAreas: "Plan in detail to temper your spontaneity."
  },
  "ISTPAI": {
    animal: "Lynx",
    image: "https://example.com/images/lynx.svg",
    description: "Keen and agile—you navigate the wild with a sharp and perceptive mind.",
    strengths: ["Observant", "Swift", "Independent"],
    challenges: ["Aloof", "Suspicious"],
    compatibleWith: ["ENFJAP", "ISTJAI", "ESTPAI"],
    growthAreas: "Foster collaboration to ease your solitary nature."
  },
  "ISTPTP": {
    animal: "Badger",
    image: "https://example.com/images/badger.svg",
    description: "Tenacious and hardworking—you push through challenges with unwavering resolve.",
    strengths: ["Tenacious", "Diligent", "Practical"],
    challenges: ["Stubborn", "Unyielding"],
    compatibleWith: ["ENFJTP", "ISTPTI", "ESTPTP"],
    growthAreas: "Allow some flexibility to boost your robust efforts."
  },
  "ISTPTI": {
    animal: "Panther",
    image: "https://example.com/images/panther.svg",
    description: "Sleek and powerful—you blend mystery with agile prowess.",
    strengths: ["Agile", "Focused", "Mysterious"],
    challenges: ["Secretive", "Impulsive"],
    compatibleWith: ["ENFJTI", "ISTPTP", "ESTPTI"],
    growthAreas: "Channel your intensity into constructive creative pursuits."
  },
  "ISFJAP": {
    animal: "Squirrel",
    image: "https://example.com/images/squirrel.svg",
    description: "Energetic and resourceful—you prepare diligently for every season.",
    strengths: ["Organized", "Loyal", "Friendly"],
    challenges: ["Worried", "Overcautious"],
    compatibleWith: ["ENTPAP", "ISTJAP", "ISFJAI"],
    growthAreas: "Allow spontaneity to lighten your cautious planning."
  },
  "ISFJAI": {
    animal: "Chipmunk",
    image: "https://example.com/images/chipmunk.svg",
    description: "Small and caring—you nurture those around you with gentle warmth.",
    strengths: ["Caring", "Dependable", "Supportive"],
    challenges: ["Timid", "Self-doubting"],
    compatibleWith: ["ENTJAI", "ISTJAI", "ISFJAP"],
    growthAreas: "Assert your needs to build mutually supportive relationships."
  },
  "ISFJTP": {
    animal: "Lemur",
    image: "https://example.com/images/lemur.svg",
    description: "Lively and perceptive—you brighten your community with playful insight.",
    strengths: ["Perceptive", "Energetic", "Sociable"],
    challenges: ["Impulsive", "Easily influenced"],
    compatibleWith: ["ENTJTP", "INTJTP", "ISFJTI"],
    growthAreas: "Balance your social energy with quiet reflection."
  },
  "ISFJTI": {
    animal: "Guinea Pig",
    image: "https://example.com/images/guinea-pig.svg",
    description: "Endearing and gentle—you offer consistent care and subtle warmth.",
    strengths: ["Nurturing", "Loyal", "Gentle"],
    challenges: ["Timid", "Conflict-avoidant"],
    compatibleWith: ["ENTJAP", "INTJAP", "ISFJAI"],
    growthAreas: "Express your needs openly to ensure personal well-being."
  },
  "ISFPAP": {
    animal: "Cat",
    image: "https://example.com/images/cat.svg",
    description: "Independent and graceful—your subtle elegance enchants those around you.",
    strengths: ["Creative", "Independent", "Elegant"],
    challenges: ["Aloof", "Uncommunicative"],
    compatibleWith: ["ENTPAI", "INTPAI", "ISTPAI"],
    growthAreas: "Share your inner world to reveal your true beauty."
  },
  "ISFPAI": {
    animal: "Ferret",
    image: "https://example.com/images/ferret.svg",
    description: "Playful and curious—you infuse everyday life with creative surprises.",
    strengths: ["Playful", "Curious", "Inventive"],
    challenges: ["Fickle", "Distracted"],
    compatibleWith: ["ENTPTI", "INTPTI", "ISTPTI"],
    growthAreas: "Focus your inventive energy for consistent progress."
  },
  "ISFPTP": {
    animal: "Sunfish",
    image: "https://example.com/images/sunfish.svg",
    description: "Calm and adaptable—you flow through changes with serene ease.",
    strengths: ["Adaptable", "Calm", "Gentle"],
    challenges: ["Passive", "Temperate"],
    compatibleWith: ["ENTPTI", "INTPTI", "ISTPTP"],
    growthAreas: "Assert your ideas confidently to reflect your inner strength."
  },
  "ISFPTI": {
    animal: "Chameleon",
    image: "https://example.com/images/chameleon.svg",
    description: "Versatile and perceptive—you adapt seamlessly while maintaining a unique identity.",
    strengths: ["Versatile", "Observant", "Adaptable"],
    challenges: ["Fickle", "Elusive"],
    compatibleWith: ["ENTPTI", "INTPTI", "ISTPTI"],
    growthAreas: "Work on consistency to channel your adaptive brilliance."
  }
};

// Function to generate a 6-letter animal code from scores for each metric.
function generateAnimalCode(scores) {
  let code = "";
  metrics.forEach(metric => {
    const metricId = metric.id;
    const score = scores[metricId];
    // Use the first letter if score > 50; otherwise, use the second letter.
    code += score > 50 ? metricId[0] : metricId[1];
  });
  return code;
}

// Function to retrieve the animal type based on the code.
function getAnimalType(code) {
  return animalTypes[code] || animalTypes["ENTJAP"];
} 