import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import React from 'react'
import MainLayout from '@/layout/MainLayout'
import BannerSliderPage from '@/components/Home/BannerSliderPage'
import SalesProducts from '@/components/Home/SalesProducts/SalesProducts'
import BestSellingProduct from '@/components/BestSelling/BestSellingProduct'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>E-Commerce App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
       <MainLayout>
          <BannerSliderPage />
          <SalesProducts />
          <BestSellingProduct />
       </MainLayout>
      </div>
    </>
  )
}
