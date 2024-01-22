# Cypress Weather API & UI automation project

This project contains Cypress tests for the [WeatherAPI](https://www.weatherapi.com/docs "WeatherAPI Docs") service, including API and UI tests on the WeatherAPI [Explorer](https://www.weatherapi.com/api-explorer.aspx#search "Interactive API Explorer").

## Running tests with one click

1. Run tests by running `run-tests` scripts in `package.json`. \
   Cypress will run the tests in cypress 'run' mode.

- Run in headless mode to review results in terminal only. \
- Run in headed mode to also see the test running in the browser (browser will close after each file tests have completed).

For a better test review experience with tons of benefits, open the Cypress app & run tests from there in cypress 'open' mode.

## Running tests with Cypress in 'open' mode (5 clicks)

1. Run the `open-cypress` script in `package.json`.
2. The Cypress app will open (will ask for network discoverability permissions).
   ![Cypress Dashboard](cypress/assets/Cypress%20app.png "Cypress Dashboard")
3. Choose 'E2E Testing'.
   ![Cypress Browsers](cypress/assets/Cypress%20choose%20browser.png "Cypress Browsers")
4. Choose Browser - special cypress browser will open.
   ![Cypress Specs](cypress/assets/Cypress%20specs.png "Cypress Test")
5. Choose tests file to run - API or UI tests file.

### [Cypress Key Features](https://docs.cypress.io/guides/overview/why-cypress#Features)

- **Cypress runs inside the browser** - giving it direct access, unlike other tools which interact with the browser using a middleware driver. This means Cypress can fire & listen to events directly.

- **Cypress Time Machine** - Examine test execution step by step.

- **Logs, Screenshots & Videos** - Easily [debug](https://docs.cypress.io/guides/guides/debugging) with helpful Cypress logs, screenshots & videos taken on test failure.

### Troubleshooting

1. Expired API Key - Generate a new API key & replace in `cypress.env.json`.
