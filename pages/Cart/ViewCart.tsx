'use client';
import { useAppdispatch, useSelector } from '@/Store/Store'
import QtyBtn from '@/components/AddToCart/QtyBtn'
import { decrement, increment, totalCartItemsSelector, totalPriceSelector } from '@/components/AddToCart/store/CartItemReducer'
import MainLayout from '@/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


const ViewCart = () => {

  const cartItems = useSelector((state: any) => state.cart.cartItems)

  const totalPrice = useSelector(totalPriceSelector)
  const totalItems = useSelector(totalCartItemsSelector)

  // console.log("first::::", cartItems)

  const router = useRouter();
  const dispatch = useAppdispatch();

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("Token")
    if (token != null) {
      setIsLogin(true)
      router.push('/Cart/ViewCart')
    }
    else {
      router.push('/UserLogin')
    }
  }, [isLogin])



  return (
    <div>
      <MainLayout>
        <div className='container sub-container'>
          <h2>Shopping Cart</h2>
          {isLogin == true &&
            cartItems == 0 ?
            (<h4 className='d-flex justify-content-sm-center'>Your Cart is empty.</h4>)
            :
            (
              <>
                <table className="table" style={{ marginTop: "20px" }}>
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((item: any, index: any) => {
                        return (
                          <>
                            <tr key={index} style={{ textAlign: "center" }} >
                              <td style={{ width: "400px" }}>
                                <Image src={item.product.thumbnail} alt={`images of ${item.product.title}`}
                                  width={200} height={150} />
                                <p>{item.product.title}</p>
                              </td>
                              <td style={{ paddingTop: "70px", paddingBottom: "55px" }}>
                                <h6>${item.product.price}</h6>
                              </td>
                              <td style={{ paddingTop: "50px", paddingBottom: "55px" }}>
                                <QtyBtn
                                  qty={item.qty}
                                  onDecrease={() =>
                                    dispatch(decrement(item.product))
                                  }
                                  onIncrease={() =>
                                    dispatch(increment(item.product))
                                  }
                                />
                              </td>
                              <td style={{ paddingTop: "70px", paddingBottom: "55px" }}>
                                <h6>${item.qty * item.product.price}</h6>
                              </td>
                            </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <h5>Total Amount ({totalItems} items): ${totalPrice}</h5>
                </div>
                <div style={{ float: "right" }}>
                  <Link href="/Cart/ViewCart/CheckOut"><button className='btn btn-warning'>Proceed to Buy</button></Link>
                </div>
              </>
            )
          }
        </div>
      </MainLayout>
    </div>
  )
}

export default ViewCart