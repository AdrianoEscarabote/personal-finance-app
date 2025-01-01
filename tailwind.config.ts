import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        "beige-500": "var(--beige-500)",
        "beige-100": "var(--beige-100)",
        "grey-900": "var(--grey-900)",
        "grey-500": "var(--grey-500)",
        "grey-300": "var(--grey-300)",
        "grey-100": "var(--grey-100)",
        green: "var(--green)",
        yellow: "var(--yellow)",
        cyan: "var(--cyan)",
        navy: "var(--navy)",
        red: "var(--red)",
        purple: "var(--purple)",
        "purple-secondary": "var(--purple-secondary)",
        turquiose: "var(--turquiose)",
        brown: "var(--brown)",
        magenta: "var(--magenta)",
        blue: "var(--blue)",
        "navy-grey": "var(--navy-grey)",
        "army-green": "var(--army-green)",
        gold: "var(--gold)",
        orange: "var(--orange)",
      },
    },
  },
  plugins: [],
} satisfies Config;
