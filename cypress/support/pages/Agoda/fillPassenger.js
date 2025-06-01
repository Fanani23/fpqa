import dayjs from "dayjs";
Cypress.dayjs = dayjs;

import { selectors } from "../../selector";

const { agoda } = selectors;

const fillPassenger = ({ data, payment }) => {
  cy.xpath(agoda.passengerFirstName).clear().type(payment.contact.firstName);
  cy.xpath(agoda.passengerLastName).clear().type(payment.contact.lastName);
  cy.xpath(agoda.passengerEmail).clear().type(payment.contact.email);

  cy.xpath(agoda.passengerCountry).click();
  cy.xpath(agoda.searchInputDropdown).clear().type(payment.contact.country);
  cy.xpath(agoda.selectInputDropdown).click();

  cy.get(agoda.body).click(0, 0);

  cy.xpath(agoda.passengerContact).click();
  cy.xpath(agoda.searchInputDropdown).clear().type(payment.contact.country);
  cy.xpath(agoda.selectInputDropdown).click();

  cy.get(agoda.body).click(0, 0);

  cy.xpath(agoda.passengerContactNumber).clear().type(payment.contact.phone);

  cy.get(agoda.checkoutPrice)
    .invoke("text")
    .then((text) => {
      console.log("Harga disimpan:", text);
      window.localStorage.setItem("checkout_price", text);
    });

  const xpathGender = agoda.passengerDetailGender.replace(
    "%s",
    payment.passenger.gender
  );
  cy.xpath(xpathGender).click();

  cy.xpath(agoda.passengerDetailFirstName)
    .clear()
    .type(payment.passenger.firstName);
  cy.xpath(agoda.passengerDetailLastName)
    .clear()
    .type(payment.passenger.lastName);

  cy.get(agoda.passengerDetailDoBDay)
    .clear()
    .type(payment.passenger.dateOfBirth.day);

  cy.xpath(agoda.passengerDetailDoBMonth).click();

  const monthName = payment.passenger.dateOfBirth.month;
  const monthIndex = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  }[monthName];
  const monthElement = agoda.monthSelector.replace("%s", monthIndex);
  cy.get(monthElement).click();

  cy.get(agoda.passengerDetailDoBYear)
    .clear()
    .type(payment.passenger.dateOfBirth.year);

  cy.get(agoda.passengerNationality).click();
  cy.xpath(agoda.searchInputDropdown)
    .clear()
    .type(payment.passenger.nationality);
  cy.xpath(agoda.selectInputDropdown).click();

  cy.get(agoda.body).click(0, 0);

  cy.xpath(agoda.passengerPassport).then(($el) => {
    if ($el.length > 0) {
      cy.wrap($el)
        .first()
        .clear()
        .type(payment.passenger.passport.number.toString());

      cy.get(agoda.passengerPassportOfIssue).click();

      cy.xpath(agoda.searchInputDropdown)
        .clear()
        .type(payment.passenger.nationality);

      cy.xpath(agoda.selectInputDropdown).click();

      cy.get(agoda.passportExpiredDay).type(
        payment.passenger.passport.expired.day
      );

      cy.get(agoda.passportExpiredMonth).click();

      const expMonthName = payment.passenger.passport.expired.month;
      const expMonthIndex = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      }[expMonthName];

      const expMonthElement = agoda.monthSelector.replace("%s", expMonthIndex);

      cy.xpath(expMonthElement).click();

      cy.get(agoda.passportExpiredYear)
        .clear()
        .type(payment.passenger.passport.expired.year);

      cy.wait(10000);
    } else {
      cy.log("Passport field not found, skipping this section.");
    }
  });

  cy.xpath(agoda.buttonAddons)
    .should("exist")
    .should("be.visible")
    .should("not.be.disabled")
    .click({ force: true });

  cy.wait(10000);

  cy.xpath(agoda.buttonContinueToPayment).click();

  cy.wait(10000);

  cy.get(agoda.closeIcon).click();

  cy.wait(10000);

  cy.contains(data.origin).should("exist");
  cy.contains(payment.passenger.fullName).should("exist");
  cy.contains(data.destination).should("exist");

  cy.window().then((win) => {
    const price = win.localStorage.getItem("checkout_price");
    expect(price).to.exist;
    cy.log("Harga dari localStorage: " + price);
  });
};

export default fillPassenger;
