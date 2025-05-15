module.exports = {
  locales: ["en", "en-US"],
  sourceLocale: "en-US",
  catalogs: [
    {
      path: "apps/client/src/locales/{locale}/messages",
      include: ["apps/client/src"],
    },
  ],
  format: "po",
}; 