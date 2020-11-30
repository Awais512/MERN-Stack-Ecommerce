import { combineReducers } from 'redux';
import { searchReducers } from './searchReducers';
import { userReducers } from './userReducers';

const rootReducer = combineReducers({
  user: userReducers,
  search: searchReducers,
});

export default rootReducer;
