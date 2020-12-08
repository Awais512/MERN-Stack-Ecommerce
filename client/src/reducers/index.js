import { combineReducers } from 'redux';
import { cartReducers } from './cartReducers';
import { searchReducers } from './searchReducers';
import { userReducers } from './userReducers';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

const rootReducer = combineReducers({
  user: userReducers,
  search: searchReducers,
  cart: cartReducers,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
