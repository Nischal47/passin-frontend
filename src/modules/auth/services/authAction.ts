import {setToasterState} from "../../../store/action";
import {LoginInterface, SignupInterface} from "../interface/authInterface";
import {PostRequest} from "../../../plugins/axios";
import * as actions from "../../../store/action";
import {ToasterStateInterface} from "../../../common/toaster/interface/toasterInterface";
import store from "../../../store/store";

const authenticationUrl = process.env.REACT_APP_API_BASE_URL + "users/login";
const registrationUrl = process.env.REACT_APP_API_BASE_URL + "users/register";
const logoutUrl = process.env.REACT_APP_API_BASE_URL + "users/logout";


const loginSuccess = (payload: any) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: payload
    }
}

const signupSuccess = (payload: any) => {
    return {
        type: 'REGISTER_SUCCESS',
        payload: payload
    }
}

const loginFailed = () => {
    return {
        type: 'LOGIN_FAIL',
    }
}

const logoutSuccess = () => {
    return {
        type: 'LOGOUT',
    }
}

export const authenticate = (payload: LoginInterface) => async (dispatch: any) => {
    await PostRequest(authenticationUrl, {'email': payload.email, 'password': payload.password}, {})
        .then((response: any) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            dispatch(loginSuccess(response.data));
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Authentication Success",
                message: `${response.data.message}`
            }));
        })
        .catch((error: any) => {
            dispatch(loginFailed());
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
                name: "Authentication Error",
                message: `${errorMessage}`
            }));
        });
}

export const signup = (payload: SignupInterface) => async (dispatch: any) => {
    await PostRequest(registrationUrl, {
        'firstName': payload.firstName,
        'lastName': payload.lastName,
        'dateOfBirth': payload.dateOfBirth,
        'email': payload.email,
        'password': payload.password
    }, {})
        .then((response: any) => {
            dispatch(signupSuccess(response.data));
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Authentication Success",
                message: `${response.data.message}`
            }));
        })
        .catch((error: any) => {
            dispatch(loginFailed());
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
                name: "Login Error",
                message: `${errorMessage}`
            }));
        });
}

export const checkAuthentication = () => (dispatch: any) => {
    let authUser = localStorage.getItem("user");
    if (authUser) {
        const userData = JSON.parse(authUser);
        const toasterState: ToasterStateInterface = {
            appear: true,
            title: "Success",
            name: "Login Success",
            message: `Welcome ${
                userData.email
            }`
        }
        dispatch(
            actions.setToasterState(toasterState)
        )
        dispatch(loginSuccess({user: userData}));
    } else if (authUser) {
        dispatch(loginFailed())
    }
}

export const logout = () => async (dispatch: any) => {
    const email = store.getState().authReducer?.user?.email;
    await PostRequest(logoutUrl, {'email': email}, {})
        .then((response: any) => {
            dispatch(signupSuccess(response.data));
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Logout Success",
                message: `${response.data.message}`
            }));
        })
        .catch((error: any) => {
            dispatch(loginFailed());
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
                name: "Logout Error",
                message: `${errorMessage}`
            }));
        });
    dispatch(logoutSuccess());
}
