'use client';
import MainLayout from '@/layout/MainLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MyOrder = () => {

const router=useRouter()

    const [orderList, setOrderList] = useState<any>([])
    const [orderDetails,setOrderDetails]=useState<any>(null)

    useEffect(() => {
        const orderData = sessionStorage.getItem("OrderItem")
        const sessionData = sessionStorage.getItem("OrderDetails")
        
        if (orderData && sessionData != null) {
            setOrderList(JSON.parse(orderData));
            setOrderDetails(JSON.parse(sessionData))
            // sessionStorage.clear(); 
        }
        else{
            router.push('/')
        }

    }, [])


    return (
        <div>
            <MainLayout>
                <div className='container sub-container'>
                <h2>Your Orders</h2>
                    <div className='col-4'>
                        <h4>Order Id: {orderDetails?.id} </h4>
                    </div>
                    
                    <table className='table'>
                        <thead>
                            <tr style={{textAlign: "center"}}>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((item: any, index: any) => {
                                return (
                                    <tr key={index} style={{textAlign: "center"}}>
                                        <td className=''>
                                            <Image src={item?.product?.thumbnail} alt={`images of ${item.product.title}`}
                                            width={80} height={80} />
                                        </td>
                                        <td>{item?.product?.title}</td>
                                        <td>{item?.product?.price}</td>
                                        <td>{item?.qty}</td>
                                        <td>{(item?.product?.price * item?.qty)}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={5}>
                                   <h6> Total Amount: ${Number(orderDetails?.amount).toString().slice(0,-2)} </h6>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

            </MainLayout>
        </div>
    )
}

export default MyOrder