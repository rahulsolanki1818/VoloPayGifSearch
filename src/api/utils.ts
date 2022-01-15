import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import Config from 'react-native-config';

type CreateAxiosInstance = (baseURL: string) => AxiosInstance;
export const createAxiosInstance: CreateAxiosInstance = baseURL => {
  const api = axios.create({
    baseURL,
    validateStatus: status => status >= 200 && status <= 500,
  });

  return api;
};

type ConfigInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;
export const globalUserTokenInterceptor: ConfigInterceptor = config => {
  if (!_.has(config, 'config.params.api_key')) {
    _.merge(config, { params: { api_key: Config.API_KEY } });
  }

  return config;
};

export const gifApiVersion = () => {
  if (_.isEmpty(Config.API_VERSION)) {
    console.warn(
      'API_VERSION is not configured, please set it in .env file. Defaulting to v1.',
    );
    return 'v1';
  }
  return Config.API_VERSION;
};
