import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { devAPI } from '../../API/constant';
import "./productSummary.css"
export default function ProductSummary({ item, setTotal }) {

    const [product, setProduct] = useState();

    useEffect(() => {

        axios.get(`${devAPI}/api/product/getOne`,
            {
                params: {
                    id: item.product
                }
            })
            .then(res => {
                setProduct(res.data)
                setTotal((prev) => {
                    return (prev + (res.data.price * item.quantity))
                })
            }).catch(err => {
                console.log(">>>ProductSummary LOG", err)
            })
    }, [])

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <li className='list_item'>
            <p className='item_name'>{product.name}</p>
            <p className='item_quantity'>Quantity: {item.quantity}</p>
            <p className='item_price'>₹ {product.price}</p>
        </li>
    )
}
