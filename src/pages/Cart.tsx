import React from 'react';
import Header from '../components/header/Header.tsx';
import Footer from '../components/Footer.tsx';
import TableProductsInCart from '../components/TableProductsInCart.tsx';
import '../styles/cart.scss';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const { t } = useTranslation();

    return <>
        <Header />
        <div className="wrap">
            <h4 className='page-title'>{t('content.cart')}</h4>
            <TableProductsInCart />
        </div>
        <Footer />
    </>
}

export default Cart;