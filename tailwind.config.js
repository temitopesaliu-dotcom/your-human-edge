/** @type {import('tailwindcss').Config} */
const config = {
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
        gold2: "#E8A020",
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
        0.75: "3px",
        1: "8px",
        1.25: "5px",
        1.75: "7px",
        2: "16px",
        3: "24px",
        3.25: "13px",
        3.75: "15px",
        4: "32px",
        4.25: "17px",
        4.5: "18px",
        5: "48px",
        5.5: "22px",
        6: "64px",
        6.5: "26px",
        7: "96px",
        7.5: "30px",
        8: "128px",
        8.5: "34px",
        9: "160px",
        9.5: "38px",
        13: "52px",
        18: "72px",
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "6px",
        lg: "10px",
        xl: "18px",
        "40px": "40px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      transitionDuration: {
        180: "180ms",
        250: "250ms",
        400: "400ms"
      },
      lineHeight: {
        7.5: "30px"
      },
      maxWidth: {
        content: "1100px",
        wide: "1360px",
        580: "580px",
        700: "700px"
      },
      width: {
        15: "60px"
      },
      height: {
        "9.5": "38px",
        30: "120px"
      },
      zIndex: {
        1: "1",
        120: "120",
        99: "99",
        999: "999",
        9999: "9999"
      },
      backdropBlur: {
        xs: "8px",
        sm: "14px",
        lg: "18px"
      },
      borderWidth: {
        1.5: "1.5px",
        3: "3px"
      }
    },
  },
  plugins: [],
};

export default config;
