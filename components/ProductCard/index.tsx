import React, { useEffect, useState } from 'react'
import { useGetSaleProductsQuery } from './store'
import Styles from './productCard.styles.module.scss'
import Loader from '../Loader/Loader'
import { IProduct } from '../../types/productType'
import ProductCard from './ProductCard'



function Products() {

    const { data: allProducts, isLoading, isSuccess } = useGetSaleProductsQuery({})

    const [productsList, setProductsList] = useState<IProduct[]>([])

    const showRecord = 4
    const [displayLength, setDisplayLength] = useState(4)

    const togglelist = () => {
        if (displayLength === showRecord) {
            setDisplayLength(allProducts?.products?.length)
        }
        else {
            setDisplayLength(showRecord)
        }
    }

    useEffect(() => {
        if (allProducts) {
            setProductsList(allProducts?.products)
        }
    }, [allProducts, productsList])

    return (
        <>
            <div className='container sub-container'>
                {isLoading &&
                    <Loader />
                }
                <div className='row'>
                    {(Array.isArray(productsList) && productsList.length > 0 && isSuccess) &&
                        productsList.map((item: any, index: any) => {
                            if (index < displayLength) {
                                return (
                                    <ProductCard product={item} key={item.id} />
                                )
                            }
                        })
                    }
                </div>
                <button className={Styles.btnViewProduct} onClick={togglelist}>View All Products</button>
            </div>
        </>
    )
}

export default Products