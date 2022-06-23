import axios from 'axios'
import React, { useState } from 'react'
import { devAPI } from '../../../API/constant'
import { AddIcon } from '../../../components/Icons'
import Modal from '../../../components/Modal/Modal'
import AddressList from '../../../components/Profile/AddressView/AddressList'
import { useAuth } from '../../../Data/AuthContext'
import AddAddress from './AddAddress'


export default function ViewAddress() {

    const { user, updateUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const [buttonHover, setButtonHover] = useState(false)

    const addAddress = (address) => {
        axios.post(`${devAPI}/api/user/addAddress`, {
            email: user.email,
            ...address
        }).then(res => {
            updateUser()
            setIsOpen(false)
        }).catch(err => {
            console.log(err)
        })
    }

    return (

        <ul className='viewAddress_list'>

            {/* <li> */}
            <li
                onClick={() => setIsOpen(true)}
                className='list_addAddress_btn'
                onMouseOver={() => { setButtonHover(true) }}
                onMouseLeave={() => { setButtonHover(false) }}
            >
                <AddIcon color={buttonHover ? "#39085f" : "#565959 "} />
                Add new address
            </li>
            {/* </li> */}

            {
                isOpen &&
                <Modal setIsOpen={setIsOpen}>
                    <AddAddress onClick={addAddress} />
                </Modal>
            }

            {
                user.addresses && user.addresses.length > 0 ? user.addresses.map((item, index) => {
                    return <AddressList {...item} />
                }) : <p className='empty_state_text'>No address added yet</p>
            }
        </ul>


    )
}
