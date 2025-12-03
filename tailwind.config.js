/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./app/(screens)/**/*.{ts,tsx}",
    "./app/(tabs)/**/*.{ts,tsx}",
    "./app/(drawers)/**/*.{ts,tsx}",
    "./app/(admin)/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
     "./src/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
