import {
  GET_SERVICE,
  GET_PROVIDER
} from '../types';

const INITIAL_STATE = {
  service: [],
  provider: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SERVICE:
      if (action.payload && action.payload.data.data) {
        const service = action.payload.data.data;
        console.log('reducer state ',service);
        state.service = service;
      }
      return Object.assign({}, state); 

    case GET_PROVIDER:
      if (action.payload && action.payload.data.data) {
        const provider = action.payload.data.data;
        state.provider = provider;
      }
      return Object.assign({}, state);   

    default:
      return state;
  }
};
