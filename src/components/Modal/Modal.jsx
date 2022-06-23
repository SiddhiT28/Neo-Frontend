import React from 'react'
import { CrossIcon } from '../Icons';
import "./modal.css";
export default function Modal({ setIsOpen, children }) {
    return (
        <section className='wrapper_popup_bg' onClick={(e) => {

            setIsOpen(false);
        }}>
            <div className='wrapper_popup_center' onClick={(e) => {
                e.stopPropagation();
            }}>

                <div className='popup_center_controls'>
                    <button className='popup_close_btn' onClick={() => setIsOpen(false)}>
                        <CrossIcon />
                    </button>
                </div>
                <div>
                    {children}
                </div>

            </div>

        </section>
    )
}
