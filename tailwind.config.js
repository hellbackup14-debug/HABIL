/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ink: {
          950: "#06060A",
          900: "#0B0B0F",
          800: "#12121A",
          700: "#1A1A25",
          100: "#EAEAF2",
          50: "#F6F6FB",
        },
        gold: {
          400: "#C8A96A",
          300: "#D9BF8A",
          200: "#E8D7B1",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "Noto Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
