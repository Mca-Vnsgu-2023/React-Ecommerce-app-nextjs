import React, { useEffect, useState } from 'react'
import { useGetProductByCategoryQuery } from '../ProductCard/store'
import ProductCard from '../ProductCard/ProductCard'
import { IProduct } from '../../types/productType'
import Loader from '../Loader/Loader'


const ProductByCategory = ({ categoryName }: any) => {

    const { data: CategoryProduct, isSuccess, isLoading } = useGetProductByCategoryQuery({ categoryName })
    const [productData, setProductData] = useState<IProduct[]>([])

    useEffect(() => {
        if (CategoryProduct) {
            setProductData(CategoryProduct?.products)
        }
    }, [CategoryProduct])



    return (
        <div className='row'>
            {isLoading &&
                <Loader />
            }
            {isSuccess && productData.map((item: any, index: any) => {
                return (
                    <ProductCard product={item} key={index} />
                )
            })}
        </div>
    )
}

export default ProductByCategory