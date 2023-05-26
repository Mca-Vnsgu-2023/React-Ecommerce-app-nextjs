import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Styles from './productCard.styles.module.scss'
import StarRating from '../ProductsStartRating/StarRating'
import { IProduct } from '../../types/productType'
import Link from 'next/link'
import { useAppdispatch, useSelector } from '@/Store/Store'
import { increment } from '../AddToCart/store/CartItemReducer'
import { addToWishlist, removeItemFromWishlist, selectWishlistItems } from '../WishList/store/WishListItemReducer'


interface IProps {
    product: IProduct
}


export const isInWishlist = (productId: number): boolean => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.includes(productId);
};

const ProductCard = ({ product }: IProps) => {

    const dispatch = useAppdispatch();

    const isWishlistItem = isInWishlist(product.id);

    const wishListItems = useSelector(selectWishlistItems)

    const handleAddToWishlist = (id: number) => {
        dispatch(addToWishlist(id));
    };

    const handleRemoveFromWishlist = (itemId: number) => {
        dispatch(removeItemFromWishlist(itemId));
    };


    return (
        <div className={`col-3 ${Styles.productCard}`} key={product?.id}>
            <div className={Styles.imgWrap}>
                <Image src={product?.thumbnail}
                    alt={`image of ${product?.title}`}
                    fill={true} sizes="100%"
                    loading='eager'
                    priority
                />
                <div className={Styles.addToCart}>
                    {/* <Link href={`/addToCart/${product?.id}`}> */}
                    <button onClick={() => dispatch(increment(product))}>Add To Cart</button>
                    {/* </Link> */}
                </div>
            </div>
            <div>
                <button className={Styles.btnDiscount}>-{product?.discountPercentage}%</button>
            </div>
            <div>
                <button className={Styles.btnHeart} >
                    {isWishlistItem == true ?
                        <i className="fa fa-heart" onClick={() => handleRemoveFromWishlist(product.id)}></i>
                        :
                        <i className="fa-regular fa-heart" onClick={() => handleAddToWishlist(product.id)}></i>
                    }
                </button>
            </div>
            <div>
                <Link href={`/addToCart/${product?.id}`}>
                    <button className={Styles.btnEye}>
                        <i className="fa-regular fa-eye" aria-hidden="true"></i>
                    </button>
                </Link>
            </div>
            <div className={Styles.productInfo}>
                <div className={Styles.title}>
                    {product?.title}
                </div>
                <div className={`${Styles.priceDiv} row`}>
                    <h5 className={`${Styles.price} col-2`}>${product?.price}</h5>
                    <p className='col' style={{ margin: 0 }}>(Total Stock: {product?.stock})</p>
                </div>
                <div>
                    <StarRating rating={product?.rating} shownumber />
                </div>
            </div>
        </div>
    )
}

export default ProductCard