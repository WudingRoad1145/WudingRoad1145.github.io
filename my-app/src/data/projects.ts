export const projects = [
  {
    slug: "babymilu",
    title: "BabyMilu",
    subtitle: "Bringing a character home",
    description:
      "An AI companion, from a GoPro in a plushie to the factory floor A story of everyday interactions and keeping a promise",
    image: "/babymilu/hero.webp",
    alt: "Two BabyMilu companions in soft white and blue plush bodies",
    category: "Cofounder & CTO",
    medium: "Hardware · Interaction · Systems",
    tone: "milu",
  },
  {
    slug: "rabbit-r1",
    title: "rabbit r1",
    subtitle: "A different way to meet a computer",
    description:
      "Product development for a pocket-sized AI device, exploring a different relationship with technology",
    image: "/images/rabbit.jpg",
    alt: "The orange rabbit r1 held in a hand",
    category: "Product development",
    medium: "AI hardware",
    tone: "rabbit",
  },
  {
    slug: "hipo",
    title: "HiPo",
    subtitle: "A little room for another perspective",
    description:
      "A browser extension that surfaces polarization and makes opposing viewpoints easier to find",
    image: "/images/hipo.jpg",
    alt: "HiPo showing an article and its polarization analysis on a laptop",
    category: "Product design & engineering",
    medium: "Browser extension",
    tone: "hipo",
  },
  {
    slug: "wiser",
    title: "Wiser",
    subtitle: "Learning what it means to help",
    description:
      "Two months teaching STEM in Muhuru Bay, Kenya An education in the limits of my own understanding",
    image: "/images/wiser.jpg",
    alt: "Yan walking outdoors in a purple Challenge yourself Empower yourself shirt",
    category: "Teaching & reflection",
    medium: "Muhuru Bay, Kenya",
    tone: "wiser",
  },
  {
    slug: "AA",
    title: "Porton Wallet",
    subtitle: "Making a wallet feel familiar",
    description:
      "Exploring a simpler way to use crypto through device-native authentication and account abstraction",
    image: "/images/aa.jpg",
    alt: "Account abstraction wallet system diagram",
    category: "Hackathon project",
    medium: "Product · Web3",
    tone: "wallet",
  },
  {
    slug: "multi-agent",
    title: "Getting agents to cooperate",
    subtitle: "Can a commitment change the outcome?",
    description:
      "Research on commitment devices and cooperation among generative agents ICML 2024 Agentic Markets Workshop",
    image: "/images/agent.jpg",
    alt: "Colored agents in a simulated game environment",
    category: "Research",
    medium: "Multi-agent systems",
    tone: "agents",
  },
];
export type Project = (typeof projects)[number];
