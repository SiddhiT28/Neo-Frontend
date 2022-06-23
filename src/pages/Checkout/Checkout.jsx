import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { devAPI } from '../../API/constant';
import ProductSummary from '../../components/Checkout/ProductSummary';
import { AuthContext } from '../../Data/AuthContext';
import "./checkout.css";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    });

}

export default function Checkout() {

    const Navigate = useNavigate();
    const [products, setProducts] = useState();
    const [total, setTotal] = useState(0);
    const { user } = useContext(AuthContext);
    const [selectedAddress, setSelectedAddress] = useState();

    const displayPayment = () => {

        const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay is not loaded 😑");
        }

        const selectedProductsId = products.products.map(product => {
            const data = {
                id: product.product,
                quantity: product.quantity
            }
            return data;
        });

        console.log(selectedProductsId);

        axios.post(`${devAPI}/api/order/payment`, {
            user: user.id,
            amount: total,
            address: selectedAddress.id,
            products: JSON.stringify(selectedProductsId)

        }).then(res => {
            const options = {
                "key": "rzp_test_eJWfQaM3DPZbpL",
                "amount": res.data.amount,
                "currency": "INR",
                "name": "Neo",
                "description": "Payment for order",
                "image": "https://example.com/your_logo",
                "callback_url": `${devAPI}/api/order/payment/callback`,
                "redirect": true,
                "order_id": res.data.order_id,
                "handler": function (response) {

                },
                "prefill": {
                    "name": user.name,
                    "email": user.email,
                    "contact": "7045290096"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#39085f"
                }
            };
            // eslint-disable-next-line no-undef
            var paymentObject = new Razorpay(options);
            paymentObject.open();
        })



    }

    useEffect(() => {

        setProducts(JSON.parse(sessionStorage.getItem('checkoutDetails')))
        console.log("Checkout session log>>", JSON.parse(sessionStorage.getItem('checkoutDetails')));
    }, [])

    return (
        <main className='main_checkout'>

            <Helmet>
                <title>Checkout - Neo</title>
            </Helmet>

            <section className='checkout_orderDetails'>
                <h2>Order Summary</h2>
                <hr />
                <ul className='orderDetails_list'>
                    {
                        products ? products.products.length > 0 && products.products.map(item =>
                            <ProductSummary item={item} setTotal={setTotal} />
                        ) : null
                    }
                </ul>
                <div className='orderDetails_totalAmountDisplay'>
                    <p className='totalAmountDisplay_label'>Total Amount (including GST and shipping cost)</p>
                    <p className='totalAmountDisplay_price'>₹{total}</p>
                </div>
                <hr />
                <p>
                    Terms & Condition Apply
                </p>
            </section>
            <section className='checkout_shippingDetails'>
                <h2>Select Shipping Address</h2>
                <hr />
                <ul className='shippingDetails_addressList'>
                    {
                        user.addresses && user.addresses.map(item => <li className='addressList_item'>
                            <input type={"radio"} name="addressId" value={"addressId"} onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedAddress(item)
                                }
                            }} className="item_checkBox" />
                            <div>
                                <p className='item_name'>{item.name}</p>
                                <address className='item_address'>
                                    {item.street}, {item.city}, {item.state}, {item.country}
                                </address>
                            </div>
                        </li>)
                    }
                </ul>
                <button className='checkout_paymentBtn' onClick={displayPayment}>
                    Proceed to Payment
                </button>
            </section>
        </main>
    )
}
