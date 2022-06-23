import axios from 'axios';
import React, { useContext } from 'react';
import { devAPI } from '../../../API/constant';
import { AuthContext } from '../../../Data/AuthContext';

export default function AddressList({ id, name, street, city, state, zip }) {

    const { updateUser } = useContext(AuthContext);

    return (
        <li className='list_item'>
            <ul className='item_details'>
                <li className='details_addressName'>
                    <p>{name}</p>
                </li>
                <li className='details_locality'>
                    <p>{street} </p>
                </li>
                <li className='details_city'>
                    <p>{city}</p>
                </li>
                <li className='details_state'>
                    <p>{state}</p>
                </li>
                <li className='details_postalCode'>
                    <p>{zip} </p>
                </li>

                <li className='details_cta'>
                    <button onClick={() => {
                        console.log('delete', id)
                        axios.post(`${devAPI}/api/user/deleteAddress`, {
                            id: id,
                        })
                            .then(res => {
                                console.log(res.data)
                                updateUser()
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}>
                        Delete
                    </button>
                    <button>
                        Edit
                    </button>
                </li>
            </ul>
        </li>
    )
}
