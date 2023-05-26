import React from "react";
import { IProduct } from "@/types/productType";
import { useAppdispatch, useSelector } from "@/Store/Store";
import { decrement, increment, productQtyInCartSelector, } from "./store/CartItemReducer";
import QtyBtn from "./QtyBtn";
import Styles from './addToCartPage.styles.module.scss'


interface Props {
    product: IProduct;
}

const AddToCartBtn = (props: Props) => {

    const qty: any = useSelector((state: any) =>
        productQtyInCartSelector(state, props.product.id)
    );

    const dispatch = useAppdispatch();
    // if (!qty)
    //     return (
    //         <div className={Styles.addToCart}>
    //             <button onClick={() => dispatch(increment(props.product))}>
    //                 Add To Cart
    //             </button>
    //         </div>

    //     );
    return (
        <div>
            {qty == null ?
                (
                    <div className={Styles.addToCart}>
                        <button onClick={() => dispatch(increment(props.product))}>
                            Add To Cart
                        </button>
                    </div>
                )
                :
                <QtyBtn
                    onDecrease={() => dispatch(decrement(props.product))}
                    onIncrease={() => dispatch(increment(props.product))}
                    qty={qty}
                />
            }
        </div>
    );
};

export default AddToCartBtn;