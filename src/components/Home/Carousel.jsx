import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import useScrollOnDrag from 'react-scroll-ondrag';
import { ArrowRightIcon } from '../Icons';
import "./carousel.css"

export default function Carousel({ title, items, id }) {

    const ref = useRef();
    const { events } = useScrollOnDrag(ref);

    const Navigate = useNavigate();

    return (
        <section className='home_product_slider' >
            <h2>{title}</h2>
            <ul className='image_slider_list'
                id={id}
                ref={ref}
                {...events}
            >
                {
                    items.map(item => {
                        return (
                            <li className='image_slider_item' key={item.id}

                            >
                                <div className='product_image_div'>
                                    <img src={`http://localhost:8000/${item.images[0].image}`} className='product_image' alt='' />
                                </div>
                                <p className='product_name'>{item.name}</p>
                                <p className='product_price'>₹{item.price}</p>
                                <NavLink to={`product/${item.id}`}>Visit <ArrowRightIcon />
                                </NavLink>
                            </li>
                        )
                    }
                    )
                }
            </ul>
        </section>
    )
}
