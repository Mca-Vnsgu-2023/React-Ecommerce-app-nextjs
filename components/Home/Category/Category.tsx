import React, { useEffect, useState } from 'react'
import { useGetAllCategoryQuery } from '../store'
import Styles from './category.styles.module.scss'
import Link from 'next/link'

function Category() {

    const { data: allCategory } = useGetAllCategoryQuery([])
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        if (allCategory) {
            setCategoryList(allCategory)
        }
    }, [allCategory])


    return (
        <div className='container sub-container'>
            <div className={Styles.listwrap}>
                {allCategory &&
                    <div>
                        {categoryList.map((category: any, index: any) => {
                            return (
                                <ul key={index} className={Styles.list}>
                                    <li className='w-50'>
                                        <Link href={`products/${category}`}>
                                            {category}
                                        </Link>
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default Category