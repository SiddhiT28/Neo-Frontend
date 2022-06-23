import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { devAPI } from '../../API/constant';
import ImageView from "../../components/ImageView/ImageView";
export default function OrderItem({ product }) {

    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        axios.get(`${devAPI}/api/product/getOne`, {
            params: {

                id: product.products
            }
        })
            .then(res => {
                setProductDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    return (
        <li className='list_item'>
            {
                productDetails &&
                <ImageView
                    src={`${devAPI}/${productDetails.images[0].image}`}
                    width={"10vw"}
                    height={"20vh"}
                    alt={productDetails.name}

                />
            }
            {
                productDetails &&
                <ul className='item_details'>
                    <li className='details_item'>
                        <p className='title_productName'>{productDetails.name}</p>
                        <p className='title_productStatus'>Payment: {product.status}</p>
                    </li>
                    <li className='details_item'>
                        <p className='details_productQuantity'>Quantity: {product.quantity}</p>

                    </li>
                    <li className='details_item'>

                        <p className='details_productPrice'>₹ {productDetails.price * product.quantity}</p>
                    </li>

                </ul>
            }
        </li>
    )
}
