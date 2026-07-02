/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // From globals.css
        ink: "#1a1040",
        soft: "#4a3f6b",
        warm: "#faf8f4",
        paper: "#f2ede6",
        coral: "#d85a30",
        gold: "#c8940a",
        teal: "#0f6e56",
        purple: "#534ab7",
        border: "#e2dbd0",
        white: "#fff",
        // From aios.css
        bg: "#080808",
        "bg-1": "#0D0D0D",
        "bg-2": "#121212",
        "bg-3": "#1A1A1A",
        "border-subtle": "#161616",
        "text-2": "#9A9894",
        "text-3": "#555552",
        accent: "#C8A96E",
        "accent-light": "#D9BA80",
        "accent-dim": "rgba(200,169,110,0.10)",
        "accent-dim-2": "rgba(200,169,110,0.05)",
        red: "#C05252",
        // From archetype-layout.css
        primary: "#C94F2A",
        "primary-soft": "#FEF0EA",
        ivory: "#FAF8F4",
        "gold-2": "#E8A020",
        secondary: "#0C6B51",
        "secondary-soft": "#E1F5EE",
        "accent-alt": "#534AB7",
        "accent-soft": "#EEEDFE",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        5: "48px",
        6: "64px",
        7: "96px",
        8: "128px",
        9: "160px",
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "6px",
        lg: "10px",
        xl: "18px",
        "40px": "40px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        content: "1100px",
        wide: "1360px",
        700: "700px",
      },
      width: {
        15: "60px",
      },
      height: {
        "9.5": "38px",
        30: "120px",
      },
      zIndex: {
        120: "120",
        99: "99",
        999: "999",
        9999: "9999",
      },
      backdropBlur: {
        xs: "8px",
        sm: "14px",
        lg: "18px",
      },
      borderWidth: {
        1.5: "1.5px",
        3: "3px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
