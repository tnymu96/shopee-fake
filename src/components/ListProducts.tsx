import React, { useEffect, useState } from 'react';
import '../styles/product.scss';
import { getAllProducts } from '../services/productApi';
import { useNavigate } from 'react-router-dom';

const ListProducts = () => {

    const [listProducts, setListProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let res = await getAllProducts();
        if (res && res.data) {
            setListProducts(res.data);
        }
    }

    const handleClickProduct = (product) => {
        navigate(`/product/${product.id}`)
    }

    return <>
        <div className='wrap'>
            <div className='title'>
                <span>Gợi ý hôm nay</span>
            </div>

            <div className='all-products'>
                <div className="row">
                    {listProducts && listProducts.length > 0 &&
                        listProducts.map((item, index) => {
                            return (
                                <>
                                    <div className="col wrap-product cusor" key={`product-${item.id}`} onClick={() => handleClickProduct(item)}>
                                        <div className="wrap-img">
                                            <img className='img-ori' src={item.image} alt={item.category} />
                                            <img className='img-overlay' src="https://down-vn.img.susercontent.com/file/vn-50009109-532ca40ed75b598e9063e778e9a6d1ff" />
                                        </div>
                                        <div className='wrap-product-name'>
                                            <div className='name'>
                                                {item.title}
                                            </div>
                                            <div className='price-wrap d-flex align-items-center justify-content'>
                                                <span className='price w-100'>
                                                    {item.price} $
                                                </span>
                                                <span className='sold'>Đã bán {item.rating.count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    </>
}

export default ListProducts;