export const projects = [
  {
    slug: "robotics",
    title: "A little arm, some big questions",
    subtitle: "On my workbench right now",
    description:
      "MuJoCo policy training and SO101 arm safety exploration Learning to act, and exploring when to pause",
    image: "/robotics/real-arm.png",
    alt: "My pink SO101 robot arm beside blue tape and a paper target",
    category: "Ongoing exploration",
    medium: "Robotics · Learning · Safety",
    tone: "robotics",
  },
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
    slug: "multi-agent",
    title: "Getting agents to cooperate",
    subtitle: "Helping agents cooperate when self-interest gets in the way",
    description:
      "How can agents collaborate instead of getting stuck in prisoner’s-dilemma dynamics? Exploring commitment devices at the ICML 2024 Agentic Markets Workshop",
    image: "/images/agent.jpg",
    alt: "Colored agents in a simulated game environment",
    category: "Research",
    medium: "Multi-agent systems",
    tone: "agents",
  },
];
export const archivedProjects = [
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
];
export type Project = (typeof projects)[number];
