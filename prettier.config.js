/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-packagejson'],
  tailwindFunctions: ['cx', 'cva'],
};

export default config;
