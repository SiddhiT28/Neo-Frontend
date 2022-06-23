import React from 'react'

export const EmptyOrder = () => {
    return (
        <div className='empty_state'>
            <img src='/svgs/no_orders.svg' alt='' width={100} className='empty_image' />
            <p className='empty_title'>Buy product to see product here</p>
        </div>
    )
}
