import authReducer from './authReducer';
import modalReducer from './modalReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authReducer,
    modalReducer
});

export default rootReducer;
