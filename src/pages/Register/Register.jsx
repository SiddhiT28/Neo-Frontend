import axios from 'axios'
import React from 'react'
import Helmet from 'react-helmet'
import { NavLink, useNavigate } from 'react-router-dom'
import { devAPI } from '../../API/constant'
import { EyeCloseIcon, EyeOpenIcon } from '../../components/Icons'
import { useAuth } from '../../Data/AuthContext'
import "./register.css";
import Popup from "../../components/Popup/Popup"
export default function Register() {

    const { login } = useAuth();
    const Navigate = useNavigate();

    const [show, setShow] = React.useState(false);

    // eslint-disable-next-line no-control-regex
    let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [isValidEmail, setIsValidEmail] = React.useState(false)
    const [isValidPassword, setIsValidPassword] = React.useState(true)
    const [passwordMatch, setPasswordMatch] = React.useState(false)

    const [passwordInputType, setPasswordInputType] = React.useState('password')
    const [confirmPasswordInputType, setConfirmPasswordInputType] = React.useState('password')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(isValidEmail, isValidPassword, passwordMatch)

        if (isValidEmail && isValidPassword && passwordMatch) {

            const data = { name: name, email: email, password: password }

            axios.post(`${devAPI}/api/user/register`, data)
                .then(res => {
                    login(res.data)
                    setShow(true)
                    sessionStorage.setItem('user', JSON.stringify(res.data))
                    Navigate('/')
                }).catch(err => {
                    console.log(err)
                })
        }
    }



    return (
        <main className='register_main'>

            <Helmet>
                <title>Register - Neo</title>
                <meta name="description" content="Create an new account." />
            </Helmet>

            {show && <Popup show={show} setShow={setShow}>
                <p>You have been successfully registered!</p>
            </Popup>}

            <div className='register_illustration'>
                <img src='/svgs/register.svg' alt='' />
            </div>



            <div className='register_title'>
                <h1>Create an account</h1>
                <p>Enter all the details and register your self.</p>
            </div>

            <form className='register_form'>
                <div className='register_form_inputGrp'>
                    <label className='form_label'>Your full name*</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        className='form_input'
                        type="text" />


                </div>
                <div className='register_form_inputGrp'>
                    <label className='form_label'>Email*</label>
                    <input
                        value={email}
                        onBlur={() => {
                            if (email.length > 0 && emailRegex.test(email)) {
                                setIsValidEmail(true)
                            } else {
                                setIsValidEmail(false)
                            }
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form_input'
                        type="email" />
                    {
                        !isValidEmail && email.length > 0 && !emailRegex.test(email) &&
                        <p className='form_error'>Please enter a valid email.</p>

                    }
                </div>
                <div className='register_form_inputGrp'>
                    <label className='form_label'>Password*</label>
                    <div className='form_input_password'>
                        <input
                            value={password}
                            onBlur={() => {
                                if (password.length > 0 && strongPassword.test(password)) {
                                    setIsValidPassword(true)
                                } else {
                                    setIsValidPassword(false)
                                }
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            type={passwordInputType} />

                        <button type='button' onClick={() => {
                            if (passwordInputType === 'password') {
                                setPasswordInputType('text')
                            } else {
                                setPasswordInputType('password')
                            }
                        }}>
                            {
                                passwordInputType === 'password' ?
                                    <EyeOpenIcon /> :
                                    <EyeCloseIcon />
                            }

                        </button>
                    </div>

                    {
                        !isValidPassword &&
                        <p className='form_error'>Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.</p>
                    }
                </div>
                <div className='register_form_inputGrp'>
                    <label className='form_label'>Confirm Password*</label>
                    <div className='form_input_password'>
                        <input
                            value={confirmPassword}
                            onBlur={() => {
                                if (confirmPassword.length > 0 && confirmPassword === password) {
                                    setPasswordMatch(true)
                                } else {
                                    setPasswordMatch(false)
                                }
                            }}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={confirmPasswordInputType} />
                        <button type='button' onClick={() => {
                            if (confirmPasswordInputType === 'password') {
                                setConfirmPasswordInputType('text')
                            } else {
                                setConfirmPasswordInputType('password')
                            }
                        }}>
                            {
                                confirmPasswordInputType === 'password' ?
                                    <EyeOpenIcon /> :
                                    <EyeCloseIcon />
                            }
                        </button>

                    </div>

                    {
                        !passwordMatch && confirmPassword.length > 0 && confirmPassword !== password &&
                        <p className='form_error'>Passwords do not match.</p>
                    }
                </div>
                <div>
                    <button className='form_button' onClick={handleSubmit}>Register</button>
                </div>
                <div className='form_login'>
                    <p>Already have an account ?</p>
                    <NavLink to="/login" >Login now</NavLink>
                </div>
            </form>
        </main>
    )
}
