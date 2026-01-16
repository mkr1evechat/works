
 // tailwind.config.ts
 import type { Config } from "tailwindcss";

 const config: Config = {
   darkMode: "class", // 👈 이 설정이 가장 중요합니다!
   content: [
     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
     "./components/**/*.{js,ts,jsx,tsx,mdx}",
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
     extend: {},
   },
   plugins: [
     require('@tailwindcss/aspect-ratio'),
   ],
 };
 export default config;
