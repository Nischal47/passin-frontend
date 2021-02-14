import {User} from "../interface/authInterface";
import * as actionTypes from "./AuthTypes";

interface AuthInterface {
    user: User,
    isAuthenticated: boolean
    registrationStatus: string
}

const initialState: AuthInterface = {
    isAuthenticated: false,
    user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: ''
    },
    registrationStatus: ''
}

export default (state: AuthInterface = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS: {
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            }
        }
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registrationStatus: action.payload.response
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return {
                ...state
            }
    }
}