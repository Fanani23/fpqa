import dayjs from "dayjs";
Cypress.dayjs = dayjs;

import { selectors } from "../../selector";

const { agoda } = selectors;

const selectEarliest = () => {
  cy.contains(agoda.button, agoda.filters).click();
  cy.contains(agoda.button, agoda.showAll);
  cy.xpath(agoda.malaysiaAirlines).click();
  cy.contains(agoda.button, agoda.apply).click();
  cy.wait(5000);
  cy.contains(agoda.button, agoda.sortBy).click();
  cy.contains(agoda.button, agoda.fastest).click();
  cy.wait(5000);
  cy.xpath(agoda.firstPlane).click();
  cy.wait(5000);
  cy.xpath(agoda.book).click();
};

export default selectEarliest;
