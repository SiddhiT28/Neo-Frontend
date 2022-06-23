import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AddToCartIcon, CartIcon, FilterIcon, WishlistIcon } from '../../components/Icons';
import "./searchPage.css";
import axios from "axios";
import { devAPI } from "../../API/constant";
import ImageView from "../../components/ImageView/ImageView";
import { useAuth } from '../../Data/AuthContext';
import { Helmet } from 'react-helmet';

import { ToastContainer, toast } from 'react-toastify';
import { TransverseLoading } from 'react-loadingg';
import 'react-toastify/dist/ReactToastify.css';



export default function SearchPage() {

    const { user, updateUser } = useAuth();

    // filter reference
    const [filter, setFilter] = useState({
        category: "",
        brand: "",
        price: "",
        color: "",
        size: "",
        sort: "",
        search: ""
    })

    const [searchParamas, setSearchParams] = useSearchParams();
    const [searchedProducts, setSearchedProducts] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState("");
    const [filteredProducts, setFilteredProducts] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const Navigate = useNavigate();

    useEffect(() => {
        setSearchKey(searchParamas.get('key'));

        axios.post(`${devAPI}/api/product/search`, {
            searchKey: searchKey
        })
            .then((res) => {
                setSearchedProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            setSearchKey("");
        }

    }, [searchParamas, setSearchKey, searchKey]);

    const filterByPrice = (e) => {
        if (e.target.checked) {
            setFilteredProducts(searchedProducts.filter((product) => {
                if (product.price < ~~e.target.value) {
                    return product;
                }
                return null;
            }));
        }
    }

    const filterByDiscount = (e) => {
        if (e.target.checked) {
            setFilteredProducts(searchedProducts.filter((product) => {
                if (product.discounts > e.target.value) {
                    return product;
                }
                return null;
            }));
        }
    }

    const addProductToCart = (product) => {
        axios.post(`${devAPI}/api/user/cart/add`, {
            productId: product,
            userId: user.id
        })
            .then((res) => {
                updateUser()
                notify("Product added to cart");
            })
    }

    const addProductToWishlist = (product) => {
        axios.post(`${devAPI}/api/user/wishlist`, {
            productId: product,
            userId: user.id
        })
            .then((res) => {
                updateUser()
                notify("Product added to wishlist")
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
    });

    if (loading) {
        return (
            <TransverseLoading color="#431467" />
        )
    }

    return (
        <div className='product_searchPage_wrapper'>

            <Helmet>
                <title>Search Result</title>
            </Helmet>

            <ToastContainer />

            <div className='product_filter_controls'>
                <div className='product_filter_title'>
                    <FilterIcon />
                    <p>Filter's</p>
                </div>
                <ul className='product_filter_list'>
                    <li className='filter_list_item'>
                        <p>Price</p>
                        <ul className='list_item_list'>
                            <li className='list_item_checkbox'>
                                <input type="radio" name='price' onChange={filterByPrice} value="100" />
                                <label>Less than ₹100</label>
                            </li>
                            <li className='list_item_checkbox'>
                                <input type="radio" name='price' value={"1000"} onChange={filterByPrice} />
                                <label>Less than ₹1000</label>
                            </li>
                            <li className='list_item_checkbox'>
                                <input type="radio" name='price' value={"100000000"} onChange={filterByPrice} />
                                <label>Above ₹1000</label>
                            </li>
                        </ul>
                    </li>
                    <li className='filter_list_item'>
                        <p>Discount</p>
                        <ul className='list_item_list'>
                            <li className='list_item_checkbox'>
                                <input type="radio" name='discount' onChange={filterByDiscount} value="10" />
                                <label>10% OFF</label>
                            </li>
                            <li className='list_item_checkbox'>
                                <input type="radio" name='discount' value={"30"} onChange={filterByDiscount} />
                                <label>30% OFF</label>
                            </li>
                            <li className='list_item_checkbox'>
                                <input type="radio" name='discount' value={"60"} onChange={filterByDiscount} />
                                <label>60% OFF</label>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ul className='product_result_list'>
                {searchedProducts.length > 0 ?
                    filteredProducts.map((product) => {
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
                    }) : <li className='empty_state'>
                        <img className='empty_image' src='/svgs/product_not_found.svg' alt='' />
                        <p className='empty_title'>No products found</p>

                    </li>
                }
            </ul>

        </div>
    )
}
