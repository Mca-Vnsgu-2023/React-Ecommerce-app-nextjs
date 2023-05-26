import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../ProductCard/store'
import Image from 'next/image'
import Styles from './addToCartPage.styles.module.scss'
import Loader from '../Loader/Loader'
import StarRating from '../ProductsStartRating/StarRating'
import AddToCartBtn from './AddToCartBtn'
import { useRouter } from 'next/router'
import Link from 'next/link'


interface Props {
  productId: number
}

const AddToCartPage = ({ productId }: Props) => {

  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter();
  const[imageLoad,setImageLoad]=useState(true)

  const ImageLoadingComplete =()=> setImageLoad(false)

  const { data: productData, isSuccess, isLoading } = useGetProductByIdQuery({ productId })


  useEffect(() => {
    const user = localStorage.getItem("Token")
    if (user != null) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
      router.push('/UserLogin')
    }
  }, [isLogin, router])


  return (
    <div className='container'>
      <div className={`${Styles.mainDiv} row`}>
        {isLoading || imageLoad &&
          <Loader />
        }
        {isSuccess && productData &&
          <>
            <div className='col-lg-6 col-sm-12'>
              <div className='row'>
                <div className='col-md-3 col-sm-12'>
                  {Array.isArray(productData?.images) && productData?.images.length > 0 &&
                    productData?.images.map((item: any, index: any) => {
                      if (index <= 3) {
                        return (
                          <ul key={index} className={Styles.listImg}>
                            <li style={{ listStyle: "none" }}>
                              <Image src={item}
                                alt={`image of ${productData?.title}`}
                                width={125} height={120}
                                loading='eager'
                                priority
                              />
                            </li>
                          </ul>
                        )
                      }
                    })
                  }
                </div>
                <div className={`${Styles.imageDiv} col-md-9 col-sm-12`}>
                  <Image src={productData?.thumbnail}
                    alt={`image of ${productData?.title}`}
                    width={450} height={575}
                    loading='eager'
                    priority
                    onLoad={ImageLoadingComplete}
                  />
                </div>
              </div>
            </div>

            <div className={`${Styles.productInfo} col-lg-6 col-sm-12`}>
              <div className='row'>
                <h2>{productData?.title}</h2>
                <p>{productData?.description}</p>
                <p>Brand: {productData?.brand}</p>
                <p>Total Stock: {productData?.stock}</p>
                <h4 className={Styles.price}>${productData?.price}</h4>
                <StarRating rating={productData?.rating} shownumber />
                <div>
                  <AddToCartBtn product={productData} />
                </div>
                <div className={Styles.buynowBtn}>
                  <Link href={'/Cart/ViewCart'}>
                    <button className='btn btn-warning'>Buy Now</button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default AddToCartPage