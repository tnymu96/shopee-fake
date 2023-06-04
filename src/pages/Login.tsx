import React, { useState } from 'react';
import logo from '../styles/images/logo-shopee.png';
import '../styles/login.scss';
import { useForm, SubmitHandler } from "react-hook-form";
import { FacebookOutlined, Google } from '@mui/icons-material';
import Footer from '../components/Footer.tsx';
import { loginApi, getSingleUser } from '../services/userApi';

import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice.ts";
import { useNavigate } from 'react-router-dom';

type Inputs = {
    userName: string,
    passWord: string,
};

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [textButtonLogin, setTextButtonLogin] = useState('Đăng nhập');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            userName: 'johnd',
            passWord: '1'
        }
    });

    const handleIsLoading = (isLoading) => {
        setIsLoading(isLoading);
        isLoading ? setTextButtonLogin('Đang xử lý') : setTextButtonLogin('Đăng nhập');
    }
    const onSubmit: SubmitHandler<Inputs> = async data => {
        handleIsLoading(true);

        let res = await loginApi(data.userName.trim(), data.passWord);
        console.log(res);
        if (res.data) {
            let user = await getSingleUser(4);
            console.log(user);
            if (user.data) {
                localStorage.setItem('currentUser', JSON.stringify(user.data));

                dispatch(updateUser({
                    userName: data.userName.trim()
                }));

                navigate("/");
            }
            else
                console.log(user.statusText);

            handleIsLoading(false);

        }
        else {
            handleIsLoading(false);
            console.log(res.statusText);
        }
    }

    return (
        <>
            <div className='top-page'>
                <div className='d-flex align-items-center wrap'>
                    <img src={logo} alt='Shopee' height={50} className='p-2 cursor' onClick={() => { navigate("/") }} />
                    <div className='p-2 fw-normal title-text'>Đăng nhập</div>
                    <div className='ms-auto p-2 text-color-main'>Bạn cần giúp đỡ?</div>
                </div>
            </div >
            <div className='main-page'>
                <div className='wrap d-flex align-items-center justify-content-end'>
                    <div className='section-login'>
                        <h5>Đăng nhập</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='wrap-input'>
                                <input {...register("userName", { required: true })} placeholder='Tên đăng nhập' />
                                {errors.userName && <span className='text-error'>Vui lòng điền vào mục này.</span>}
                            </div>
                            <div className='wrap-input'>
                                <input {...register("passWord", { required: true })} placeholder='Mật khẩu' type='password' />
                                {errors.passWord && <span className='text-error'>Vui lòng điền vào mục này.</span>}
                            </div>
                            <input type="submit" value={textButtonLogin} disabled={isLoading} />
                        </form>
                        <div className='d-flex action-forgetpass'>
                            <div className='text-start'>Quên mật khẩu</div>
                            <div className='text-end'>Đăng nhập với SMS</div>
                        </div>

                        <div className='text-or d-flex align-items-center'>
                            <div className='first'></div>
                            <span className='text'>hoặc</span>
                            <div className='last'></div>
                        </div>

                        <div className='button-socials d-flex'>
                            <button className='d-flex align-items-center justify-content-center'>
                                <FacebookOutlined fontSize='small' />
                                <div>Facebook</div>
                            </button>
                            <button className='d-flex align-items-center justify-content-center'>
                                <Google fontSize='small' />
                                <div>Google</div>
                            </button>
                        </div>

                        <div className='know-shopee'>Bạn mới biết đến Shopee? <span className='cursor'>Đăng ký</span></div>
                    </div>
                </div >
            </div >

            <Footer />
        </>
    )
}

export default Login;