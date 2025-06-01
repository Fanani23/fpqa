const { booker } = require("../fixtures/booker");
const agodaPage = require("../support/pages/Agoda");

describe("Agoda flight booking", () => {
  it("should book earliest Malaysia Airlines flight for tomorrow", () => {
    let data = {
      origin: booker.origin,
      destination: booker.destination,
      date: Cypress.dayjs().add(1, "day").format("ddd MMM DD YYYY"),
    };

    let contact = {
      firstName: booker.contactDetail.firstName,
      lastName: booker.contactDetail.lastName,
      email: booker.contactDetail.email,
      country: booker.contactDetail.contact,
      country: booker.contactDetail.countryCode,
      phone: booker.contactDetail.phone,
    };

    let passenger = {
      gender: booker.passenger.gender,
      firstName: booker.passenger.firstName,
      lastName: booker.passenger.lastName,
      fullName: booker.passenger.fullName,
      dateOfBirth: {
        day: booker.passenger.dateOfBirth.day,
        month: booker.passenger.dateOfBirth.month,
        year: booker.passenger.dateOfBirth.year,
      },
      nationality: booker.passenger.nationality,
      country: booker.passenger.country,
      passport: {
        number: booker.passenger.passport.number,
        expired: {
          day: booker.passenger.passport.expired.day,
          month: booker.passenger.passport.expired.month,
          year: booker.passenger.passport.expired.year,
        },
      },
    };

    let payment = {
      contact,
      passenger,
    };

    agodaPage.searchFlight({ data });
    agodaPage.selectEarliestMalaysiaAirlines();
    agodaPage.fillPassengerDetails({ data, payment });
  });
});
