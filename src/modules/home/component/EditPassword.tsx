import React, {useEffect, useState} from "react";
import {ValidateForm, ValidateInput} from "../../../utills/customHooks/validateForm";
import PasswordRule from "../PasswordRule";
import {AddPasswordInterface, PasswordInterface} from "../interface/homeInterfaces";

const initialState: AddPasswordInterface = {
    hostName: '',
    email: '',
    password: '',
    originalPassword: '',
}

interface EditPasswordInterface {
    editPasswordObj: PasswordInterface,
    mode: string,
    addPassword: Function,
    editPassword: Function,
    closeModal: Function
}

const EditPassword: React.FC<EditPasswordInterface> = (props) => {
    const [password, setPassword] = useState<AddPasswordInterface>({...initialState, passwordId: props.editPasswordObj.id ?? 0})
    const [errors, setErrors] = useState(initialState);
    useEffect(() => {
        if (props.mode === 'edit') {
            setPassword({
                passwordId: props.editPasswordObj.id,
                hostName: props.editPasswordObj.hostName,
                email: props.editPasswordObj.email,
                password: props.editPasswordObj.password,
                originalPassword: ''
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors({
            ...errors,
            [e.target.name]: ''
        })
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    }

    const confirmAction = async () => {
        let errorMessage: any = ValidateForm(password, PasswordRule);
        setErrors({...errorMessage});
        let validated = Object.values(errorMessage).join('').length === 0;
        if (validated) {
            if (props.mode === 'add') {
                await props.addPassword(password);
            } else {
                await props.addPassword(password);
            }
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
        <div className="edit-client dialog-content">
            <form className="dialog-content-area" onSubmit={confirmAction}>
                <div className="form-group my-md">
                    <label>Host Name</label>
                    <input type="text" name={'hostName'} onBlur={inputValidation}
                           value={password.hostName}
                           onChange={inputHandler}/>
                    {errors.hostName !== '' ?
                        <span className="error-text">{errors.hostName}</span> : ''}
                </div>
                <div className="form-group my-md">
                    <label>Email</label>
                    <input type="text" name={'email'} onBlur={inputValidation}
                           value={password.email}
                           onChange={inputHandler}/>
                    {errors.email !== '' ?
                        <span className="error-text">{errors.email}</span> : ''}
                </div>
                <div className="form-group my-md">
                    <label>password</label>
                    <input type="password" name={'password'} onBlur={inputValidation}
                           value={password.password}
                           onChange={inputHandler}/>
                    {errors.password !== '' ?
                        <span className="error-text">{errors.password}</span> : ''}
                </div>
                <div className="form-group my-md">
                    <label>Master Password</label>
                    <input type="password" name={'originalPassword'} onBlur={inputValidation}
                           value={password.originalPassword}
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
    )
}

export default EditPassword;

