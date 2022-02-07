module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "860px",
        xl: "1024px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
