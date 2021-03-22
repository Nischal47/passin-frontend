import React, {useEffect, useState} from "react";
import {DecryptPasswordInterface, PasswordInterface} from "../interface/homeInterfaces";
import {ValidateForm, ValidateInput} from "../../../utills/customHooks/validateForm";
import PasswordRule from "../PasswordRule";

const initialState: DecryptPasswordInterface = {
    originalPassword: '',
    passwordId: 0
}

interface DecryptInterface {
    decryptPasswordObj: PasswordInterface,
    decryptPassword: Function,
    closeModal: Function
}

const DecryptPassword: React.FC<DecryptInterface> = (props) => {
    const [decryptPasswordForm, setDecryptPasswordForm] = useState<DecryptPasswordInterface>({
        ...initialState,
        passwordId: props.decryptPasswordObj.id ?? 0
    })
    const [errors, setErrors] = useState(initialState);

    useEffect(() => {
        setDecryptPasswordForm({
            ...initialState,
            passwordId: props.decryptPasswordObj.id
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors({
            ...errors,
            [e.target.name]: ''
        })
        setDecryptPasswordForm({
            ...decryptPasswordForm,
            [e.target.name]: e.target.value
        });
    }

    const confirmAction = async () => {
        let errorMessage: any = ValidateForm(decryptPasswordForm, PasswordRule);
        setErrors({...errorMessage});
        let validated = Object.values(errorMessage).join('').length === 0;
        if (validated) {
            await props.decryptPassword(decryptPasswordForm);
            props.closeModal();
        }
    }


    const inputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = ValidateInput(e.target.name, e.target.value, PasswordRule);
        setErrors({
            ...errors,
            [e.target.name]: errorMessage
        });
    }

    return (
        <>
            <div className="edit-client dialog-content">
                <form className="dialog-content-area">
                    <div className="form-group my-md">
                        <label>Original Password</label>
                        <input type="password" autoComplete='off' name={'originalPassword'} onBlur={inputValidation}
                               value={decryptPasswordForm.originalPassword}
                               onChange={inputHandler}/>
                        {errors.originalPassword !== '' ?
                            <span className="error-text">{errors.originalPassword}</span> : ''}
                    </div>
                </form>
                <div className="button-area flex justify-end mt-lg">
                    <button className="btn primary" onClick={() => confirmAction()}>Confirm</button>
                    <button className="btn primary outlined ml-xs" onClick={() => props.closeModal()}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DecryptPassword;