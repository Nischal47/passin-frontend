import React, {useEffect, useState} from "react";
import {ValidateForm, ValidateInput} from "../../../utills/customHooks/validateForm";
import PasswordRule from "../PasswordRule";
import {AddPasswordInterface, PasswordInterface} from "../interface/homeInterfaces";
import {GetRequest} from "../../../plugins/axios";
import {setToasterState} from "../../../common/toaster/services/toasterAction";
import {useDispatch} from "react-redux";

const generatePasswordUrl = process.env.REACT_APP_API_BASE_URL+'passwords/generate-random-password'

const initialState: AddPasswordInterface = {
    passwordId: 0,
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
    const [password, setPassword] = useState<AddPasswordInterface>({
        ...initialState,
        passwordId: props.editPasswordObj.id ?? 0
    })

    const dispatch = useDispatch();
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
                await props.editPassword(password);
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


    const onGenerateRandomPassword = () => {
        GetRequest(generatePasswordUrl,{
            'minLength':8,
            'maxLength':12
        },{})
            .then((response: any) => {
                dispatch(setToasterState({
                    appear: true,
                    title: "success",
                    name: "Password Generation",
                    message: `${response.data.message}`
                }));
                setPassword({
                    passwordId: password.passwordId,
                    originalPassword: password.originalPassword,
                    email: password.email,
                    hostName: password.hostName,
                    password: response.data.password
                })
            })
            .catch((error: any) => {
                let errorMessage: string = '';
                if (error.response) {
                    errorMessage = error.response.data.message;
                } else if (error.request) {
                    errorMessage = error.request.message;
                } else {
                    errorMessage = "Can't access server";
                }
                dispatch(setToasterState({
                    appear: true,
                    title: "error",
                    name: "Add Password Error",
                    message: `${errorMessage}`
                }));
            });
    }

    return (
        <div className="edit-client dialog-content">
            <form className="dialog-content-area" onSubmit={confirmAction} autoComplete="off">
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
                           onChange={inputHandler}
                           autoComplete="off"
                    />
                    {errors.email !== '' ?
                        <span className="error-text">{errors.email}</span> : ''}
                </div>
                <div className="form-group my-md">
                    <label>password</label>
                    <div className='flex justify-between'>
                        <input className='mr-xl flex-1' type="password" name={'password'} onBlur={inputValidation}
                               value={password.password}
                               onChange={inputHandler}
                                autoComplete={"off"}
                        />
                        <div className='btn pointer' onClick={() => onGenerateRandomPassword()}>Generate Password</div>
                    </div>
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

