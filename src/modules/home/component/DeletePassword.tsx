import React, {useState} from 'react';
import store from "../../../store/store";
import {ValidateInput} from "../../../utills/customHooks/validateForm";
import PasswordRule from "../PasswordRule";


const DeletePassword = (props: any) => {

    const [originalPassword, setOriginalPassword] = useState<String>('');
    const [errors, setErrors] = useState<String>('');

    const userId = store.getState().authReducer?.user?.id;

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors({
            ...errors,
            [event.target.name]: ''
        })
        setOriginalPassword(
             event.target.value
        );
    }

    const confirmAction = async () => {
        let errorMessage: any = ValidateInput("Password", originalPassword.toString(), PasswordRule);
        setErrors({...errorMessage});
        let validated = Object.values(errorMessage).join('').length === 0;
        if (validated) {
            await props.deletePassword({'userId': userId, 'passwordId': props.passwordId,'originalPassword': originalPassword,});
            props.closeModal();
        }
    }

    return (
        <>
            {
                props.show
                && <div className="modal flex-centered">
                    <div className="modal-backdrop full-width full-height" onClick={() => props.closeModal()}/>
                    <div className="modal-body card outline">
                        <div className="header flex justify-between ">
                            <div className="modal-header title-xs bold text-primary">{props.title}</div>
                            <div className="modal-close flex-centered">
                                <i className="material-icons" onClick={props.closeModal}>clear</i>
                            </div>
                        </div>
                        <div className="modal-elements">
                            <div className="confirm">
                                <div className="dialog-content text-center my-lg title-sm">
                                    {props.content}
                                </div>
                               <div className="full-width mb-xl">
                                   <input className="full-width" type="password" name="password" placeholder="Enter Original Password"
                                          onChange={inputHandler}/>
                               </div>
                                <div className="buttons-area flex justify-end">
                                    <button className="btn primary" onClick={confirmAction}>Confirm</button>
                                    <button className="btn primary outlined ml-xs" onClick={props.closeModal}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DeletePassword;