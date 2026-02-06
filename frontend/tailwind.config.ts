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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        heroSection: "#111418",
        creamCategorySection: "#FFFCE4",
        ourMenuBlakcSection: "#111418",
        putihGaPutih: "rgb(247, 247, 247)",
        hitamGaHitam: "rgb(41,48,58)",
        oren: "#F97316",
        orenHover: "#F09E39",
      },
      textColor: {
        orange: "#F97316",
        hitamGaHitam: "rgb(41,48,58)",
        orenHover: "#F09E39",
        putihGaPutih: "rgb(247, 247, 247)",
        itemCoklat: "#5A5A5A",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        Jakarta_Sans: ["var(--font-Jakarta_Sans)", "sans-serif"],
        Darumadrop_One: ["var(--font-Darumadrop-One)", "sans-serif"],
        tangerine: "var(--font-tangerine)",
        italiana: "var(--font-italiana)",
        italianno: "var(--font-italianno)",
        monaSans :"var(--font-monaSans)",
        figtree :"var(--font-figtree)",
        jetsBrainsMono :"var(--font-jetsBrains-mono)",
        oswald :"var(--font-oswald)",
      },
      borderColor: {
        hitamGaHitam: "rgb(41,48,58)",
      },
    },
  },
  plugins: [],
} satisfies Config;
