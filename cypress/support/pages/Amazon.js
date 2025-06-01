import selector from "../../support/selector/json/amazon.json";

export const visitAmazon = {
  goToHomePage: () => {
    cy.visit(Cypress.env("AMAZON_URL"));
    cy.get("body").then(($body) => {
      if ($body.find(selector.acceptCookies).length) {
        cy.get(selector.acceptCookies).click();
      }
    });
  },
};

export const searchChairSorted = {
  searchAndPickItem: () => {
    cy.get(selector.searchBox).type("chair{enter}");
    cy.url().should("include", "k=chair");

    cy.get("#a-autoid-0-announce").click();

    cy.get("#s-result-sort-select_2").click();
    cy.wait(10000);

    cy.get(selector.searchResult)
      .not(`:has(${selector.sponsoredTag})`)
      .then(($items) => {
        const firstRowItems = $items.slice(0, 5);
        const targetItem = firstRowItems[firstRowItems.length - 1];

        const name = targetItem
          .querySelector(selector.itemTitle)
          ?.innerText.trim();

        const fullPrice = targetItem
          .querySelector(selector.itemPriceFull)
          ?.innerText.trim();

        if (!name || !fullPrice) {
          throw new Error("❌ Gagal mengambil nama produk atau harga");
        }

        cy.log(`Product Name: ${name}`);
        cy.log(`Price: ${fullPrice}`);

        cy.wrap(targetItem).find(selector.itemTitle).click();

        cy.wait(5000);

        cy.contains(name, { matchCase: false }).should("exist");
        cy.contains(fullPrice).should("exist");
      });
  },
};
