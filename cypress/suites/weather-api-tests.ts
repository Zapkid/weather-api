import { weatherAPI } from "../api/weather-api";
import { Format, Protocol } from "../enums/weather-api-enums";
import {
  jsonClass,
  weatherApiSearchPage,
} from "../pages/weather-api-search-page";
import { weatherApiKey } from "../support/env";
import { dateUtils } from "../support/utils";
import { weatherHistoryResponse } from "../types/weather-api-types";

export function testWeatherApi(
  query: string,
  pastDate: string,
  expectedLocationName: string,
  expectedLocationCountry: string
) {
  describe(`Weather api tests for ${expectedLocationName} on ${pastDate}`, () => {
    let location: {
      name: string;
      country: string;
      localtime_epoch: number;
    };
    let data: {
      date: string;
      date_epoch: number;
      day: { maxtemp_c: number; mintemp_c: number; avgtemp_c: number };
      hour: { temp_c: number }[];
    };
    let date: string;
    let date_epoch: number;
    let day: { maxtemp_c: number; mintemp_c: number; avgtemp_c: number };
    let hourlyTemps: number[];
    let xDaysAgoResponseDate: Date;

    before("Save weather api response data", () => {
      weatherAPI.saveWeatherHistory(weatherApiKey, query, pastDate);
    });

    beforeEach("Prep data for tests", () => {
      cy.fixture(`${query}-${pastDate}-response.json`).then(
        (apiResponseData: weatherHistoryResponse) => {
          location = apiResponseData.location;
          data = apiResponseData.forecast.forecastday[0];
          date = data.date;
          date_epoch = data.date_epoch;
          day = data.day;
          hourlyTemps = data.hour.map(
            (hour: { temp_c: number }) => hour.temp_c
          );
          xDaysAgoResponseDate =
            dateUtils.getDateFromEpochTimestamp(date_epoch);
        }
      );
    });

    it(`Should verify location: ${expectedLocationName}`, () => {
      expect(location.name, "Location name").to.eq(expectedLocationName);
      expect(location.country, "Location country").to.eq(
        expectedLocationCountry
      );
    });

    it(`Should verify date: ${pastDate}`, () => {
      expect(date, "Date").to.eq(pastDate);
      expect(dateUtils.formatDate(xDaysAgoResponseDate), "Date Epoch").to.eq(
        pastDate
      );
    });

    it("Should verify max, min & avg Celsius values in correct range", () => {
      let totalTempRecorded: number = 0;
      for (const temp of hourlyTemps) {
        expect(
          temp,
          "Recorded hourly temperature greater or equals min temperature"
        ).to.be.gte(Number(day.mintemp_c));
        expect(
          temp,
          "Recorded hourly temperature lower or equals max temperature"
        ).to.be.lte(Number(day.maxtemp_c));

        totalTempRecorded = totalTempRecorded + temp;
      }

      expect(
        day.avgtemp_c,
        "Average temperature greater or equals min temperature"
      ).to.be.gte(Number(day.mintemp_c));
      expect(
        day.avgtemp_c,
        "Average temperature lower or equals max temperature"
      ).to.be.lte(Number(day.maxtemp_c));

      const calculatedAvgTemp = Number(
        (totalTempRecorded / hourlyTemps.length).toFixed(1)
      );
      expect(
        calculatedAvgTemp,
        "Calculated average temperature equals recorded avg temperature"
      ).to.eq(Number(day.avgtemp_c));
    });
  });
}

export function testWeatherApiExplorer(
  query: string,
  expectedLocationCountry: string
) {
  describe(`Weather api explorer web tests - Query: ${query}`, () => {
    beforeEach("Intercept api calls", () => {
      cy.visit("/");
      cy.intercept("/getheader.aspx").as("getheader");
    });

    it(`Should verify api search returns expected country: ${expectedLocationCountry}`, () => {
      weatherApiSearchPage.typeApiKey(weatherApiKey);
      weatherApiSearchPage.selectProtocol(Protocol.http);
      weatherApiSearchPage.selectFormat(Format.json);
      weatherApiSearchPage.typeQuery(query);
      weatherApiSearchPage
        .getCurrentSection()
        .scrollIntoView()
        .should("be.visible");
      weatherApiSearchPage.clickShowResponseButton();
      cy.wait("@getheader");

      weatherApiSearchPage
        .getResponseCode()
        .find(jsonClass.key)
        .contains("country");

      weatherApiSearchPage
        .getResponseCode()
        .find(jsonClass.value)
        .contains(`"${expectedLocationCountry}"`)
        .should("have.text", `"${expectedLocationCountry}"`);
    });
  });
}
