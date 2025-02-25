// Define the 6 personality metrics
const metrics = [
    {
        id: "EI",
        name: "Extraversion-Introversion",
        description: "How you gain energy and focus attention",
        colorPrimary: "#FF9933", // Orange (E)
        colorSecondary: "#3366CC", // Blue (I)
        poles: ["Extraversion", "Introversion"],
        poleDescriptions: {
            "E": "You gain energy from social interaction and the external world",
            "I": "You gain energy from solitude and your internal world"
        }
    },
    {
        id: "NS",
        name: "Intuition-Sensing",
        description: "How you process information",
        colorPrimary: "#9966CC", // Purple (N)
        colorSecondary: "#66CC66", // Green (S)
        poles: ["Intuition", "Sensing"],
        poleDescriptions: {
            "N": "You focus on patterns, possibilities and the big picture",
            "S": "You focus on concrete details, facts and practical reality"
        }
    },
    {
        id: "TF",
        name: "Thinking-Feeling",
        description: "How you make decisions",
        colorPrimary: "#CC3333", // Red (T)
        colorSecondary: "#FF6699", // Pink (F)
        poles: ["Thinking", "Feeling"],
        poleDescriptions: {
            "T": "You prioritize logic, consistency and objective analysis",
            "F": "You prioritize values, harmony and the impact on people"
        }
    },
    {
        id: "JP",
        name: "Judging-Perceiving",
        description: "How you approach structure and planning",
        colorPrimary: "#003366", // Navy (J)
        colorSecondary: "#FFCC00", // Yellow (P)
        poles: ["Judging", "Perceiving"],
        poleDescriptions: {
            "J": "You prefer organization, planning and clear decisions",
            "P": "You prefer flexibility, spontaneity and keeping options open"
        }
    },
    {
        id: "AT",
        name: "Assertive-Turbulent",
        description: "Your confidence and response to stress",
        colorPrimary: "#D4AF37", // Gold (A)
        colorSecondary: "#C0C0C0", // Silver (T)
        poles: ["Assertive", "Turbulent"],
        poleDescriptions: {
            "A": "You are self-assured, even-tempered and resistant to stress",
            "T": "You are self-conscious, perfectionistic and sensitive to stress"
        }
    },
    {
        id: "PI",
        name: "Pragmatic-Idealistic",
        description: "Your approach to goals and ideals",
        colorPrimary: "#8B4513", // Brown (P)
        colorSecondary: "#008080", // Teal (I)
        poles: ["Pragmatic", "Idealistic"],
        poleDescriptions: {
            "P": "You focus on practical outcomes and realistic solutions",
            "I": "You focus on ideals, values and optimistic possibilities"
        }
    }
];

