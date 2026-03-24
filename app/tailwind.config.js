/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF4458",
        "background-light": "#F8F5F6",
        "background-dark": "#0F172A",
        "chat-received": "#1E293B",
        "accent-purple": "#A855F7",
      },
      fontFamily: {
        display: ["PlusJakartaSans_400Regular", "sans-serif"],
        "display-medium": ["PlusJakartaSans_500Medium", "sans-serif"],
        "display-semibold": ["PlusJakartaSans_600SemiBold", "sans-serif"],
        "display-bold": ["PlusJakartaSans_700Bold", "sans-serif"],
        "display-extrabold": ["PlusJakartaSans_800ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
