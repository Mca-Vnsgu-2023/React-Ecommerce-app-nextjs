import React, { Fragment, useEffect, useState } from 'react'
import { useGetAllCategoryQuery } from '../store'
import Styles from './category.styles.module.scss'
import Link from 'next/link'
import Loader from '@/components/Loader/Loader'
import Dropdown from '@/components/elements/Dropdown'


function Category() {

    const { data: allCategory, isSuccess, isLoading } = useGetAllCategoryQuery('')
    const [categoryList, setCategoryList] = useState<string[]>([])
    const [menscategorie, setMensCategorie] = useState<string[]>([])
    const [womenscategorie, setWomensCategorie] = useState<string[]>([])

    console.log("first", allCategory)

    useEffect(() => {
        if (isSuccess && Array.isArray(allCategory)) {
            const categories: string[] = []
            const womens: string[] = []
            const mens: string[] = []
            allCategory.forEach((items, index) => {
                if (items.includes('womens')) {
                    womens.push(items)
                } else if (items.includes('mens')) {
                    mens.push(items)
                } else {
                    categories.push(items)
                }
            })
            setCategoryList(categories)
            setMensCategorie(mens)
            setWomensCategorie(womens)
        }
        return () => {

        }

    }, [allCategory])


    return (
        <div className='container sub-container'>
            <div className={Styles.listwrap}>
                <ul className={Styles.list}>
                    <li></li>
                    {isLoading ?
                        <Loader />
                        :
                        (isSuccess) &&
                        <Fragment>
                            <li><Dropdown title={`women's fashion`} drop='down' items={womenscategorie} linkPrefix={'products'} ></Dropdown> </li>
                            <li><Dropdown title={`men's fashion`} drop='down' items={menscategorie} linkPrefix={'products'} ></Dropdown></li>
                            {categoryList.map((categorie, index) => (
                                <li key={`${index}_${categorie}`}>
                                    <Link href={`products/${categorie}`}>
                                        {categorie}
                                    </Link>
                                </li>
                            ))}
                        </Fragment>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Category