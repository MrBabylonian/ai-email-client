/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "always",
  printWidth: 120,
  tabWidth: 4,
  useTabs: false,
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};
