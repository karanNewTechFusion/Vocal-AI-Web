module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0E0E10",
        accent: {
          blue: "#3A8DFF",
          purple: "#A259FF",
          pink: "#FF61C7",
        },
      },
      borderRadius: {
        xl: "2rem",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}; 