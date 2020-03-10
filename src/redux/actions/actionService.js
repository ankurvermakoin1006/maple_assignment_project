import {
  GET_SERVICE,
  GET_PROVIDER
} from '../types';
import myApiService from '../../core/api/apiService';

export const getServices = async()  => {
  const response = await myApiService('services'); 
  return {
    type: GET_SERVICE,
    payload: response
  };
};

export const getProviders =async() => {
  const request = await myApiService('providers');
  return {
    type: GET_PROVIDER,
    payload: request
  };
};


