import React, { useEffect } from 'react'
import "./wishlist.css";
import ImageView from "../../components/ImageView/ImageView";
import { CrossIcon } from '../../components/Icons';
import { WishlistItem } from '../../components/Wishlist/WishlistItem';
import axios from 'axios';
import { devAPI } from '../../API/constant';
import { useAuth } from '../../Data/AuthContext';
import Helmet from 'react-helmet'
import { EmptyWishlist } from '../../components/EmptyState/EmptyWishlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Wishlist = () => {

    const { isAuthenticated, user } = useAuth();

    const notify = (msg) => toast(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return (
        <section className='wrapper_lyt_wishlist'>
            <ToastContainer />
            <Helmet>
                <title>Wishlist - Neo</title>
                <meta name="description" content="Add products here to buy later" />
            </Helmet>
            <div className='lyt_navDetail'>
                <p className='navDetail_text'>HOME / Wishlist</p>
            </div>

            <div className='lyt_wishlist_heading'>
                <h1>My Wishlist</h1>
            </div>
            <div className='lyt_wishlist_content'>
                {
                    isAuthenticated && user.wishlist.length > 0 ? (user.wishlist[0].products.length > 0 ? user.wishlist[0].products.map(item => {
                        return <ul className='wishlist_content_list'><WishlistItem key={item.id} item={item} /></ul>
                    }) : <EmptyWishlist />) : <EmptyWishlist />
                }
            </div>
        </section>
    )
}
