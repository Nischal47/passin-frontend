import * as actionTypes from './toasterType'
import {ToasterStateInterface} from "../interface/toasterInterface";

// title state must be:
//Error or Success

const initialState: ToasterStateInterface = {
    appear: false,
    title: "",
    name: "",
    message: "",
};

const toasterReducer = (state = initialState, action: any) => {
    const {
        type,
        appear,
        title,
        name,
        message
    } = action
    switch (type) {
        case actionTypes.SET_TOASTER:
            return {
                ...state,
                appear: appear,
                title: title,
                name: name,
                message: message,
            };
        default:
            return state;
    }
};

export default toasterReducer;
