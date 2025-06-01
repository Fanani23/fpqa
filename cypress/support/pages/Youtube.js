import selector from "../selector/json/youtube.json";

export const visitYoutube = {
  visit: () => {
    cy.visit(Cypress.env("YOUTUBE_URL"));
  },
};

export const watchMovieTrending = {
  watchTrendingVideo: () => {
    cy.get(selector.sidebarButton).click();
    cy.contains("Trending").click();
    cy.get(selector.movieButton).should("be.visible").click();
    cy.wait(1000);
    cy.get(selector.videoList)
      .eq(2)
      .within(() => {
        cy.get(selector.videoTittle).invoke("text").as("videoTittle");
        cy.get(selector.channelName)
          .invoke("text")
          .then((text) => {
            cy.wrap(text).as("channelName");
          });
        cy.get(selector.videoTittle).click();
      });
    cy.get("@videoTittle").then((trendingTittle) => {
      cy.get(selector.videoTittleTrend).should("exist");
      cy.wait(1000);
      cy.get(selector.videoTittleTrend).should(
        "have.text",
        trendingTittle.trim()
      );
    });

    cy.get("@channelName").then((trendingChannel) => {
      cy.get(selector.channelNameTrend)
        .eq(0)
        .invoke("text")
        .then((actualChannel) => {
          const actual = actualChannel.replace(/\s+/g, " ").trim();
          const expected = trendingChannel.replace(/\s+/g, " ").trim();

          const removeDuplicateWords = (text) => {
            const words = text.split(" ");
            const uniqueWords = [...new Set(words)];
            return uniqueWords.join(" ");
          };

          const expectedCleaning = removeDuplicateWords(expected);

          expect(actual).to.eq(expectedCleaning);
        });
    });
  },
};
