import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["self-end", "self-start", "rounded-s-md", "rounded-e-md"],
  theme: {
    extend: {
      colors: {
        background: "rgb(12, 19, 23)",
        "header-color": "#202C33",
        "gray-850": "#111B21",
      },
      backgroundImage: {
        chat: "url('/bg-chat.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
