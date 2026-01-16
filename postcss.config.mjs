/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},  // 👈 @tailwindcss/postcss 가 아니라 그냥 tailwindcss 여야 합니다.
    autoprefixer: {},
  },
};

export default config;