import { combineReducers } from 'redux';
import { cartReducers } from './cartReducers';
import { searchReducers } from './searchReducers';
import { userReducers } from './userReducers';
import { drawerReducer } from './drawerReducer';

const rootReducer = combineReducers({
  user: userReducers,
  search: searchReducers,
  cart: cartReducers,
  drawer: drawerReducer,
});

export default rootReducer;
