import React from 'react';

const Confirmation = (props:any)=>{
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
                            <i className="material-icons" onClick={props.closeModal} >clear</i>
                        </div>
                    </div>
                    <div className="modal-elements">
                        <div className="confirm">
                            <div className="dialog-content text-center my-lg title-sm">
                                {props.content}
                            </div>
                            <div className="buttons-area flex justify-end">
                                <button className="btn primary" onClick={props.confirm}>Confirm</button>
                                <button className="btn primary outlined ml-xs" onClick={props.closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
    )
}

export default Confirmation;