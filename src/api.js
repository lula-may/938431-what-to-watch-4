import axios from "axios";

const LOAD_TIMEOUT = 5000;
const BASE_URL = `https://4.react.pages.academy/wtw`;

const Error = {
  UNAUTHORIZED: 401,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: LOAD_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;
    if (response && response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
