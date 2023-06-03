import '../../styles/header.scss';

import { FacebookOutlined, Instagram, Notifications, QuestionMark, Public } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from './HeaderLogin.tsx';
import React, { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        avatar: "",
        first_name: "",
        last_name: ""
    });

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
                            user.first_name !== "" ?
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
            </header >
        </>
    )
}

export default Header