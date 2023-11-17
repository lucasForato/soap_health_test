import axios from "axios";
import config from "./config";

const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default httpClient;
