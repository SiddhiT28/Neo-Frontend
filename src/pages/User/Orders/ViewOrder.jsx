import React, { useContext, useState } from 'react';
import { EmptyOrder } from '../../../components/EmptyState/EmptyOrder';
import OrderItem from '../../../components/Order/OrderItem';
import { AuthContext } from '../../../Data/AuthContext';
import "./order.css";

export default function ViewOrder() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [filteredOrder, setFilteredOrder] = useState(user.order);

    const print = (msg) => {
        console.log('====================================');
        console.log(msg);
        console.log('====================================\n');
    }

    const handleFilter = (e) => {
        print(e.target.value);

        switch (e.target.value) {
            case "all":
                setFilteredOrder(user.order);
                break;
            case "pending":
                setFilteredOrder(user.order.filter(order => order.status === "pending"));
                break;
            case "completed":
                setFilteredOrder(user.order.filter(order => order.status === "completed"));
                break;
            case "7":
                setFilteredOrder(user.order.filter(order => order.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)));
                break;
            case "30":
                setFilteredOrder(user.order.filter(order => order.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)));
                break;
            case "365":
                print(user.order[0]);
                setFilteredOrder(user.order.filter(order => order.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)));
                break
            default:
                break;
        }

    }

    return (
        <>
            {/* <select className='order_filter_dropdown' onChange={handleFilter}  >
                <option selected disabled>Filer By</option>
                <option value="all">All</option>
                <optgroup label="Status">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </optgroup>
                <optgroup label="Date of order">
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="365">Last year</option>
                </optgroup>
            </select> */}
            <ul className='order_list'>
                {
                    (isAuthenticated) && (user.order.length > 0 ? filteredOrder.map((order, index) => {
                        return (
                            <OrderItem key={index} product={order} />
                        )
                    }) : <EmptyOrder />)
                }
            </ul>
        </>
    )
}
