export interface ModalStateInterface {
    isOpenModal: boolean
    modalMode?:string
}

export interface ModalPropsInterface {
    children?: JSX.Element[] | JSX.Element
}
