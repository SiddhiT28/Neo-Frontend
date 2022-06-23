import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import MyProfile from '../../../components/Profile/MyProfile';
import { useAuth } from '../../../Data/AuthContext';
import ViewOrder from '../Orders/ViewOrder';
import AddAddress from './AddAddress';
import "./Profile.css";
import ViewAddress from './ViewAddress';

export default function Profile() {

    const { user } = useAuth();

    const [activeNav, setActiveNav] = useState("view-profile");


    return (
        <main className='main_profile'>
            <Helmet>
                <title>Profile - Neo</title>
            </Helmet>
            <section className='profile_navigation'>
                <h1>Welcome, {user.name}</h1>
                <ul className='navigation_list'>
                    <li className={activeNav === "view-profile" ? 'selected' : 'list_item'} onClick={() => setActiveNav("view-profile")}>
                        <p className='item_label'>
                            My Profile
                        </p>
                    </li>
                    <li className={activeNav === 'view-order' ? 'selected' : 'list_item'} onClick={() => setActiveNav('view-order')}>
                        <p className='item_label'>
                            My Orders
                        </p>
                    </li>
                </ul>
            </section>
            <section className='profile_content'>
                {activeNav === "view-profile" && <MyProfile />}
                {activeNav === "view-order" && <ViewOrder />}
            </section>
        </main>
    )
}
