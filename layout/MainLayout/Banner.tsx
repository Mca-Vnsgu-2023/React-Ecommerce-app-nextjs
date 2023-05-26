'use client';
import React from 'react'
import Styles from './mainlayout.styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { themeToggle } from './ThemeReducer'


function Banner() {

    const {themeMode}=useSelector((state:any)=>state.theme)

    const dispatch=useDispatch()
    const onThemeToggle =()=>{
        const newThemeMode =themeMode== 'light'? 'dark' : 'light'
        dispatch(themeToggle(newThemeMode))
    }

  return (
    <div className={Styles.banner}>
            <div className={`${Styles.container} container`}>
                <div className="row justify-content-end">
                    <div className="col-8 text-center">
                        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                    </div>
                    <div className='col-2 text-end' onClick={onThemeToggle}>
                        {themeMode == 'light' ?
                             <i className="fa-solid fa-sun" /> :
                             <i className="fa-solid fa-moon" />
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Banner