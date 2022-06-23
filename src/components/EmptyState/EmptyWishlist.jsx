import React from 'react'

export const EmptyWishlist = () => {
    return (
        <div className='empty_state'>
            <img src='/svgs/empty_wishlist.svg' alt='' width={100} className='empty_image' />
            <p className='empty_title'>Your list is empty!</p>
        </div>
    )
}
