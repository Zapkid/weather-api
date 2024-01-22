import { Format, Protocol } from "../enums/weather-api-enums";

export const jsonClass = {
  key: ".hljs-attr",
  value: ".hljs-string",
};

class WeatherApiSearchPage {
  getApiKeyInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[id*="APIKey"]');
  }

  typeApiKey(apiKey: string): void {
    this.getApiKeyInput().type(apiKey);
  }

  getProtocolDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('select[id*="Protocol"]');
  }

  selectProtocol(protocol: Protocol): void {
    this.getProtocolDropdown().select(protocol);
  }

  getFormatDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('select[id*="Format"]');
  }

  selectFormat(format: Format): void {
    this.getFormatDropdown().select(format);
  }

  getQueryInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[name*="txtQ"]');
  }

  typeQuery(query: string): void {
    this.getQueryInput().clear().type(query);
  }

  getCurrentSection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("#current");
  }

  getShowResponseButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("#current .btn-primary");
  }

  clickShowResponseButton(): void {
    this.getShowResponseButton().click();
  }

  getResponseCode(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("code").last();
  }
}

export const weatherApiSearchPage = new WeatherApiSearchPage();
