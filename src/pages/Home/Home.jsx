import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import Carousel from '../../components/Home/Carousel'
import ImageSlider from '../../components/Home/ImageSlider'
import "./home.css";
import axios from 'axios';
import { devAPI } from '../../API/constant';

export default function Home() {

    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [discountedProducts, setDiscountedProducts] = React.useState([])
    const [shoesProducts, setShoesProducts] = React.useState([])
    const [electronicProducts, setElectronicProducts] = React.useState([])
    const [clothesProducts, setClothesProducts] = React.useState([])

    useEffect(() => {
        axios.get(`${devAPI}/api/products/all`)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
                const filterDiscountedProducts = res.data.filter(product => product.discounts > 0).slice(0, 6)
                const shoesProducts = res.data.filter(product => JSON.parse(product.category).find(prod => prod === "footwear")).slice(1, 7)
                setShoesProducts(shoesProducts)
                setDiscountedProducts(filterDiscountedProducts)
                const electronicProducts = res.data.filter(product => JSON.parse(product.category).find(prod => prod === "electronics")).slice(1, 7)
                setElectronicProducts(electronicProducts)
                const clothesProducts = res.data.filter(product => JSON.parse(product.category).find(prod => prod === "clothes")).slice(1, 7)
                setClothesProducts(clothesProducts)

            })
    }, [])

    if (loading) {
        return (
            <div className="loading">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return (
        <main className='home_main'>
            <Helmet>
                <title>Home - Neo</title>
                <meta name="description" content="Buy every thing you need." />
            </Helmet>
            <section className='image_slider'>
                <ImageSlider />
            </section>
            <Carousel title={"Product on Sale"} id="new" items={discountedProducts} />
            <Carousel title={"Footwear's"} id="new" items={shoesProducts} />
            <Carousel title={"Electronics"} id="new" items={electronicProducts} />
            <Carousel title={"Clothes"} id="new" items={clothesProducts} />
            {/* <Carousel title={"Trending Deals"} id="td" items={products} /> */}
        </main>
    )
}
