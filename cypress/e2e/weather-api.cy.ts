import { testWeatherApi } from "../suites/weather-api-tests";
import { dateUtils } from "../support/utils";

testWeatherApi("Paris", dateUtils.getDateXDaysAgo(3), "Paris", "France");

testWeatherApi("Aviv", dateUtils.getDateXDaysAgo(5), "Tel Aviv", "Israel");

testWeatherApi(
  "Oxfor",
  dateUtils.getDateXDaysAgo(40),
  "Oxford",
  "United Kingdom"
);
