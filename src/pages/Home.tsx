import React from 'react';
import Header from '../components/header/Header.tsx';
import Footer from '../components/Footer.tsx';
import ListProducts from '../components/ListProducts.tsx';

const Home = () => {

    return <>
        <Header />
        <ListProducts />
        <Footer />
    </>
}

export default Home;