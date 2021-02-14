import React from 'react';
import "./modal.scss";

const Modal = (props:any) => {
    return (
        <>
            {
                props.show
                && <div className="modal flex-centered">
                    <div className="modal-backdrop full-width full-height" onClick={() => props.closeModal()} />
                    <div className="modal-body card outline">
                        <div className="header flex justify-between ">
                            <div className="modal-header title-xs bold text-primary">{props.title}</div>
                            <div className="modal-close flex-centered">
                                <i className="material-icons" onClick={() => props.closeModal()} >clear</i>
                            </div>
                        </div>
                        <div className="modal-elements">
                            {
                                props.children
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Modal;
