'use client'
import React, { useEffect, useState } from 'react'
import Styles from './mainlayout.styles.module.scss'
import Link from 'next/link'
import jwtDecode from 'jwt-decode'
import Image from 'next/image'
import { useSelector } from '@/Store/Store'
import { totalCartItemsSelector } from '@/components/AddToCart/store/CartItemReducer'
import { totalWishListItem } from '@/components/WishList/store/WishListItemReducer'
import { useRouter } from 'next/router'
import { Dropdown } from 'react-bootstrap'

const Header = () => {

    const route = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [userData, SetUserData] = useState<any>([{}])
    const [searchInput, setSearchInput] = useState('');

    const totalItems = useSelector(totalCartItemsSelector)
    const totalWishItem = useSelector(totalWishListItem)

    useEffect(() => {
        const user = localStorage.getItem("Token")
        if (user != null) {
            setIsLogin(true)
            const decodeToken = jwtDecode(user)
            SetUserData(decodeToken)
        }
    }, [])

    const handleLogOut = () => {
        setIsLogin(false)
        localStorage.removeItem("Token")
    }

    const handleSearch = () => {
        if (searchInput !== "") {
            route.push(`/searchProduct/${searchInput}`)
        }
    }

    useEffect(() => {

    }, [searchInput])


    return (
        <>
            <div className={Styles.header}>
                <div className="container">
                    <div className="row justify-content-end align-items-center">
                        <div className="col-2" style={{ fontSize: "20px" }}>
                            <Link className="navbar-brand" href='/'><b>Exclusive</b></Link>
                        </div>
                        <nav className="col-6 navbar navbar-expand-lg navbar-light justify-content-center">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className={`nav-link ${Styles.active}`} href="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/">Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/">Sign up</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className={`${Styles.search_group} col-4 d-flex  align-items-center`}>
                            <div className={Styles.search_box}>
                                <input type="text" placeholder='What are you looking for?'
                                    className={Styles.searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                <i className={`${Styles.searchIcon} fa-solid fa-magnifying-glass`}
                                    onClick={handleSearch}></i>
                            </div>
                            <div className="mx-3">
                                <Link href='/WishList'>
                                    <i className="fa-regular fa-heart" style={{ fontSize: "25px" }}></i>
                                </Link>
                                {isLogin == true && totalWishItem != 0 &&
                                    <div className={Styles.cartItemDiv}>
                                        {totalWishItem}
                                    </div>
                                }
                            </div>
                            <div className="mx-3">
                                <Link href={'/Cart/ViewCart'}><i className="fa-solid fa-cart-shopping" style={{ fontSize: "25px" }}></i></Link>
                                {isLogin == true && totalItems != 0 &&
                                    <div className={Styles.cartItemDiv}>
                                        {totalItems}
                                    </div>
                                }
                            </div>
                            {isLogin == false &&
                                <div className='mx-2'>
                                    <Link href={'/UserLogin'}>
                                        <button className={Styles.userButton}>
                                            <i className="fa fa-user-circle" style={{ color: "#DB4444", fontSize: "25px" }}></i>
                                        </button>
                                    </Link>
                                </div>
                            }
                            {isLogin == true && userData &&
                                <>
                                    <div className='userDropdown mx-2'>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle>
                                                    <div className={Styles.avatarImg}>
                                                        <Image src={userData?.image}
                                                            loading='eager'
                                                            priority
                                                            width={40} height={40}
                                                            alt='userImage'
                                                        />
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="/MyOrder">
                                                        <i className="fa-solid fa-clipboard-list"></i>
                                                        <span style={{ paddingLeft: "15px" }}>My Order</span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="/" onClick={handleLogOut}>
                                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                        <span style={{ paddingLeft: "15px" }}>LogOut</span>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className='mx-2'>
                                        <h6 className={Styles.userName} >Welcome, {userData.username}</h6>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
