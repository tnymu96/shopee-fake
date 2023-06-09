import '../../styles/header.scss';
import logo from '../../styles/images/logo-shopee-white.png';
import Badge from '@mui/material/Badge';
import { FacebookOutlined, Instagram, Notifications, QuestionMark, Public, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from './HeaderLogin.tsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: 0,
        avatar: "",
        username: ""
    });

    const totalInCart = useSelector((state) => state.cartSlide.cartQty)

    useEffect(() => {
        let tmp = localStorage.getItem('currentUser');
        if (tmp) {
            const currentUser = JSON.parse(tmp);
            if (currentUser) {
                setUser(user => ({
                    ...user,
                    ...currentUser
                }));
            }
        }

    }, []);


    const handleButtonLogin = () => {
        navigate("/login");
    }

    return (
        <>
            <header className='header-top-sticky'>
                <div className='wrap'>
                    <div className='header-right'>
                        <span>Kênh người bán</span>
                        <span>|</span>
                        <span>Trở thành Người bán Shopee</span>
                        <span>|</span>
                        <span>Tải ứng dụng</span>
                        <span>|</span>
                        <span>Kết nối</span>
                        <FacebookOutlined fontSize='small' /> <Instagram fontSize='small' />
                    </div>

                    <div className='header-left'>
                        <Notifications fontSize='small' />
                        <span>Thông Báo</span>
                        <QuestionMark fontSize='small' />
                        <span>Hỗ Trợ</span>
                        <Public />
                        <span>Tiếng Việt</span>
                        {
                            user.username ?
                                <>
                                    <HeaderLogin user={user} />
                                </>
                                :
                                <>
                                    <span>|</span>
                                    <span>Đăng Ký</span>
                                    <span className='btn-login' onClick={() => handleButtonLogin()}>Đăng nhập</span>
                                </>
                        }

                    </div>
                </div>

                <div className='wrap wrap-search d-flex'>
                    <div><img src={logo} alt='Shopee' height={50} className='cursor' onClick={() => { navigate("/") }} /></div>
                    <div className='w-100'>
                        <div className='wrap-searchbar w-100'>
                            <input type="text" className='w-100' placeholder='Nhập tìm kiếm ở đây...' />
                            {/* <button>
                                <Search color='white' />
                            </button> */}
                        </div>
                    </div>
                    <div onClick={() => navigate("/cart")} className='cusor'>
                        <Badge badgeContent={totalInCart} color="success">
                            <ShoppingCart />
                        </Badge>
                    </div>
                </div>

            </header >
        </>
    )
}

export default Header