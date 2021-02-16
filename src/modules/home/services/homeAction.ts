import * as actionTypes from './homeTypes';
import store from "../../../store/store";
import {GetRequest} from "../../../plugins/axios";

const getPasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/get-passwords'

const getPasswordsSuccess = (payload:any) => {
    return{
        type:actionTypes.GET_PASSWORDS_SUCCESS,
        payload:payload
    }
}

const getPasswordsFail = () => {
    return{
        type:actionTypes.GET_PASSWORDS_FAIL,
    }
}

export const getPasswords = () => async (dispatch:any) => {
    const userId = store.getState().authReducer?.user?.id;

    GetRequest(getPasswordUrl, { 'user-id': userId }, {})
        .then((response: any) => {
            dispatch(getPasswordsSuccess(response.data));
        })
        .catch((error: any) => {
            dispatch(getPasswordsFail());
        })
}