import * as actionTypes from './homeTypes';
import {PasswordInterface} from "../interface/homeInterfaces";

interface HomeReducerInterface{
    passwords:PasswordInterface[],
    decryptedPassword:PasswordInterface[],
    password:PasswordInterface
}

const initialState: HomeReducerInterface = {
    passwords: [],
    decryptedPassword:[],
    password:{
        id:0,
        hostName:'',
        email:'',
        password:'',
        updatedOn:'',
        userId:0
    }
}

export default (state: HomeReducerInterface = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_PASSWORDS_SUCCESS:
            return {
                ...state,
                passwords:action.payload.passwordList
            }
        case actionTypes.GET_PASSWORD_BY_ID_SUCCESS:
            return {
                ...state,
                password:action.payload.password
            }
        case  actionTypes.DECRYPT_PASSWORD_SUCCESS:
            return {
                ...state,
                decryptedPassword: [...state.decryptedPassword, action.payload.decryptedPassword]
            }
        default:
            return state;
    }
}
