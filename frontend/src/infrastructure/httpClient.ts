import axios from "axios";
import config from "./config";

const useHttpClient = () => {
  const httpClient = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  return { httpClient };
};

export default useHttpClient;
