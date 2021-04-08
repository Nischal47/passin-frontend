import * as actionTypes from './homeTypes';
import store from "../../../store/store";
import {GetRequest, PostRequest} from "../../../plugins/axios";
import {setToasterState} from "../../../common/toaster/services/toasterAction";
import {
    AddPasswordInterface,
    DecryptPasswordInterface,
    DeletePasswordInterface,
    UpdatePasswordInterface
} from "../interface/homeInterfaces";

const getPasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/get-passwords'
const getPasswordByIdUrl = process.env.REACT_APP_API_BASE_URL+'passwords/get-password'
const addPasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/save-password'
const decryptPasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/decrypt-password'
const deletePasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/delete-password'
const updatePasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/update-password'

const getPasswordsSuccess = (payload:any) => {
    return{
        type:actionTypes.GET_PASSWORDS_SUCCESS,
        payload:payload
    }
}

const getPasswordByIdSuccess = (payload:any) => {
    return{
        type:actionTypes.GET_PASSWORD_BY_ID_SUCCESS,
        payload:payload
    }
}

const getPasswordsFail = () => {
    return{
        type:actionTypes.GET_PASSWORDS_FAIL,
    }
}

const getPasswordByIdFail = () => {
    return{
        type:actionTypes.GET_PASSWORD_BY_ID_FAIL,
    }
}

const decryptPasswordSuccess = (payload:any) => {
    return{
        type:actionTypes.DECRYPT_PASSWORD_SUCCESS,
        payload: payload
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

export const getPasswordById = (passwordId:number) => async (dispatch:any) => {

    GetRequest(getPasswordByIdUrl,{'password-id':passwordId},{})
        .then((response:any) => {
            dispatch(getPasswordByIdSuccess(response.data));
        })
        .catch((error:any) => {
            dispatch(getPasswordByIdFail());
        })
}

export const addPassword = (payload: AddPasswordInterface) => async (dispatch: any) => {
    const userId = store.getState().authReducer?.user?.id;
    await PostRequest(addPasswordUrl, {
        'hostName': payload.hostName,
        'email': payload.email,
        'password': payload.password,
        'originalPassword': payload.originalPassword,
        'userId': userId
    }, {})
        .then((response: any) => {
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Add Password Success",
                message: `${response.data.message}`
            }));
        })
        .catch((error: any) => {
            console.log('error',error)
            let errorMessage: string = '';
            if (error.response) {
                errorMessage = error.response.data.message;
            } else if (error.request) {
                errorMessage = error.request.message;
            } else {
                errorMessage = "Can't access server";
            }
            dispatch(setToasterState({
                appear: true,
                title: "error",
                name: "Add Password Error",
                message: `${errorMessage}`
            }));
        });
}

export const updatePassword = (payload: UpdatePasswordInterface) => async (dispatch: any) => {
    const userId = store.getState().authReducer?.user?.id;
    await PostRequest(updatePasswordUrl, {
        'hostName': payload.hostName,
        'email': payload.email,
        'password': payload.password,
        'originalPassword': payload.originalPassword,
        'userId': userId,
        'passwordId': payload.passwordId
    }, {})
        .then((response: any) => {
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Update Password Success",
                message: `${response.data.message}`
            }));
        })
        .catch((error: any) => {
            console.log('error',error)
            let errorMessage: string = '';
            if (error.response) {
                errorMessage = error.response.data.message;
            } else if (error.request) {
                errorMessage = error.request.message;
            } else {
                errorMessage = "Can't access server";
            }
            dispatch(setToasterState({
                appear: true,
                title: "error",
                name: "Update Password Error",
                message: `${errorMessage}`
            }));
        });
}

export const decryptPassword = (payload: DecryptPasswordInterface) => async (dispatch:any) => {
    await PostRequest(decryptPasswordUrl, {
        'originalPassword':payload.originalPassword,
        'passwordId':payload.passwordId
    }, {})
        .then((response: any) => {
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Add Password Success",
                message: `${response.data.message}`
            }));
            dispatch(decryptPasswordSuccess(response.data));
        })
        .catch((error: any) => {
            let errorMessage: string = '';
            if (error.response) {
                errorMessage = error.response.data.message;
            } else if (error.request) {
                errorMessage = error.request.message;
            } else {
                errorMessage = "Can't access server";
            }
            dispatch(setToasterState({
                appear: true,
                title: "error",
                name: "Decrypt Password Error",
                message: `${errorMessage}`
            }));
        });
}

export const deletePassword = (payload: DeletePasswordInterface) => async  (dispatch:any) => {
    await PostRequest(deletePasswordUrl, {
        'originalPassword':payload.originalPassword,
        'passwordId':payload.passwordId,
        'userId':payload.userId
    }, {})
        .then((response: any) => {
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Add Password Success",
                message: `${response.data.message}`
            }));
            dispatch(decryptPasswordSuccess(response.data));
        })
        .catch((error: any) => {
            let errorMessage: string = '';
            if (error.response) {
                errorMessage = error.response.data.message;
            } else if (error.request) {
                errorMessage = error.request.message;
            } else {
                errorMessage = "Can't access server";
            }
            dispatch(setToasterState({
                appear: true,
                title: "error",
                name: "Decrypt Password Error",
                message: `${errorMessage}`
            }));
        });
}

