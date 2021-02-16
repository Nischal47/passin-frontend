import {AuthInterface} from "../interface/authInterface";
import * as actionTypes from "./authTypes";

const initialState:AuthInterface = {
    isAuthenticated: false,
    user: {
        id:0,
        firstName:'',
        lastName:'',
        email:'',
        dateOfBirth:''
    },
    registrationStatus:''
}

export default (state: AuthInterface = initialState,action:any) => {
    switch (action.type){
        case actionTypes.LOGIN_SUCCESS:{
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
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            localStorage.removeItem('token');
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