import '../../styles/header.scss';
import logo from '../../styles/images/logo-shopee-white.png';
import Badge from '@mui/material/Badge';
import { FacebookOutlined, Instagram, Notifications, QuestionMark, Public, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from './HeaderLogin.tsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import HeaderChangeLanguage from './HeaderChangeLanguage.tsx';

const Header = () => {
    const { t } = useTranslation();

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
                        <span>{t('content.seller-center')}</span>
                        <span>|</span>
                        <span>{t('content.start-selling')}</span>
                        <span>|</span>
                        <span>{t('content.download')}</span>
                        <span>|</span>
                        <span>{t('content.follow-on')}</span>
                        <FacebookOutlined fontSize='small' /> <Instagram fontSize='small' />
                    </div>

                    <div className='header-left'>
                        <Notifications fontSize='small' />
                        <span>{t('content.noti')}</span>
                        <QuestionMark fontSize='small' />
                        <span>{t('content.help')}</span>
                        <HeaderChangeLanguage />
                        {
                            user.username ?
                                <>
                                    <HeaderLogin user={user} />
                                </>
                                :
                                <>
                                    <span>|</span>
                                    <span>{t('content.sign-up')}</span>
                                    <span className='btn-login' onClick={() => handleButtonLogin()}>{t('content.login')}</span>
                                </>
                        }

                    </div>
                </div>

                <div className='wrap wrap-search d-flex'>
                    <div><img src={logo} alt='Shopee' height={50} className='cursor' onClick={() => { navigate("/") }} /></div>
                    <div className='w-100'>
                        <div className='wrap-searchbar w-100'>
                            <input type="text" className='w-100' placeholder={t('content.enter-text-search')} />
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