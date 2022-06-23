import React, { useContext, useEffect } from 'react'
import Helmet from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import "./cart.css"
import CartItem from '../../components/Cart/CartItem'
import { AuthContext } from '../../Data/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Cart() {

    const { user, isAuthenticated, updateUser } = useContext(AuthContext)


    const Navigate = useNavigate();

    const [total, setTotal] = React.useState(0)

    const handleClick = () => {

        if (user.cart.length === 0) {
            notify("Cart is empty")
            return
        }

        let checkoutDetails = {
            userId: user.id,
            products: [...user.cart]
        }

        sessionStorage.setItem("checkoutDetails", JSON.stringify(checkoutDetails))

        Navigate('/checkout');
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

    return (
        <main className='cart_main'>
            <ToastContainer />

            <Helmet>
                <title>Cart - Neo</title>
                <meta name="description" content="See the list of item you planned to buy." />
            </Helmet>

            <div className='lyt_navDetail'>
                <p className='navDetail_text'>HOME / CART</p>
            </div>

            <h2>My Cart</h2>

            <div className='cart_main_wrapper'>
                <section className='cart_item_section'>
                    <ul className='cart_list'>
                        {
                            isAuthenticated && user.cart.length > 0 ? user.cart.map(item =>
                                <CartItem
                                    itemDeleted={() => { updateUser() }}
                                    setTotal={setTotal}
                                    key={item.id}
                                    {...item} />) :

                                <div className='empty_state'>
                                    <img src='/svgs/empty_cart.svg' alt='' className='empty_image' />
                                    <p className='empty_title'>Your cart is empty</p>
                                </div>

                        }
                    </ul>
                </section>
                <section className='cart_amount_wrapper'>
                    <h3>Total amount</h3>
                    <div className='amount_wrapper_separateAmount'>
                        <p>Amount</p>
                        <p>Rs. {total}</p>
                    </div>
                    <div className='amount_wrapper_separateAmount'>
                        <p>Shipping</p>
                        <p>Rs. 110.00</p>
                    </div>
                    <div className='amount_wrapper_finalAmount'>
                        <p>Total <span className='finalAmountInfo'>  (including GST) </span></p>
                        <p>Rs. {total + 110}</p>
                    </div>
                    <button className='cart_checkout_btn' onClick={handleClick}>Checkout</button>
                </section>
            </div>
        </main>
    )
}
