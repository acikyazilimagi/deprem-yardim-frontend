const path = require("path");

const buildEslintCommand = (filenames) => `npx next lint --fix`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{js,jsx,ts,tsx,css,svg}": ["npx prettier --write"],
};
