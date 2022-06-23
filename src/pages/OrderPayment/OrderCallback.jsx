import React from 'react'
import "./orderCallback.css"
import { NavLink } from 'react-router-dom'



export const OrderCallback = () => {
    return (
        <section className='lyt_wrapper_orderCallback'>
            <div className='wrapper_orderCallback_success'>
                <img className='orderCallback_success_image' src="./svgs/orderComplete.svg" alt='' />
                <p className='orderCallback_success_message'>
                    Your order has been placed successfully.
                </p>
                <NavLink to={"/"} className="orderCallback_success_link">
                    Continue Shopping
                </NavLink>
            </div>
        </section>
    )
}
