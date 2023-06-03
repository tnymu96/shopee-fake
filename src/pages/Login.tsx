import React from 'react';
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
    email: string,
    passWord: string,
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            email: 'eve.holt@reqres.in'
        }
    });
    const onSubmit: SubmitHandler<Inputs> = async data => {
        let res = await loginApi(data.email.trim(), data.passWord);

        if (res) {
            let user = await getSingleUser(4);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user.data));

                dispatch(updateUser({
                    userName: data.email.trim(),
                    firstName: user.data.first_name,
                    lastName: user.data.last_name,
                    email: user.data.email,
                    avatar: user.data.avatar,
                }));

                navigate("/");
            }

        }
        else {

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
                                <input {...register("email", { required: true })} placeholder='Tên đăng nhập' />
                                {errors.email && <span className='text-error'>Vui lòng điền vào mục này.</span>}
                            </div>
                            <div className='wrap-input'>
                                <input {...register("passWord", { required: true })} placeholder='Mật khẩu' />
                                {errors.passWord && <span className='text-error'>Vui lòng điền vào mục này.</span>}
                            </div>
                            <input type="submit" value="Đăng nhập" />
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