import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { devAPI } from '../../API/constant'
import { useAuth } from '../../Data/AuthContext'
import { AddToCartIcon, CrossIcon } from '../Icons'
import ImageView from '../ImageView/ImageView'
import Popup from '../Popup/Popup'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransverseLoading } from 'react-loadingg';

export const WishlistItem = (props) => {

    const { isAuthenticated, user, updateUser } = useAuth();
    const [productDetails, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState({
        show: false,
        message: "",
    });

    const notify = (msg) => toast(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;


    useEffect(() => {
        console.log(props.item)

        axios.get(`${devAPI}/api/product/getOne`, {
            params: {
                id: props.item
            }
        }).then((res) => {
            console.log(res.data)
            setProduct(res.data)
            setLoading(false)
        })

    }, [])

    const addToCart = () => {
        axios.post(`${devAPI}/api/user/cart/add`, {
            productId: productDetails.id,
            userId: user.id
        })
            .then((res) => {
                updateUser()
                notify("Product Added to Cart")
            })
    }

    const removeProductFromWishList = () => {
        axios.delete(`${devAPI}/api/user/wishlist`, {
            params: {
                productId: productDetails.id,
                userId: user.id
            }
        }).then((res) => {
            updateUser()
            notify("Product removed from Wishlist")
        })
    }

    if (loading) {
        return <TransverseLoading color="#431467" />
    }

    return (
        <li className='content_list_item'>
            <ToastContainer />
            {alert.show && <Popup show={alert} setShow={setAlert} >
                <p className='success'>{alert.message}</p>
            </Popup>}

            <ImageView src={`${devAPI}/${productDetails.images[0].image}`} alt={"Product"} width={"8vw"} height={"15vh"} />

            <div className='list_item_head'>
                <NavLink to={`/product/${productDetails.id}`} className='item_head_title'>{productDetails.name}</NavLink>
                <button className='item_head_removeBtn' title='Remove product' onClick={removeProductFromWishList}>
                    <CrossIcon />
                </button>
                <p className='item_head_stock inStock'>In Stock</p>
                <button className='item_head_cardBtn' title='Add to cart' onClick={addToCart}>
                    <AddToCartIcon color={"#2D264B"} size={26} />
                </button>
            </div>

        </li>
    )
}
