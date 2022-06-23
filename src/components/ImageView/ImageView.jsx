import React from 'react';
import "./imageView.css";
export default function ImageView({ src, alt, width, height }) {
    return (
        <div className='image_container' style={{
            width: width,
            height: height
        }}>
            <img src={src} style={{ width: width }} alt={alt} className='container_image' />
        </div>
    )
}
