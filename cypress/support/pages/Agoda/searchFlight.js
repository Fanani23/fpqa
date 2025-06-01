import dayjs from "dayjs";
Cypress.dayjs = dayjs;

import { selectors } from "../../selector";

const { agoda } = selectors;

const searchFlight = ({ data }) => {
  cy.visit(Cypress.env("AGODA_URL"));

  cy.contains(agoda.buttonFlights).click();

  cy.get(agoda.buttonClose).click();

  cy.get(agoda.searchOrigin).click().clear().type(data.origin);
  const xpathOrigin = agoda.inputOrigin.replace("%s", data.origin);
  cy.xpath(xpathOrigin).click();

  cy.get(agoda.searchDestination).click().clear().type(data.destination);
  const xpathDestination = agoda.inputDestination.replace(
    "%s",
    data.destination
  );
  cy.xpath(xpathDestination).click();

  const xpathDateFlight = agoda.dateFlight.replace("%s", data.date);
  cy.xpath(xpathDateFlight).click();

  cy.xpath(agoda.flightOccupacyOpen);
  cy.get("button", agoda.economy).click();
  cy.xpath(agoda.flightOccupacyClose).click();

  cy.contains(agoda.button, agoda.searchFlights).click();
};

export default searchFlight;
