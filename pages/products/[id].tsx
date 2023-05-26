import ProductByCategory from '@/components/ProductByCategory/ProductByCategory';
import MainLayout from '@/layout/MainLayout';
import { useRouter } from 'next/router'
import React from 'react'

function CategoryProductPage() {

    const router = useRouter()
    const { id } = router.query
    
    return (
        <div>
            <MainLayout>
                <div className='container sub-container'>
                <div className="tag" style={{paddingTop: "10px"}}>
                    <span>
                        {'Products'}
                    </span>
                </div>
                    <h1>{id}</h1>
                    <ProductByCategory categoryName={id} />
                </div>
            </MainLayout>
        </div>
    )
}

export default CategoryProductPage