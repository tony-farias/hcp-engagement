/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        databricks: {
          orange: "#E27124",
          orangeLight: "#F4A537",
          orangeDeep: "#DD6E1E",
          navy: "#1F2A44",
          slate: "#445969",
          mint: "#00A972",
          sand: "#F9F7F4",
          blue: "#2D6FE0",
          bg: "#F4F5F8",
        },
        veeva: {
          blue: "#0066B2",
          ink: "#1A2B3C",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        ipad: "0 30px 60px -15px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(15, 23, 42, 0.05)",
      },
    },
  },
  plugins: [],
};
