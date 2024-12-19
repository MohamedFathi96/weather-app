import axios from "axios";

const weatherApiClient = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  params: {
    key: import.meta.env.VITE_WEATHER_API,
  },
});

export default weatherApiClient;
