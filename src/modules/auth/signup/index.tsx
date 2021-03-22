import React, {FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../../assets/images/pass-in-logo.svg";
import {useDispatch, useSelector} from "react-redux";
import {ValidateForm, ValidateInput} from "../../../utills/customHooks/validateForm";
import AuthRules from "../AuthRules";
import {SignupInterface} from "../interface/authInterface";
import {useHistory} from "react-router";
import * as actions from "../../../store/action";

const initialValues: SignupInterface ={
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    conformPassword: ''
}

const Signup = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors,setErrors] = useState(initialValues)
    const [user,setUser] = useState(initialValues)

    const registrationStatus = useSelector((state:any)=> state.authReducer.registrationStatus);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(
            {
                ...user,
                [e.target.name]:e.target.value
            }
        )
    }

    useEffect(() =>{
        if(registrationStatus === 'Success'){
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[registrationStatus])

    const inputValidation = (e:React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = ValidateInput(e.target.name,e.target.value,AuthRules);
        setErrors({
            ...errors,
            [e.target.name]:errorMessage
        })
    }

    const conformPassword = () => {
        const errorMessage = user.password.match(user.conformPassword) ? '' : 'Password does not matches!'
        setErrors({
            ...errors,
            'conformPassword':errorMessage
        })
    }

    const registerUser = async (e:FormEvent) => {
        e.preventDefault();
        let errorMessage:any = ValidateForm(user,AuthRules);
        setErrors({...errorMessage});
        let validated = Object.values(errorMessage).join('').length === 0;
        if(validated){
            await dispatch(actions.signup({...user}))
        }
    }

    return (
        <>
            <div className='auth' >
                <div className="signup flex-centered pa-xl">
                    <form className="column justify-between signup-form elevated" autoComplete='off' onSubmit={(e: FormEvent) => registerUser(e)}>
                        <div className='logo flex justify-center mt-md mr-md mb-md'>
                            <img src={logo} alt={'logo'}/>
                        </div>
                        <div className="title text-primary text-center mt-md mb-md">
                            Signup
                        </div>
                       <div className='flex justify-between'>
                           <div className="form-group  mb-md">
                               <label className={'bold sub-title text-primary mb-sm'}>Email</label>
                               <div className="input-box">
                                   <input
                                       type="email"
                                       name={"email"}
                                       onChange={inputHandler}
                                       onBlur={inputValidation}
                                       placeholder={'Enter email'}/>
                               </div>
                               {errors.email !== '' ? <span className="error-text">{errors.email}</span> : ''}
                           </div>
                           <div className="form-group  mb-md">
                               <label className={'bold sub-title text-primary mb-sm'}>First Name</label>
                               <div className="input-box">
                                   <input
                                       type="text"
                                       name={"firstName"}
                                       onChange={inputHandler}
                                       onBlur={inputValidation}
                                       placeholder={'Enter First Name'}/>
                               </div>
                               {errors.firstName !== '' ? <span className="error-text">{errors.firstName}</span> : ''}
                           </div>
                       </div>
                        <div className='flex justify-between'>
                            <div className="form-group mb-md">
                                <label className={'bold sub-title text-primary mb-sm'}>Last Name</label>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name={"lastName"}
                                        onChange={inputHandler}
                                        onBlur={inputValidation}
                                        placeholder={'Enter Last Name'}/>
                                </div>
                                {errors.lastName !== '' ? <span className="error-text">{errors.lastName}</span> : ''}
                            </div>
                            <div className="form-group mb-md">
                                <label className={'bold sub-title text-primary mb-sm'}>Date Of Birth</label>
                                <div className="input-box">
                                    <input
                                        type="date"
                                        name={"dateOfBirth"}
                                        onChange={inputHandler}
                                        onBlur={inputValidation}
                                        placeholder={'Enter Date of birth'}/>
                                </div>
                                {errors.dateOfBirth !== '' ? <span className="error-text">{errors.dateOfBirth}</span> : ''}
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className="form-group mb-md">
                                <label className={'bold sub-title text-primary mb-sm'}>Password</label>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name={"password"}
                                        onChange={inputHandler}
                                        onBlur={conformPassword}
                                        placeholder={'Enter Password'}/>
                                </div>
                                {errors.password !== '' ? <span className="error-text">{errors.password}</span> : ''}
                            </div>
                            <div className="form-group mb-md">
                                <label className={'bold sub-title text-primary mb-sm'}>Conform Password</label>
                                <div className="input-box">
                                    <input type="password"
                                           name={"conformPassword"}
                                           onChange={inputHandler}
                                           onBlur={conformPassword}
                                           placeholder={'Enter password'}/>
                                </div>
                                {errors.conformPassword !== '' ? <span className="error-text">{errors.conformPassword}</span> : ''}
                            </div>
                        </div>
                        <button className="btn primary pt-xl pb-xl mt-md mb-md pointer" type={'submit'}>Signup</button>
                        <div className="description text-light mb-xl mt-md text-center">Already have an account?
                            <Link to={"/"}>
                                <b className="bold text-primary"> Click here to Login!</b>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;