import React from 'react';
import Header from '../components/header/Header.tsx';
import Footer from '../components/Footer.tsx';
import TableProductsInCart from '../components/TableProductsInCart.tsx';
import '../styles/cart.scss';

const Cart = () => {

    return <>
        <Header />
        <div className="wrap">
            <h4 className='page-title'>Giỏ hàng</h4>
            <TableProductsInCart />
        </div>
        <Footer />
    </>
}

export default Cart;