const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "tr",
    locales: ["en", "tr", "ar"],
    localePath: path.resolve("./public/locales"),
  },
};
