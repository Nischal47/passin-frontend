import {PostRequest} from "../../../plugins/axios";
import {setToasterState} from "../../../store/action";
import {LoginInterface, SignupInterface} from "../interface/authInterface";

const authenticationUrl = process.env.REACT_APP_API_BASE_URL+"users/login";
const registrationUrl = process.env.REACT_APP_API_BASE_URL+"users/register";

const loginSuccess = (payload:any)=>{
    return {
        type: 'LOGIN_SUCCESS',
        payload: payload
    }
}

const signupSuccess = (payload: any)=>{
    return {
        type: 'REGISTER_SUCCESS',
        payload: payload
    }
}

const loginFailed = ()=>{
    return {
        type: 'LOGIN_FAIL',
    }
}

export const authenticate = (payload: LoginInterface) => async (dispatch: any) => {
    await PostRequest(authenticationUrl, {'email': payload.email, 'password': payload.password}, {})
        .then((response: any) => {
            dispatch(loginSuccess(response.data));
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Authentication Success",
                message: `${response.data.message}`
            }));
        })
        .catch((errors: any) => {
            dispatch(loginFailed());
            const errorMessage = errors ? errors.response.data.message : errors;
            dispatch(setToasterState({
                appear: true,
                title: "error",
                name: "Authentication Error",
                message: `${errorMessage}`
            }));
        });
}

export const signup = (payload: SignupInterface) => async (dispatch: any) => {
    await PostRequest(registrationUrl, { 'firstName': payload.firstName, 'lastName': payload.lastName, 'dateOfBirth': payload.dateOfBirth,'email': payload.email, 'password': payload.password}, {})
        .then((response: any) => {
            dispatch(signupSuccess(response.data));
            dispatch(setToasterState({
                appear: true,
                title: "success",
                name: "Authentication Success",
                message: `${response.data.message}`
            }));
        })
        .catch((errors: any) => {
            dispatch(loginFailed());
            const errorMessage = errors ? errors.response.data.message : errors;
            dispatch(setToasterState({
                appear: true,
                title: "error",
                name: "Authentication Error",
                message: `${errorMessage}`
            }));
        });
}
