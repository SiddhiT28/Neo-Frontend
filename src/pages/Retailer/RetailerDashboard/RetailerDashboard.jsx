import React, { useState } from 'react';
import { Orders } from '../../../components/Retailer/Orders/Orders';
import { Products } from '../../../components/Retailer/Products/Products';
import "./retailerDashboard.css";

export const RetailerDashboard = () => {

    const [selected, setSelected] = useState("dashboard");

    const updateSelected = (newValue) => {
        setSelected(newValue);
    }

    return (
        <section className='retailer_dashboard_lyt'>
            <header className='retailer_dashboard_header'>
                <img src='/svgs/logo_solo.svg' width={80} alt='logo' />
                <h1>Neo</h1>

                <p>Retailer Dashboard</p>
            </header>
            <nav className='retailer_dashboard_nav'>
                <ul className='dashboard_nav_list'>
                    <li
                        onClick={() => updateSelected("dashboard")}
                        className={selected === 'dashboard' ? 'nav_list_item selected' : 'nav_list_item'}>
                        Dashboard
                    </li>
                    <li
                        onClick={() => updateSelected("products")}
                        className={selected === 'products' ? 'nav_list_item selected' : 'nav_list_item'}>
                        Products</li>
                    <li
                        onClick={() => updateSelected("orders")}
                        className={selected === 'orders' ? 'nav_list_item selected' : 'nav_list_item'}>Orders
                    </li>
                    <li
                        onClick={() => updateSelected("profile")}
                        className={selected === 'profile' ? 'nav_list_item selected' : 'nav_list_item'}>
                        Profile
                    </li>
                </ul>
            </nav>

            <div className='retailer_dashboard_view'>
                {selected === 'products' && <Products />}
                {selected === 'orders' && <Orders />}
            </div>

        </section>
    )
}