// Define the questions for each metric
const questions = [
    // Extraversion (E) vs. Introversion (I)
    {
        text: "I feel energized after spending time with a large group of people",
        metric: "EI",
        direction: "E" // High score indicates Extraversion
    },
    {
        text: "I prefer to think through my ideas before sharing them with others",
        metric: "EI",
        direction: "I"
    },
    {
        text: "I often take initiative in social situations",
        metric: "EI",
        direction: "E"
    },
    {
        text: "I need quiet time alone to recharge after social events",
        metric: "EI",
        direction: "I"
    },
    {
        text: "I enjoy being the center of attention",
        metric: "EI",
        direction: "E"
    },
    {
        text: "I prefer working on projects by myself rather than in groups",
        metric: "EI",
        direction: "I"
    },
    {
        text: "I tend to speak first and think later",
        metric: "EI",
        direction: "E"
    },
    {
        text: "I feel drained after extended social interaction, even if I enjoyed it",
        metric: "EI",
        direction: "I"
    },
    {
        text: "I naturally reach out to make new connections and friends",
        metric: "EI",
        direction: "E"
    },
    {
        text: "I prefer deep one-on-one conversations to group activities",
        metric: "EI",
        direction: "I"
    },
    
    // Intuition (N) vs. Sensing (S)
    {
        text: "I often think about future possibilities more than present realities",
        metric: "NS",
        direction: "N"
    },
    {
        text: "I trust information that is concrete and verifiable",
        metric: "NS",
        direction: "S"
    },
    {
        text: "I enjoy thinking about theoretical concepts and abstract ideas",
        metric: "NS",
        direction: "N"
    },
    {
        text: "I prefer step-by-step instructions when learning something new",
        metric: "NS",
        direction: "S"
    },
    {
        text: "I often notice patterns and connections that others miss",
        metric: "NS",
        direction: "N"
    },
    {
        text: "I focus more on details than the big picture",
        metric: "NS",
        direction: "S"
    },
    {
        text: "I enjoy imagining different possibilities and scenarios",
        metric: "NS",
        direction: "N"
    },
    {
        text: "I prefer practical solutions based on past experience",
        metric: "NS",
        direction: "S"
    },
    {
        text: "I'm often described as creative or innovative",
        metric: "NS",
        direction: "N"
    },
    {
        text: "I value concrete facts over theories and interpretations",
        metric: "NS",
        direction: "S"
    },
    
    // Thinking (T) vs. Feeling (F)
    {
        text: "I make decisions based primarily on logic and objective analysis",
        metric: "TF",
        direction: "T"
    },
    {
        text: "I consider how decisions will affect people's feelings and needs",
        metric: "TF",
        direction: "F"
    },
    {
        text: "I value truth over tact when giving feedback",
        metric: "TF",
        direction: "T"
    },
    {
        text: "I naturally empathize with others' emotions",
        metric: "TF",
        direction: "F"
    },
    {
        text: "I prefer to analyze problems rather than discuss how they make me feel",
        metric: "TF",
        direction: "T"
    },
    {
        text: "Maintaining harmony in relationships is very important to me",
        metric: "TF",
        direction: "F"
    },
    {
        text: "I tend to remain detached when making important decisions",
        metric: "TF",
        direction: "T"
    },
    {
        text: "I often make decisions based on what feels right rather than what makes logical sense",
        metric: "TF",
        direction: "F"
    },
    {
    text: "I prefer to focus on facts and principles rather than people's feelings",
    metric: "TF",
    direction: "T"
},
{
    text: "I'm quick to offer emotional support to others",
    metric: "TF",
    direction: "F"
},

// Judging (J) vs. Perceiving (P)
{
    text: "I prefer to have a detailed plan before starting a project",
    metric: "JP",
    direction: "J"
},
{
    text: "I enjoy adapting to new situations as they arise",
    metric: "JP",
    direction: "P"
},
{
    text: "I like to have things settled and decided",
    metric: "JP",
    direction: "J"
},
{
    text: "I prefer keeping my options open as long as possible",
    metric: "JP",
    direction: "P"
},
{
    text: "I find satisfaction in completing tasks and checking them off my list",
    metric: "JP",
    direction: "J"
},
{
    text: "I'm comfortable changing plans at the last minute",
    metric: "JP",
    direction: "P"
},
{
    text: "I prefer environments that are organized and structured",
    metric: "JP",
    direction: "J"
},
{
    text: "I enjoy spontaneity and going with the flow",
    metric: "JP",
    direction: "P"
},
{
    text: "I like to establish routines and stick to them",
    metric: "JP",
    direction: "J"
},
{
    text: "I find rigid schedules and structures limiting",
    metric: "JP",
    direction: "P"
},

// Assertive (A) vs. Turbulent (T)
{
    text: "I rarely worry about whether I've made the right decision",
    metric: "AT",
    direction: "A"
},
{
    text: "I often second-guess myself after making decisions",
    metric: "AT",
    direction: "T"
},
{
    text: "I remain calm under pressure",
    metric: "AT",
    direction: "A"
},
{
    text: "I'm sensitive to criticism and often take it personally",
    metric: "AT",
    direction: "T"
},
{
    text: "I'm generally satisfied with who I am",
    metric: "AT",
    direction: "A"
},
{
    text: "I constantly strive to improve myself because I feel I'm not good enough",
    metric: "AT",
    direction: "T"
},
{
    text: "I rarely feel stressed or anxious about my performance",
    metric: "AT",
    direction: "A"
},
{
    text: "I tend to be perfectionistic about my work",
    metric: "AT",
    direction: "T"
},
{
    text: "I'm confident in my abilities and decisions",
    metric: "AT",
    direction: "A"
},
{
    text: "I often worry about what others think of me",
    metric: "AT",
    direction: "T"
},

// Pragmatic (P) vs. Idealistic (I)
{
    text: "I focus more on what works than what's ideal",
    metric: "PI",
    direction: "P"
},
{
    text: "I'm driven by a vision of how things should be",
    metric: "PI",
    direction: "I"
},
{
    text: "I prefer practical solutions over perfect but impractical ones",
    metric: "PI",
    direction: "P"
},
{
    text: "I often think about how the world could be better",
    metric: "PI",
    direction: "I"
},
{
    text: "I'm more concerned with results than principles",
    metric: "PI",
    direction: "P"
},
{
    text: "I'm willing to make sacrifices for causes I believe in",
    metric: "PI",
    direction: "I"
},
{
    text: "I tend to be realistic about what can be accomplished",
    metric: "PI",
    direction: "P"
},
{
    text: "I'm often told I'm too idealistic or optimistic",
    metric: "PI",
    direction: "I"
},
{
    text: "I prefer to focus on immediate problems rather than long-term visions",
    metric: "PI",
    direction: "P"
},
{
    text: "I'm motivated by making a positive difference in the world",
    metric: "PI",
    direction: "I"
}
]; 