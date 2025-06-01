import dayjs from "dayjs";
Cypress.dayjs = dayjs;

class AgodaPage {
  searchFlight({ data }) {
    cy.visit(Cypress.env("AGODA_URL"));
    cy.contains("Flights").click();

    cy.get("button[aria-label='Close']").click();

    cy.get("#flight-origin-search-input").click().clear().type(data.origin);
    cy.xpath(`//li[@aria-label='Destination ${data.origin}']`).click();

    cy.get("#flight-destination-search-input")
      .click()
      .clear()
      .type(data.destination);
    cy.xpath(`//li[@aria-label='Destination ${data.destination}']`).click();

    cy.xpath(
      `//div[contains(@aria-label,'${data.date}')]//div[contains(@class,'PriceSurgePicker-Day__circle')]`
    ).click();

    cy.xpath(
      "//i[@class='ficon ficon-12 ficon-thin-arrow-down FlightSearchOccupancy__ArrowDown']"
    );

    cy.contains("button", "Economy").click();

    cy.xpath(
      `//div[@id='flight-occupancy']//div[@class='Box-sc-kv6pi1-0 hRUYUu IconBox__wrapper']`
    ).click();

    cy.contains("button", "SEARCH FLIGHTS").click();
  }

  selectEarliestMalaysiaAirlines() {
    cy.contains("button", "Filters").click();

    cy.contains("button", "Show all").click();

    cy.xpath(`(//p[normalize-space()='Malaysia Airlines'])[1]`).click();

    cy.contains("button", "Apply").click();

    cy.wait(5000);

    cy.contains("button", "Sort by").click();

    cy.contains("button", "FastestFastest first").click();

    cy.wait(10000);

    cy.xpath(`(//div[contains(@class,'')])[85]`).click();

    cy.wait(5000);

    cy.xpath(
      `//button[contains(@data-component,'flight-card-bookButton')]`
    ).click();
  }

  fillPassengerDetails({ data, payment }) {
    cy.xpath("//input[@id='contact.contactFirstName']")
      .clear()
      .type(payment.contact.firstName);
    cy.xpath("//input[@id='contact.contactLastName']")
      .clear()
      .type(payment.contact.lastName);
    cy.xpath("//input[@id='contact.contactEmail']")
      .clear()
      .type(payment.contact.email);

    cy.xpath(`(//button[@type='button'])[6]`).click();

    cy.xpath(`//input[contains(@placeholder,'Search')]`)
      .clear()
      .type(payment.contact.country);
    cy.xpath(`//input[@name='dropdown-list-item']`).click();
    cy.get("body").click(0, 0);

    cy.xpath(
      "//div[contains(@data-testid,'contact.contactPhoneNumber-CountryCodeDataTestId')]//div[contains(@class,'')]//div[contains(@class,'')]//div[contains(@class,'')]//div[contains(@class,'')]//div[contains(@class,'')]//button[contains(@type,'button')]"
    ).click();

    cy.xpath(`//input[contains(@placeholder,'Search')]`)
      .clear()
      .type(payment.contact.country);
    cy.xpath(`//input[@name='dropdown-list-item']`).click();
    cy.get("body").click(0, 0);

    cy.xpath(`//input[@id='contact.contactPhoneNumber']`)
      .clear()
      .type(payment.contact.phone);

    cy.get(
      '[data-component="breakdownlist-2"] > :nth-child(3) > .Descriptionstyled__DescriptionStyled-sc-i382wi-0 > .Spanstyled__SpanStyled-sc-16tp9kb-0'
    )
      .invoke("text")
      .then((text) => {
        console.log("Harga disimpan:", text);
        window.localStorage.setItem("checkout_price", text);
      });

    cy.xpath(`//p[normalize-space()="${payment.passenger.gender}"]`).click();

    cy.xpath(`//input[@id='flight.forms.i0.units.i0.passengerFirstName']`)
      .clear()
      .type(payment.passenger.firstName);

    cy.xpath(`//input[@id='flight.forms.i0.units.i0.passengerLastName']`)
      .clear()
      .type(payment.passenger.lastName);

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]'
    )
      .clear()
      .type(payment.passenger.dateOfBirth.day);

    cy.xpath('(//button[@type="button"])[12]').click();

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

    cy.get(
      `:nth-child(${monthIndex}) > label > .a5d86-bg-generic-base-transparent`
    ).click();

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]'
    )
      .clear()
      .type(payment.passenger.dateOfBirth.year);

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passengerNationality"] button'
    ).click();

    cy.xpath(`//input[contains(@placeholder,'Search')]`)
      .clear()
      .type(payment.passenger.nationality);

    cy.xpath(`//input[@name='dropdown-list-item']`).click();
    cy.get("body").click(0, 0);

    cy.xpath(`//input[@id='flight.forms.i0.units.i0.passportNumber']`)
      .first()
      .clear()
      .type(payment.passenger.passport.number.toString());

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"] button'
    ).click();

    cy.xpath(`//input[contains(@placeholder,'Search')]`)
      .clear()
      .type(payment.passenger.nationality);

    cy.xpath(`//input[@name='dropdown-list-item']`).click();
    cy.get("body").click(0, 0);

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]'
    ).type(payment.passenger.passport.expired.day);

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]'
    ).click();
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

    cy.get(
      `:nth-child(${expMonthIndex}) > label > .a5d86-bg-generic-base-transparent`
    ).click();

    cy.get(
      '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]'
    )
      .clear()
      .type(payment.passenger.passport.expired.year);

    cy.wait(10000);

    cy.xpath(
      "//button[contains(@data-component,'flight-continue-to-addOns-button')]"
    )
      .should("exist")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });

    cy.wait(10000);

    cy.xpath("//div[contains(text(),'Continue to payment')]").click();
    cy.wait(10000);

    cy.get(".a5d86-absolute > .a5d86-box").click();
    cy.wait(10000);

    cy.contains(data.origin).should("exist");
    cy.contains(payment.passenger.fullName).should("exist");
    cy.contains(data.destination).should("exist");

    cy.window().then((win) => {
      const price = win.localStorage.getItem("checkout_price");
      expect(price).to.exist;
      cy.log("Harga dari localStorage: " + price);
    });
  }
}

module.exports = new AgodaPage();
