import React from 'react'
import { devAPI } from "../../../API/constant";
import "./changePassword.css";
import axios from "axios";
import { useAuth } from '../../../Data/AuthContext';
import { EyeOpenIcon, EyeCloseIcon } from "../../../components/Icons";
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {

    const { auth, user } = useAuth();

    const Navigate = useNavigate();

    const oldPasswordRef = React.useRef();
    const newPasswordRef = React.useRef();
    const confirmPasswordRef = React.useRef();

    const [oldPasswordType, setOldPasswordType] = React.useState("password");
    const [newPasswordType, setNewPasswordType] = React.useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = React.useState("password");

    const handleSubmit = (e) => {
        e.preventDefault();
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (newPassword !== confirmPassword) {
            notify("New password and confirm password does not match");
            return;
        }

        const postData = {
            id: user.id,
            old_password: oldPassword,
            new_password: newPassword,
            confirmPassword: confirmPassword
        }

        axios.post(`${devAPI}/api/user/changePassword`, {
            ...postData
        }).then(res => {
            notify(res.data.message);
            if (res.data.success) {
                Navigate("/user/profile");
            }
        })
    }

    const notify = (msg) => toast(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    return (
        <main className='main_changePassword'>
            <Helmet>
                <title>Change Password</title>

            </Helmet>
            <ToastContainer />
            <h1>Change Password</h1>
            <form className='changePassword_form'>
                <div className='form_group'>
                    <label htmlFor='oldPassword'>Old Password</label>
                    <div className='form_grp_password'>
                        <input ref={oldPasswordRef} type={oldPasswordType} id='oldPassword' />
                        <button
                            type={'button'}
                            onClick={() => {
                                if (oldPasswordType === "password") {
                                    setOldPasswordType("text");
                                } else {
                                    setOldPasswordType("password");
                                }
                            }}
                        >
                            {
                                oldPasswordType === "password" ? <EyeCloseIcon /> :
                                    <EyeOpenIcon />
                            }
                        </button>

                    </div>
                </div>
                <div className='form_group'>
                    <label htmlFor='newPassword'>New Password</label>
                    <div className='form_grp_password'>
                        <input ref={newPasswordRef} type={newPasswordType} id='newPassword' />
                        <button
                            type={'button'}
                            onClick={() => {
                                if (newPasswordType === "password") {
                                    setNewPasswordType("text");
                                } else {
                                    setNewPasswordType("password");
                                }
                            }}
                        >
                            {
                                newPasswordType === "password" ? <EyeCloseIcon /> :
                                    <EyeOpenIcon />
                            }
                        </button>

                    </div>

                </div>
                <div className='form_group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='form_grp_password'>
                        <input ref={confirmPasswordRef} type={confirmPasswordType} id='confirmPassword' />
                        <button
                            type={'button'}
                            onClick={() => {
                                if (confirmPasswordType === "password") {
                                    setConfirmPasswordType("text");
                                } else {
                                    setConfirmPasswordType("password");
                                }
                            }}
                        >
                            {
                                confirmPasswordType === "password" ?
                                    <EyeCloseIcon /> :
                                    <EyeOpenIcon />
                            }
                        </button>

                    </div>
                </div>
                <button type='button' onClick={handleSubmit} className='form_button'>Change Password</button>
            </form>

        </main>
    )
}
