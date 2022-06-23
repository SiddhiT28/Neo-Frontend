import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { EyeCloseIcon, EyeOpenIcon } from '../../../components/Icons'
import "./login.css"
export const Login = () => {


    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const updateShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const updateEmailInputValue = (e) => {
        setEmailInput(e.target.value);
    }

    const updatePasswordInputValue = (e) => {
        setPasswordInput(e.target.value);
    }

    const loginUser = () => {
        if (emailInput === "" && passwordInput === "") {
            alert("Please enter your email and password");
        } else if (emailInput === " ") {
            alert("Please enter your email");
        } else if (passwordInput === " ") {
            alert("Please enter your password");
        }
        else {
            const user = {
                email: emailInput,
                password: passwordInput
            }

        }
    }

    return (
        <div className='retailer_authentication_page'>
            <h1>Login to your warehouse!</h1>
            <form className='retailer_form'>
                <div className='form_grp'>
                    <label>Email</label>
                    <input
                        value={emailInput}
                        onChange={updateEmailInputValue}
                        type='email'
                        placeholder='Enter your email'

                    />
                </div>
                <div className='form_grp'>
                    <label>Password</label>
                    <div className='password_grp'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordInput}
                            onChange={updatePasswordInputValue}
                            placeholder='Enter your password' />
                        <button type='button' onClick={updateShowPassword}>
                            {
                                showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />
                            }
                        </button>
                    </div>
                </div>
                <div className='form_grp'>
                    <p>
                        Don't have an account?
                        <NavLink to={"/retailer/register"}> Register here</NavLink>
                    </p>
                </div>
                <div className='form_grp'>
                    <button type='button' onClick={loginUser}>Login</button>
                </div>
            </form>
        </div>
    )
}
