import { combineReducers } from 'redux';
import { userReducers } from './userReducers';

const rootReducer = combineReducers({
  user: userReducers,
});

export default rootReducer;
