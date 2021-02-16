import * as actionTypes from './homeTypes';
import {PasswordInterface} from "../interface/homeInterfaces";

interface HomeReducerInterface{
    passwords:PasswordInterface[]
}

const initialState: HomeReducerInterface = {
    passwords: []
}

export default (state: HomeReducerInterface = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.GET_PASSWORDS_SUCCESS:
            return {
                ...state,
                passwords:action.payload.passwordList
            }
        default:
            return state;
    }
}
