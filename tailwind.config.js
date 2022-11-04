module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: { home: "calc(100vh - 79px)", data: "calc(100vh - 96px)" },
      maxHeight: { home: "calc(100vh - 100px)" },
    },
  },
  plugins: [],
};
