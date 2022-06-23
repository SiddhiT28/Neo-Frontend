import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { devAPI } from '../../API/constant';
import { useAuth } from '../../Data/AuthContext';
import { CrossIcon } from '../Icons';
import { TransverseLoading } from 'react-loadingg';

export default function CartItem(props) {

    const { updateUser } = useAuth();

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(Number(props.quantity));
    const [loading, setLoading] = useState(true);

    const inputRef = React.useRef();

    useEffect(() => {
        getProduct();
        console.log(quantity)
    }, [])

    const getProduct = () => {
        axios.get(`${devAPI}/api/product/getOne`, {
            params: {
                id: props.product
            }
        })
            .then(res => {
                setProduct(res.data)
                setQuantity(props.quantity)
                props.setTotal((prev) => {
                    return (prev + (res.data.price * quantity))
                })
                setLoading(false)
            })
    }

    const updateProduct = () => {
        axios.get(`${devAPI}/api/product/getOne`, {
            params: {
                id: props.product
            }
        })
            .then(res => {
                setProduct(res.data)
            })
    }


    const handleInputChange = (e) => {
        if (e.target.value >= 1) {
            setQuantity(e.target.value);
            updateQuantity();
        }
    }

    const updateQuantity = (quantity) => {
        axios.post(`${devAPI}/api/user/cart/update`, {
            id: props.id,
            quantity: quantity
        }).then(res => {
            updateUser();
        }).catch(err => {
            console.log(">>>CartItem Update Quantity", err)
        })
    }

    const decreaseQuantity = (e) => {

        if (quantity <= 1) {
            setQuantity(1);
            return
        }

        setQuantity((prev) => {
            updateQuantity(prev - 1)

            return (prev - 1)
        });


    }
    const increaseQuantity = () => {
        setQuantity(prev => {
            updateQuantity(prev + 1)

            return (prev + 1)
        });
    }

    const removeProduct = () => {
        axios.post(`${devAPI}/api/user/cart/remove`, {
            id: props.id
        }).then(res => {
            props.itemDeleted()
        }).catch(err => {
        })
    }

    if (loading) {
        return <TransverseLoading color="#431467" />
    }


    return (
        <li className='cart_item'>
            <div className='cart_image_div'>
                {product.images && <img src={`${devAPI}/${product.images[0].image}`} alt='' />}
            </div>
            <div className='item_product_details'>
                <div className='product_details_head'>

                    <p className='item_product_name'>{product.name}</p>
                    <button className='details_head_removeBtn' onClick={removeProduct}>
                        <CrossIcon />
                    </button>
                </div>
                <p className='item_product_description' dangerouslySetInnerHTML={{
                    __html: product.description.slice(0, 100) + "..."
                }}>

                </p>

                <div className='item_product_quantity'>
                    <p>Quantity: </p>
                    <div className='product_quantity_controls'>
                        <button
                            onClick={decreaseQuantity}
                            className='quantity_controls_button'>
                            -
                        </button>
                        <input type='number' className='quantity_controls_input' value={quantity} onChange={handleInputChange} />
                        <button
                            onClick={increaseQuantity}
                            className='quantity_controls_button'>
                            +
                        </button>
                    </div>

                </div>
                <div className='item_product_cta'>

                    <p>₹{product.price}</p>
                </div>
            </div>
        </li>
    )
}