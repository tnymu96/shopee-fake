import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { getSingleProduct } from "../services/productApi";
import Header from "./header/Header.tsx";
import Footer from "./Footer.tsx";
import '../styles/product.scss';
import { Rating } from "@mui/material";

import { useDispatch } from 'react-redux';
import { addToCart } from "../store/cartSlide.ts";

import { useTranslation } from 'react-i18next';

const Product = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const answer_array = location.pathname.split("/"); // product/1
    const [product, setProduct] = useState({
        id: 0,
        title: "",
        category: "",
        image: "",
        rating: {
            rate: 0,
            count: 0
        },
        price: 0,
        description: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        getProduct(answer_array[2]);
    }, [])

    const getProduct = async (id) => {
        let res = await getSingleProduct(id);
        if (res && res.data) {
            setProduct(res.data);
        }
    }

    return (
        <>
            <Header />

            <div className="wrap single-product">
                <div className="row">
                    <div className="col-4">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="col-8">
                        <div className="product-name">{product.title}</div>
                        <div className="product-category"><span>{t('content.category')}:</span> {product.category}</div>
                        <Rating name="read-only" value={product.rating.rate} readOnly />
                        <div className="product-price">{product.price} $</div>
                        <div className="product-description">{product.description}</div>

                        <button className="add-to-cart" onClick={() => dispatch(addToCart(product))}>
                            {t('content.add-to-cart')}
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Product