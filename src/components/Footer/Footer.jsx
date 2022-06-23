import React from 'react'
import { NavLink } from 'react-router-dom'
import "./footer.css"
export default function Footer() {
    return (
        <footer className='footer'>
            <p>
                Neo © 2020 All rights reserved.
            </p>
            <a href={"http://localhost:3001/"} rel='noreferrer' target='_blank'>
                <p>Want to sell products?</p>
            </a>
        </footer>
    )
}
