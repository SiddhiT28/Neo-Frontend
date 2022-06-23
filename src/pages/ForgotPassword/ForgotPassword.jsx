import React from 'react'
import Helmet from 'react-helmet'
import "./forgotPassword.css"
export default function ForgotPassword() {
    return (
        <main className='forgotPassword_main'>
            <Helmet>
                <title>Forgot Password - Neo</title>
                <meta name="description" content="Reset your password buy sending an link to your email." />
            </Helmet>
            <div className='forgotPassword_title'>
                <h1>Forgot Password?</h1>
                <p>Provide your email address to <br />receive an email to reset your password.</p>
            </div>
            <form className='forgotPassword_form'>
                <p className='form_basic_info'>Drop your email we will send you and link to reset your password</p>
                <div className='forgotPassword_form_inputGrp'>
                    <label className='form_label'>Email</label>
                    <input className='form_input' type="email" />
                </div>
                <div>
                    <button className='form_button'>Reset Password</button>
                </div>
            </form>
        </main>
    )
}
