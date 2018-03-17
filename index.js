var preTranslate = require('./bin/pre-translate').preTranslate;

module.exports = {
  // Extend website resources and html
  website: {
    assets: "./book",
    js: [
      "translator.js",
    ],
    css: [
      "translator.css",
    ],
  },

  // Hook process during build
  hooks: {
    // For all the hooks, this represent the current generator

    // This is called before the book is generated
    "page": function (page) {
      page.content = preTranslate(page.content);
      return page;
    },
  },
};
