import axios from "axios";

const weatherApiClient = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  params: {
    key: "60c0c4904e5c441fbb2224126241812",
  },
});

export default weatherApiClient;
