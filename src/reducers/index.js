import { combineReducers } from 'redux';
import authReducer from './auth';
import discountReducer from './discount';
import errorReducer from './error';
export default combineReducers({
	auth: authReducer,
	discount: discountReducer,
	errors: errorReducer
});
