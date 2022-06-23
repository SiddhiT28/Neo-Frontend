import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../Data/AuthContext';
import ViewAddress from '../../pages/User/Profile/ViewAddress';
import "./myProfile.css";
export default function MyProfile() {

    const { user } = useAuth();

    return (
        <section className='lyt_wrapper_myProfile'>
            <form className='wrapper_myProfile_form'>
                <div className='myProfile_form_inputGrp'>
                    <label className='form_inputGrp_label' htmlFor='firstName'>Your full name</label>
                    <input
                        type='text'
                        value={user.name}
                        // onChange={(e) => setUserName(e.target.value)}
                        className='form_inputGrp_input'
                        id='firstName' />
                </div>

                <div className='myProfile_form_inputGrp'>
                    <label className='form_inputGrp_label' htmlFor='emailAddress'>Your email address</label>
                    <input type='email' className='form_inputGrp_input' value={user.email} id='emailAddress' />
                </div>

                {/* <button className='myProfile_form_cta'>
                    Update
                </button> */}
            </form>
            <ViewAddress />
        </section>
    )
}
