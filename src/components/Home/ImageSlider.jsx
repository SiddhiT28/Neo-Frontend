import axios from 'axios';
import React, { createRef, useEffect, useRef, useState } from 'react'
import { Images } from '../../Data/HomeImageSlider';
import { devAPI } from "../../API/constant"
import "./imageSlider.css"


export default function ImageSlider() {

  const [index, setIndex] = useState(0);
  const [images, setImages] = useState();

  const slider = createRef();

  const Previous = () => {
    slider.current.scrollLeft -= slider.current.clientWidth;
    if (slider.current.scrollLeft === 0) {
      slider.current.scrollLeft = slider.current.scrollLeftMax;
    }
  }

  const Next = () => {
    slider.current.scrollLeft += slider.current.clientWidth;

    console.log({ "slider.current": slider.current })

    if (slider.current.scrollLeft === slider.current.scrollLeftMax) {
      slider.current.scrollLeft = 0;
    }
  }

  useEffect(() => {

    axios.get(`${devAPI}/api/add/banner`).then(res => {
      console.log("banner", res.data)
      setImages(res.data)
    })

    const interval = setInterval(() => {
      Next();
    }, 4000);
    return () => clearInterval(interval);


  }, []);



  return (
    <div className='wrapper_imageSlider'>
      <button className='imageSlider_btn prevBtn' onClick={Previous} >
        <img src='/svgs/chevronLeft.svg' alt='' />
      </button>

      <ul
        style={{
          'gridTemplateColumns': `repeat(${images && images.length}, 100vw)`,
        }}
        className='imageSlider_list hide-scrollbar' ref={slider}
      >

        {images && images.map((image, i) => {
          return (
            <li key={i} className='imageSlider_image' style={{
              backgroundImage: `url(${devAPI}/${image.image})`,
            }}>
            </li>
          )
        })
        }
      </ul>

      <button className='imageSlider_btn nextBtn' onClick={Next}>
        <img src='/svgs/chevronRight.svg' alt='' />
      </button>

    </div>
  )
}
