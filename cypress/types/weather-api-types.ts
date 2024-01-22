export type weatherHistoryResponse = {
  location: {
    name: string;
    country: string;
    localtime_epoch: number;
  };
  forecast: {
    forecastday: {
      date: string;
      date_epoch: number;
      day: { maxtemp_c: number; mintemp_c: number; avgtemp_c: number };
      hour: { temp_c: number }[];
    };
  };
};
