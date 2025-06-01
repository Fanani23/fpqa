// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.agoda.com",
    env: {
      AGODA_URL: "https://www.agoda.com",
      AMAZON_URL: "https://www.amazon.com",
      YOUTUBE_URL: "https://www.youtube.com",
    },
    supportFile: "cypress/support/e2e.js",
    video: true,
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
  },
});
