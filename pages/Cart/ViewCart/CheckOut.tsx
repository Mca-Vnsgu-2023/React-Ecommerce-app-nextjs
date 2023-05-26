'use client';
import { useAppdispatch, useSelector } from '@/Store/Store'
import { clearItem, totalPriceSelector } from '@/components/AddToCart/store/CartItemReducer'
import MainLayout from '@/layout/MainLayout'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import Styles from './checkout.styles.module.scss'
import { useRouter } from 'next/router'

const CheckOut = () => {

  const router=useRouter()
  const cartItems = useSelector((state: any) => state.cart.cartItems)
  const totalPrice = useSelector(totalPriceSelector)

  const { register, handleSubmit } = useForm()

  const onSubmit = (formData: any) => {
    // console.log("formData::", formData)
  }

  const dispatch = useAppdispatch();

  const makePayment = async () => {

    const headers = {
      "Content-Type": "application/json",
    }
    
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const postData = {
      name: "ECommerce App",
      currency: "INR",
      amount: totalPrice,
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postData)
    })
      .then((res) => res.json());

    console.log("Response Data::",data);
    var options = {
      key: process.env.RAZORPAY_KEY,
      name: postData.name,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      handler: function (response: any) {
        // Validate payment at server - using webhooks is a better idea.
        if(response != null){
          dispatch(clearItem(cartItems))
          router.push('/MyOrder')
        }
        else{
          router.push('/Cart/ViewCart')
        }
        console.log("URL::", response);
        sessionStorage.setItem("OrderDetails", JSON.stringify(data))
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      // prefill: {
      //   name: "ECommerce Pvt Ltd",
      //   email: "eCommercework@gmail.com",
      //   contact: "9999999999",
      // },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };


  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  return (
    <div>
      <MainLayout>
        <div className='container sub-container'>
          <h2>Billing Details</h2>
          <div className='row' style={{ marginTop: "30px" }}>
            <div className='col-lg-6 col-sm-12'>
              <div className='row'>
                <form onSubmit={handleSubmit(onSubmit)} className={`${Styles.formTag} col-sm-9`}>
                  <label>First Name</label>
                  <input type="text" className='form-control' {...register("firstName")} />
                  <label>Company Name</label>
                  <input type="text" className='form-control' {...register("companyName")} />
                  <label>Street Address</label>
                  <input type="text" className='form-control' {...register("streetAddress")} />
                  <label>Apartment,floor,etc.(optional)</label>
                  <input type="text" className='form-control' {...register("floorNo")} />
                  <label>Town/City</label>
                  <input type="text" className='form-control' {...register("City")} />
                  <label>Phone Number</label>
                  <input type="text" className='form-control' {...register("phoneNo")} />
                  <label>Email Address</label>
                  <input type="text" className='form-control' {...register("email")} />
                  <div>
                    <input type="checkbox" />
                    <span> Save this information for faster check-out next time</span>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-6 col-sm-12'>
              <div className='row' style={{ marginLeft: "20px", marginRight: "20px"}}>
                <table>
                  <tbody>
                    {cartItems.map((item: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td className='col-2' style={{height: "60px"}}><Image src={item?.product?.thumbnail} width={50} height={50}
                            alt={`image of ${item?.product?.title}`} />
                          </td>
                          <td className='col-6'>{item?.product?.title}</td>
                          <td className='col-2' style={{textAlign:"end",paddingRight: "10px"}}>${item.qty * item.product.price}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                  <table className='table'>
                    <tbody>
                      <tr>
                        <td>SubTotal</td>
                        <td style={{textAlign: "end"}}>${totalPrice}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td style={{textAlign: "end"}}>Free</td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td style={{textAlign: "end"}}><h6>${totalPrice}</h6></td>
                      </tr>
                    </tbody>
                  </table>
                <div className={Styles.radioDiv} style={{marginBottom: "15px"}}>
                  <input type="radio" value="Bank" name="gender" className={Styles.inputRadio}/>
                  <span style={{paddingLeft: "10px"}}>Bank</span>
                </div>
                <div className={Styles.radioDiv}>
                  <input type="radio" value="Cash on delivery" name="gender" className={Styles.inputRadio} />
                  <span style={{paddingLeft: "10px"}}>Cash on delivery</span>
                </div>
                <div>
                  <button className={Styles.placeOrderBtn} onClick={makePayment} >Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default CheckOut