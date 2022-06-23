import React, { useContext, useEffect, useState } from 'react';
import "./productDetails.css"
import { useParams, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet';
import axios from 'axios';
import { devAPI } from '../../API/constant';
import { AuthContext } from '../../Data/AuthContext';
import { StarsIcon, WishlistIcon } from '../../components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import { TransverseLoading } from 'react-loadingg';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {

    const Navigate = useNavigate();

    const { user, isAuthenticated, updateUser } = useContext(AuthContext);
    const { id } = useParams();
    const [productDetails, setProduct] = useState({})

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);



    const [productLoaded, setProductLoaded] = useState(false)

    useEffect(() => {
        axios.get(`${devAPI}/api/product/getOne`, {
            params: {
                id: id
            }
        }).then((res) => {
            setProduct(res.data)
            setProductLoaded(true)
        })

    }, [])


    const buyProduct = () => {
        if (isAuthenticated) {

            const product = productDetails.id

            let checkoutDetails = {
                userId: user.id,
                products: [{
                    product: product,
                    quantity: 1
                }]
            }

            sessionStorage.setItem("checkoutDetails", JSON.stringify(checkoutDetails))

            Navigate('/checkout');
        } else {
            Navigate("/login")
        }
    }

    const addToCart = () => {
        axios.post(`${devAPI}/api/user/cart/add`, {
            productId: id,
            userId: user.id
        })
            .then((res) => {
                updateUser()
                notify("Product added to cart 🛒 ")
            })
    }

    const addProductToWishlist = () => {
        axios.post(`${devAPI}/api/user/wishlist`, {
            productId: id,
            userId: user.id
        })
            .then((res) => {

                console.log(res.data)

                updateUser()

                notify("Product added to wishlist 🎉")

                console.log(res.data)
            })
    }

    const notify = (msg) => toast(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;

    if (productLoaded) {
        return (
            <main className='wrapper_productDetails'>
                <Helmet>
                    <title>{productDetails.name} - Neo</title>
                </Helmet>

                <ToastContainer />


                <div className='productDetails_image'>
                    <div className='productDetails_image_main'>
                        <img
                            src={`${devAPI}/${productDetails.images[selectedImageIndex].image}`}
                            alt=''
                            className='image_img'
                        />


                    </div>
                    {productDetails.discounts > 0 && <p className='show_discount'>
                        - {productDetails.discounts}%
                    </p>}
                    <ul className='productDetails_image_list'>
                        {productDetails.images.map((image, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => {
                                        console.log(i)
                                        return setSelectedImageIndex(i)
                                    }}
                                    className='productDetails_image_list_item'>
                                    <img
                                        src={`${devAPI}/${image.image}`}
                                        alt=''
                                        width={120}
                                        className='list_item_image'
                                    />
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <section className='productDetails_product'>
                    <h2 className='product_name'>{productDetails.name}</h2>
                    <div className='productDetails_ratings'>
                        <StarsIcon size={28} />
                        <StarsIcon size={28} />
                        <StarsIcon size={28} />
                        <StarsIcon size={28} />
                    </div>
                    <p className='product_description' dangerouslySetInnerHTML={{ __html: productDetails.description }} ></p>
                    <p className='product_price'>₹ {productDetails.price.toLocaleString('en-IN')}</p>

                    <div className='productDetails_cta'>
                        <button className='cta_buyNow' onClick={buyProduct}>Buy Now</button>
                        {isAuthenticated && <button onClick={addToCart} className='cta_addToCart'>
                            <p>Add to Cart</p>
                        </button>}
                    </div>

                    {isAuthenticated && <div className='productDetails_wishlist'>
                        <button className='wishlist_button' onClick={addProductToWishlist}>
                            <WishlistIcon width={32} />
                        </button>
                    </div>}



                    {/* <div className='productDetails_available_offers'>
                        <h3>Available Offers</h3>
                        <ul className='offers_list'>
                            <li>
                                <p>Bank Offers 5% unlimited cashback on Flipkart Axis Bank Credit</p>
                            </li>
                            <li>
                                <p>Bank Offers 5% unlimited cashback on Flipkart Axis Bank Credit</p>
                            </li>
                            <li>
                                <p>Parent Offer 2000 Flipkart Gift Card on Every 1000th Transaction with a new Visa Debit/Credit Card</p>
                            </li>
                            <li>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </li>
                        </ul>
                    </div> */}
                </section>
            </main >
        )
    } else {
        return <TransverseLoading />
    }
}
