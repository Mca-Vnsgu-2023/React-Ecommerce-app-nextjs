import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { useGetAllCategoryQuery, useGetAllProductQuery } from './store';
import Image from 'next/image';
import Styles from './BannerSlider.styles.module.scss'
import Loader from '../Loader/Loader';
import Link from 'next/link';
import Category from './Category/Category';
import { increment } from '../AddToCart/store/CartItemReducer';
import { useAppdispatch } from '@/Store/Store';


const BannerSliderPage = () => {

  const { data: productData, isSuccess, isLoading } = useGetAllProductQuery([])

  const [productList, setProductList] = useState([])

  const dispatch = useAppdispatch();
 
  useEffect(() => {
    if (productData) {
      const FinalProductList = productData?.products
      setProductList(FinalProductList)
    }
  }, [productData])

 
  const SliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,

    appendDots: (dots:any) => (
      <div
        style={{
          position: "absolute",
          width: "890px",
          display:"flex",
          justifyContent: "center",
          padding: "40px"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <Category />
        </div>
        <div className='col-9'>
          {isLoading && <Loader />}
          {isSuccess && productList &&
            <div className={Styles.sliderDiv}>
              <Slider {...SliderSettings}>
                {productList?.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <Image src={item?.thumbnail} alt="thumbnailImg" 
                             className={Styles.sliderImg} 
                             width={890} height={400} 
                             loading='eager'
                             priority/>
                      <div className={Styles.textOnImg}>
                        <h1>{item?.title}</h1>
                        <p>{item?.description}</p>
                        <h3>Up to 10% off Voucher</h3>
                        <div className={Styles.shopNowDiv}>
                          <Link href={`/addToCart/${item.id}`} onClick={() => dispatch(increment(item))} >ShopNow</Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default BannerSliderPage