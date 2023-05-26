import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Styles from './login.styles.module.scss'
import { useForm } from 'react-hook-form';
import { useAddLoginMutation } from './store';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';


const Login = () => {

    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const [addLogin] = useAddLoginMutation()

    const onSubmit = (formData: any) => {
        addLogin(formData).then((res: any) => {
            if (res?.data) {
                localStorage.setItem("Token", res?.data?.token)
                router.push('/')
            }
            else {
                toast.error("Invalid username or password!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
        )
    }


    return (
        <div style={{ paddingTop: "30px" }}>
            <div className='row'>
                <div className='col-6'>
                    <Image className={Styles.imgDiv} src={'/images/Side Image.svg'}
                        alt='sideImg' width={650} height={550}
                        loading='eager'
                        priority
                    />
                </div>
                <div className={`${Styles.formDiv} col-6`}>
                    <h1>Log in to Exclusive </h1>
                    <p style={{ fontSize: "15px", marginBottom: "3rem" }}>Enter your details below</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className={Styles.formInput} placeholder='Enter Username' {...register("username")} /><br /><br />
                        <input type="text" className={Styles.formInput} placeholder='Enter Password' {...register("password")} /><br /><br />
                        <div className='row'>
                            <div className='col-6'>
                                <button type='submit' className={Styles.btnLogin}>Log In</button>
                            </div>
                            <div className='col-6'>
                                <p className={Styles.forgetPwdText}>Forget Password?</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login