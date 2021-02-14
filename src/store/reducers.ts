import { Reducer, combineReducers } from 'redux';
import modalReducer from "../common/modal/services/modalReducer";
import toasterReducer from "../common/toaster/services/toasterReducer";
import authReducer from '../modules/auth/store/AuthReducers'

const rootReducer: Reducer = combineReducers({
    modalReducer: modalReducer,
    toasterReducer: toasterReducer,
    authReducer: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
