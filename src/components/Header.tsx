import React from 'react';
import '../styles/header.scss';
import { FacebookOutlined, Instagram, Notifications, QuestionMark, Public } from '@mui/icons-material';

const Header = () => {

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
                        <span>|</span>
                        <span>Đăng Ký</span>
                        <span className='btn-login'>Đăng nhập</span>
                    </div>

                </div>
            </header >
        </>
    )
}

export default Header