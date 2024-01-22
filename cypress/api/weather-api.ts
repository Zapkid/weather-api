import { weatherHistoryResponse } from "../types/weather-api-types";

const weatherApiUrl = "http://api.weatherapi.com/v1";
const weatherApiFixtureFilePath = "cypress/fixtures";

class WeatherAPI {
  saveWeatherHistory(apiKey: string, query: string, date: string): void {
    cy.api({
      method: "GET",
      url: `${weatherApiUrl}/history.json?key=${apiKey}&q=${query}&dt=${date}`,
    }).then((response: { status: number; body: weatherHistoryResponse }) => {
      expect(response.status, "Get response status").to.eq(200);
      const fileName = `${query}-${date}-response.json`;
      cy.writeFile(`${weatherApiFixtureFilePath}/${fileName}`, response.body);
      cy.fixture(fileName).then((apiResponseData: weatherHistoryResponse) => {
        const now = new Date().getTime() / 1000;
        const twoSeconds = 2_000;
        expect(
          now - apiResponseData.location.localtime_epoch,
          "Verify fixture file updated"
        ).to.lt(twoSeconds);
      });
    });
  }
}

export const weatherAPI = new WeatherAPI();
