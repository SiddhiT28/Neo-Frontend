import React, { useEffect, useState } from 'react';
import "./Category.css";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { devAPI } from '../../API/constant';
import ImageView from '../../components/ImageView/ImageView';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../Data/AuthContext';
import { AddToCartIcon, WishlistIcon } from '../../components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClothesFilter = ({ filterByGender }) => {
    return (
        <li className='list_item'>
            <p>By gender</p>
            <div className='item_checkbox_grp'>
                <input type="radio" className='checkbox_grp_checkbox' name="filterBygGender" onChange={filterByGender} value={"men"} id="checkbox1" />
                <label htmlFor="checkbox1">
                    Men's
                </label>
            </div>
            <div className='item_checkbox_grp'>
                <input type="radio" className='checkbox_grp_checkbox' name="filterBygGender" onChange={filterByGender} value={"women"} id="checkbox1" />
                <label htmlFor="checkbox1">
                    Women's
                </label>
            </div>
            <div className='item_checkbox_grp'>
                <input type="radio" className='checkbox_grp_checkbox' name="filterBygGender" onChange={filterByGender} value={"all"} id="checkbox1" />
                <label htmlFor="checkbox1">
                    All
                </label>
            </div>

        </li>
    )
}

const PriceFilter = ({ filterByPrice }) => {
    return <li className='list_item'>
        <p>By Price</p>
        <div className='item_checkbox_grp'>
            <input type="radio" name="filterByPrice" className='checkbox_grp_checkbox' onChange={filterByPrice} value={100} id="checkbox1" />
            <label htmlFor="checkbox1">
                Below 100
            </label>
        </div>
        <div className='item_checkbox_grp'>
            <input type="radio" name="filterByPrice" className='checkbox_grp_checkbox' onChange={filterByPrice} value={1000} id="checkbox1" />
            <label htmlFor="checkbox1">
                Below 1000
            </label>
        </div>
        <div className='item_checkbox_grp'>
            <input type="radio" name="filterByPrice" className='checkbox_grp_checkbox' onChange={filterByPrice} value={10000} id="checkbox1" />
            <label htmlFor="checkbox1">
                Below 10000
            </label>
        </div>
        <div className='item_checkbox_grp'>
            <input type="radio" name="filterByPrice" className='checkbox_grp_checkbox' onChange={filterByPrice} value={"all"} id="checkbox1" />
            <label htmlFor="checkbox1">
                All
            </label>
        </div>

    </li>
}

export default function Category() {

    const { user, updateUser, isAuthenticated } = useAuth();
    const { cat } = useParams();
    const Navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.post(`${devAPI}/api/product/category`, {
            category: cat
        }).then(res => {
            setProducts(res.data);
            setFilteredProducts(res.data);
        }).catch(err => {
            console.log(err)
        })

        return () => {
            setProducts([]);
            setFilteredProducts([]);
        }
    }, [cat])

    const notify = (msg) => toast(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });;

    const filterByGender = (e) => {
        const { value, checked } = e.target

        if (checked) {

            if (value === "men") {
                const filtered = products.filter(product => {
                    return JSON.parse(product.category).find((e) => e === "men")
                })
                setFilteredProducts(filtered);
            } else if (value === "women") {
                const filtered = products.filter(product => {
                    return JSON.parse(product.category).find((e) => e === "women")
                })
                setFilteredProducts(filtered);
            } else if (value === "all") {
                setFilteredProducts(products)
            }
        }
    }

    const addProductToCart = (product) => {
        if (!isAuthenticated) {
            notify("Please Login to add product to cart")
            Navigate("/login")
        }
        axios.post(`${devAPI}/api/user/cart/add`, {
            productId: product,
            userId: user.id
        })
            .then((res) => {
                updateUser()
                notify("Product added to cart successfully")
            })
    }

    const addProductToWishlist = (product) => {
        if (!isAuthenticated) {
            notify("Please Login to add product to cart")
            Navigate("/login")
        }
        axios.post(`${devAPI}/api/user/wishlist`, {
            productId: product,
            userId: user.id
        })
            .then((res) => {
                updateUser()
                notify("Product added to wishlist")
            })
    }


    const filterByPrice = (e) => {
        const { value, checked } = e.target
        if (checked) {

            switch (value) {
                case "100":
                    const filtered = products.filter(product => {
                        return product.price < 100
                    })
                    setFilteredProducts(filtered);
                    break;
                case "1000":
                    const filtered2 = products.filter(product => {
                        return product.price <= 1000
                    })
                    setFilteredProducts(filtered2);
                    break;
                case "10000":
                    const filtered3 = products.filter(product => {
                        return product.price <= 10000
                    })
                    setFilteredProducts(filtered3);
                    break;
                default:
                    setFilteredProducts(products);
                    break;

            }
        }
    }

    return (
        <main className='main_category'>
            <section className='category_filter'>
                <h2>{cat}</h2>
                <div className='filter_details'>
                    <div className='details_label'>
                        <img src='/svgs/filterIcon.svg' width={22} alt='' />

                        <p className='label_text'>Filter's</p>
                    </div>
                    <ul className='details_list'>
                        <PriceFilter filterByPrice={filterByPrice} />
                        {
                            (cat === "clothes" || cat === 'footwear') && <ClothesFilter filterByGender={filterByGender} />
                        }
                    </ul>
                </div>
            </section>
            <Helmet>
                <title>{cat} - Neo</title>
            </Helmet>



            <section className='category_products'>
                <ul className='products_list'>
                    {
                        products.length > 0 && filteredProducts.map((product) => {
                            return (
                                <li className='product_result_item' onClick={() => {
                                    Navigate(`/product/${product.id}`);
                                }}>
                                    <ImageView
                                        src={`${devAPI}/${product.images[0].image}`}
                                        width="12vw"
                                        height="10vw"
                                        alt="product"
                                    />
                                    <p className='result_item_name'>{
                                        product.name.split(" ").slice(0, 3).join(" ")
                                    }...</p>
                                    <p className='result_item_price'>₹ {product.price}</p>
                                    <p className='result_item_stock'>
                                        {product.numberOfProducts > 0 ? "In Stock" : "Out of Stock"}
                                    </p>
                                    <div className='result_item_bottom'>
                                        <p className='item_bottom_rating'>4.5</p>
                                        <button className='item_bottom_wishlist' onClick={(e) => {
                                            e.stopPropagation();
                                            addProductToWishlist(product.id);
                                        }}>
                                            <WishlistIcon width={28} />
                                        </button>
                                        <button className='item_bottom_cart' onClick={(e) => {
                                            e.stopPropagation();
                                            addProductToCart(product.id);
                                        }}>
                                            <AddToCartIcon size={28} />
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>

            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

        </main>
    )
}
