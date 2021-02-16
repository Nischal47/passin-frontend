import React, {FormEvent, useEffect, useState} from "react";
import "../auth.scss"
import logo from '../../../assets/images/pass-in-logo.svg';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoginInterface} from "../interface/authInterface";
import {ValidateForm, ValidateInput} from "../../../utills/customHooks/validateForm";
import AuthRules from "../AuthRules";
import {useHistory} from "react-router";
import * as actions from "../../../store/action";

const initialValues: LoginInterface = {
    email: '',
    password: ''
}

const Login = () => {

    const isAuthenticated = useSelector((state:any)=> state.authReducer.isAuthenticated);

    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(initialValues)
    const [user, setUser] = useState(initialValues)

    const inputHandler = (e: any) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value
            }
        )
    }

    const inputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = ValidateInput(e.target.name, e.target.value, AuthRules);
        setErrors({
            ...errors,
            [e.target.name]: errorMessage
        })
    }

    useEffect(() =>{
        if(isAuthenticated){
            history.push('/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isAuthenticated])

    const authenticateUser = async (e: FormEvent) => {
        e.preventDefault();
        let errorMessage: any = ValidateForm(user, AuthRules);
        setErrors({...errorMessage});
        let validated = Object.values(errorMessage).join('').length === 0;
        if (validated) {
            await dispatch(actions.authenticate({...user}))
        }
    }

    return (
        <div className='auth'>
            <div className="login flex-centered pa-xl">
                <form autoComplete='off' className="column mt-md justify-between login-form elevated pa-xl"
                      onSubmit={authenticateUser}>
                    <div className='logo mr-md mb-md'>
                        <img src={logo} alt={'logo'}/>
                    </div>
                    <div className="title text-primary text-center mt-md mb-md">
                        Login
                    </div>
                    <div className="form-group mt-md mb-md">
                        <label className={'bold sub-title text-primary mb-sm'}>Email</label>
                        <div className="input-box">
                            <input
                                type="email"
                                name={"email"}
                                placeholder={'Enter email'}
                                onBlur={inputValidation}
                                onChange={inputHandler}
                            />
                        </div>
                        {errors.email !== '' ? <span className="error-text">{errors.email}</span> : ''}
                    </div>
                    <div className="form-group mt-md mb-md">
                        <label className={'bold sub-title text-primary mb-sm'}>Password</label>
                        <div className="input-box">
                            <input type="password"
                                   name={"password"}
                                   placeholder={'Enter password'}
                                   onBlur={inputValidation}
                                   onChange={inputHandler}
                            />
                        </div>
                        {errors.password !== '' ? <span className="error-text">{errors.password}</span> : ''}
                    </div>
                    <button className="btn primary pt-xl pb-xl mt-md mb-md pointer" type={'submit'}>Login</button>
                    <div className="description text-light mb-xl mt-md text-center">No account?
                        <Link to={"/signup"}>
                            <b className="bold text-primary"> Sign Up from HERE!</b>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;