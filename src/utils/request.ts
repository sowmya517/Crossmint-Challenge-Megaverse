// src/utils/request.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiBaseURL = 'https://challenge.crossmint.io/api';

export const makeRequest = async <T = any>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE',
  data?: any,
  params?: any
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
  };
  return axios(config);
};
