import { visitAmazon, searchChairSorted } from "../support/pages/Amazon";

describe("Amazon E2E Test - Chair Search", () => {
  it("Search chair, sort by price high to low, pick rightmost non-sponsored in first row", () => {
    cy.viewport(1920, 1080);
    visitAmazon.goToHomePage();
    searchChairSorted.searchAndPickItem();
  });
});
