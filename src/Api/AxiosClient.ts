import { handleApiError, handleRequest, handleResponse } from './ClientHelper';
import Axios from 'axios';

export function axiosClient(baseURL:string) {
  const clientInstance = Axios.create({
    baseURL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  clientInstance.interceptors.request.use(handleRequest);
  clientInstance.interceptors.response.use(handleResponse, handleApiError);
  clientInstance.defaults.timeout === 15000;
  return clientInstance;
}
