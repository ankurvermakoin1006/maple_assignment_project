import { combineReducers } from 'redux';
import Service from './reducerService';

const appReducer = combineReducers({
  state: (state = {}) => state,
  Service
});

const rootReducer = (state, action) => {
  if (action.type === 'GET_SERVICE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
