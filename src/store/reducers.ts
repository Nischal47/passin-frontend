import { Reducer, combineReducers } from 'redux';
import modalReducer from "../common/modal/services/modalReducer";
import toasterReducer from "../common/toaster/services/toasterReducer";
import authReducer from '../modules/auth/services/authReducer'
import homeReducer from "../modules/home/services/homeReducer";

const rootReducer: Reducer = combineReducers({
    modalReducer: modalReducer,
    toasterReducer: toasterReducer,
    authReducer: authReducer,
    homeReducer: homeReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
