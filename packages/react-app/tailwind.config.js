module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,css}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: "12px",
      md: "16px",
      lg: "20px",
      "2xs": "24px",
      "2md": "32px",
      "3xs": "36px",
      "2lg": "40px",
      "4xs": "48px",
      "4md": "64px",
      "6md": ["96px", "97px"],
    },
    screens: {
      xl: { max: "1800px" },
      lg: { max: "1280px" },
      md: { max: "1024px" },
      sm: { max: "768px" },
    },
    extend: {
      fontFamily: {
        rb2: ["Rainbow2000"],
        "rb2-b": ["Rainbow2000Bold"],
        "rb2-i": ["Rainbow2000Italic"],
        pzl: ["Pinzelan"],
      },
      colors: {
        ptext: "var(--primary-text-color)",
        theme: "var(--theme-color)",
        theme2: "var(--theme-color-2)",
      },
      spacing: {
        "68px": "68px",
        "120px": "120px",
      },
      textColor: {
        pred: "#FF3E3E",
        pgreen: "#63AC44",
        white70: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
