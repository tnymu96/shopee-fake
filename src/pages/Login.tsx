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

import { useTranslation } from 'react-i18next';

type Inputs = {
    userName: string,
    passWord: string,
};

const Login = () => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [textButtonLogin, setTextButtonLogin] = useState(t('content.login'));
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            userName: 'johnd',
            passWord: 'johnd'
        }
    });

    const handleIsLoading = (isLoading) => {
        setIsLoading(isLoading);
        isLoading ? setTextButtonLogin(t('content.login-processing')) : setTextButtonLogin(t('content.login'));
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
                    <div className='p-2 fw-normal title-text'>{t('content.login')}</div>
                    <div className='ms-auto p-2 text-color-main'>{t('content.need-help')}</div>
                </div>
            </div >
            <div className='main-page'>
                <div className='wrap d-flex align-items-center justify-content-end'>
                    <div className='section-login'>
                        <h5>{t('content.login')}</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='wrap-input'>
                                <input {...register("userName", { required: true })} placeholder={t('content.login')} />
                                {errors.userName && <span className='text-error'>{t('content.error-login')}</span>}
                            </div>
                            <div className='wrap-input'>
                                <input {...register("passWord", { required: true })} placeholder={t('content.password')} type='password' />
                                {errors.passWord && <span className='text-error'>{t('content.error-login')}</span>}
                            </div>
                            <input type="submit" value={textButtonLogin} disabled={isLoading} />
                        </form>
                        <div className='d-flex action-forgetpass'>
                            <div className='text-start'>{t('content.forgot-pass')}</div>
                            <div className='text-end'>{t('content.login-sms')}</div>
                        </div>

                        <div className='text-or d-flex align-items-center'>
                            <div className='first'></div>
                            <span className='text'>{t('content.or')}</span>
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

                        <div className='know-shopee'>{t('content.new-to-shopee')} <span className='cursor'>{t('content.sign-up')}</span></div>
                    </div>
                </div >
            </div >

            <Footer />
        </>
    )
}

export default Login;