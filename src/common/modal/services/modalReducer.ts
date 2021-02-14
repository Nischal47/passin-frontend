import * as actionTypes from './modalType'
import {ModalStateInterface} from "../interface/modalInteraface";

const initialState:ModalStateInterface = {
    isOpenModal:false,
    modalMode:""
}

const modalReducer =  (state = initialState, action:any) =>{
    const {type,mode } = action
    switch(type){
        case actionTypes.OPEN_MODAL:
            return{
                ...state,
                isOpenModal:true,
                modalMode: mode
            };
        case actionTypes.CLOSE_MODAL:
            return initialState
        default:
            return state
    }
}

export default modalReducer;
