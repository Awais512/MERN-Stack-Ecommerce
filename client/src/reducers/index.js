import { combineReducers } from 'redux';
import { cartReducers } from './cartReducers';
import { searchReducers } from './searchReducers';
import { userReducers } from './userReducers';

const rootReducer = combineReducers({
  user: userReducers,
  search: searchReducers,
  cart: cartReducers,
});

export default rootReducer;
