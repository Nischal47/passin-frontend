import * as actionType from './modalType'
export const openModal = (mode?:string) => {
    return {
        type: actionType.OPEN_MODAL,
        mode: mode
    }
}

export const closeModal = () => {
    return {
        type: actionType.CLOSE_MODAL
    }
}
