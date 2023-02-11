const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "tr",
    locales: ["en", "tr", "jp"],
    localePath: path.resolve("./public/locales"),
  },
};
