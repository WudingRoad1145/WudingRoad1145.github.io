import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      zIndex: {
        // Add custom z-index values
        '-1': '-1', // For background layering
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50', // High-priority elements
      },
    },
  },
  plugins: [],
};
export default config;
