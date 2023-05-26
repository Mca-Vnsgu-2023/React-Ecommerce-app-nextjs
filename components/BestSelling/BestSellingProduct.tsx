import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard';


const BestSellingProduct = () => {

    const [bestSellingData, setBestSellingData] = useState<any>([]);

    async function fetchProductData() {
        try {
                const productData = await axios.get(`https://dummyjson.com/products?limit=4&skip=40`)
                    .then((res) => res.data.products)
                    setBestSellingData(productData)
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [])


  return (
    <div className='col-12'>
      <div className='container sub-container'>
        <div className="tag" style={{paddingTop: "15px"}}>
          <span>
            {`This Month`}
          </span>
        </div>
        <div className='row'>
          <div className='col-6'>
            <h1>Best Selling Products</h1>
          </div>
        </div>
        <div className='row'>
                        {bestSellingData.length > 0 ?
                            (
                                bestSellingData.map((item: any) => {
                                    return (
                                        <ProductCard product={item} key={item.id} />
                                    )
                                })
                            )
                            :
                            (
                                <div>
                                    <h2>No record found.</h2>
                                </div>
                            )
                        }
                    </div>
      </div>
    </div>
  )
}

export default BestSellingProduct