module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      rb2: ["Rainbow2000"],
      "rb2-b": ["Rainbow2000Bold"],
      "rb2-i": ["Rainbow2000Italic"],
    },
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
    colors: {
      white: "#ffffff",
      ptext: "var(--primary-text-color)",
      theme: "var(--theme-color)",
      theme2: "var(--theme-color-2)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
