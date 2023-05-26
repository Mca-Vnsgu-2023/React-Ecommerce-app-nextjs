import { useSelector } from '@/Store/Store'
import ProductCard from '@/components/ProductCard/ProductCard'
import { selectWishlistItems } from '@/components/WishList/store/WishListItemReducer'
import MainLayout from '@/layout/MainLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const WishList = () => {


  const wishListIds = useSelector(selectWishlistItems)
  const[wishListData,setWishListData]=useState<any>([])

  async function fetchData() {
    try {
      const responses = await Promise.all(
        wishListIds?.map((itemId: number) => axios.get(`https://dummyjson.com/products/${itemId}`))
      );
      const data = responses.map(response => response.data);
      setWishListData(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[wishListIds])

  
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("Token")
    if (token != null) {
      setIsLogin(true)
      router.push('/WishList')
    }
    else {
      router.push('/UserLogin')
    }
  }, [isLogin])


  return (
    <div>
      <MainLayout>
        <div className='container sub-container'>
          <h2>Your WishList</h2>
          <div className='row' style={{ marginTop: "25px" }}>
            {isLogin == true && wishListData.length == 0 ?
              (<h4 className='d-flex justify-content-sm-center'>Your wishlist is empty.</h4>)
              :
              (
                wishListData.length > 0 && wishListData.map((item: any) => {
                  return (
                    <>
                      <ProductCard product={item} key={item.id} />
                    </>
                  )
                })
              )
            }
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default WishList