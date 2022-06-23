import axios from 'axios'
import React from 'react'
import Helmet from 'react-helmet'
import { NavLink, useNavigate } from 'react-router-dom'
import { EyeCloseIcon, EyeOpenIcon } from '../../components/Icons'
import { useAuth } from '../../Data/AuthContext'
import Popup from "../../components/Popup/Popup"

import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import { devAPI } from '../../API/constant'


export default function Login() {

    const { login } = useAuth()

    const [show, setShow] = React.useState(false)
    const [msg, setMsg] = React.useState('')

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [inputType, setInputType] = React.useState('password')
    const notify = (msg) => toast.error(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const Navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { email: email, password: password }

        axios.post(`${devAPI}/api/user/login`, data)
            .then(res => {
                if (res.data.isInValid) {
                    notify(res.data.error)
                } else {
                    login(res.data)
                    Navigate('/')

                    const userData = {
                        id: res.data.id,
                        email: res.data.email,
                    }
                    sessionStorage.setItem('user', JSON.stringify(userData))
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    return (
        <main className='login_main'>
            <ToastContainer />
            <Helmet>
                <title>Login - Neo</title>
                <meta name="description" content="Login to your account" />
            </Helmet>

            {
                show && <Popup>
                    <p className='error-msg'>{msg}</p>
                </Popup>
            }

            <div className='login_illustration'>
                <img src='/svgs/authentication.svg' alt='' />
            </div>

            <div className='login_title'>
                <h1>Hello there!</h1>
                <p>Login using your email and password.</p>
            </div>
            <form className='login_form'>
                <div className='login_form_inputGrp'>
                    <label className='form_label'>Email*</label>
                    <input className='form_input' value={email} onChange={handleEmailChange} type="email" />
                </div>
                <div className='login_form_inputGrp'>
                    <label className='form_label'>Password*</label>
                    <div className='form_input_password'>
                        <input value={password} onChange={handlePasswordChange} type={inputType} />
                        <button
                            type='button'
                            className='input_password_btn'
                            onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                        >
                            {inputType === 'password' ? <EyeCloseIcon /> : <EyeOpenIcon />}
                        </button>
                    </div>
                </div>
                <div className='form_forgotPassword'>
                    <NavLink to="/forgotPassword" >Forgot Password?</NavLink>
                </div>

                <div>
                    <button className='form_button' onClick={handleSubmit}>Login</button>
                </div>

                <div className='form_register'>
                    <p>New to Neo ?</p>
                    <NavLink to="/register" >Create an Account</NavLink>
                </div>
            </form>
        </main>
    )
}
