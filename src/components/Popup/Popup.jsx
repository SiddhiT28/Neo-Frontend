import React, { useEffect } from 'react'
import "./popup.css"

export default function Popup({ children, show, setShow }) {

    useEffect(() => {
        if (show.show) {
            setTimeout(() => {
                setShow({
                    show: false,
                    message: ""
                })
            }, 2000)
        }
    }, [])

    return (
        <section className='popup_lyt_background'>
            <div className='popup_lyt_div'>
                {children}
            </div>
        </section>
    )
}
