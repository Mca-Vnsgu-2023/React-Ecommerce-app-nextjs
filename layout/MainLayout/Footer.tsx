import React from 'react'
import Styles from './mainlayout.styles.module.scss'

const Footer = () => {
    return (
        <div>
            <div className={Styles.footer}>
                <footer>
                    <div className="container sub-container">
                        <div className="row">
                            <div className="col-sm-6 col-md-2 item">
                                <h3>Exclusive</h3>
                                <ul>
                                    <li><a href="#">Subscribe</a></li>
                                    <li><a href="#">Get 10% off your first order</a></li>
                                    {/* <li><input type='text' className='form-control'/></li> */}
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-2 item">
                                <h3>Support</h3>
                                <ul>
                                    <li><p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p></li>
                                    <li><p>exclusive@gmail.com</p></li>
                                    <li><p>+88015-88888-9999</p></li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-2 item">
                                <h3>Account</h3>
                                <ul>
                                    <li><p>My Account</p></li>
                                    <li><p>Login/Register</p></li>
                                    <li><p>Cart</p></li>
                                    <li><p>Wishlist</p></li>
                                    <li><p>Shop</p></li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-2 item">
                                <h3>Quick Link</h3>
                                <ul>
                                    <li><p>Privacy Policy</p></li>
                                    <li><p>Terms Of Use </p></li>
                                    <li><p>FAQ</p></li>
                                    <li><p>Contact</p></li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-3 item">
                                <h3>Download App</h3>
                                <ul>
                                    <li><p>Save $3 with App New User Only</p></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr style={{margin: 0}} />
                    <div>
                        <p className={Styles.copyright}>@ Copyright Rimel 2022. All right reserved</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer