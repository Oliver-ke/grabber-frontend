import { combineReducers } from 'redux';
import authReducer from './auth';
import discountReducer from './discount';
import userDiscountReducer from './userDiscount';
import errorReducer from './error';
export default combineReducers({
	auth: authReducer,
	discount: discountReducer,
	userDiscount: userDiscountReducer,
	errors: errorReducer
});
