import ProductCard from '@/components/ProductCard/ProductCard';
import MainLayout from '@/layout/MainLayout';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SearchProductPage() {

    const router = useRouter()
    const { searchInput } = router.query

    const [filteredResults, setFilteredResults] = useState<any>([]);

    async function fetchSearchData() {
        try {
            if (searchInput !== '') {
                const filterData = await axios.get(`https://dummyjson.com/products/search?q=${searchInput}`)
                    .then((res) => res.data.products)
                setFilteredResults(filterData)
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchSearchData()
    }, [searchInput])


    return (
        <div>
            <MainLayout>
                <div className='container sub-container'>
                    <div className="tag" style={{ paddingTop: "10px" }}>
                        <span>
                            {'Products'}
                        </span>
                    </div>
                    <div className='row'>
                        {searchInput != null &&
                            filteredResults.length > 0 ?
                            (
                                filteredResults.map((item: any) => {
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
            </MainLayout>
        </div>
    )
}

export default SearchProductPage