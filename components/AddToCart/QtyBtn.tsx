import React from 'react'
import Styles from './addToCartPage.styles.module.scss'

interface Props {
    onIncrease: () => void;
    onDecrease: () => void;
    qty: number;
  }

const QtyBtn = (props:Props) => {

  return (
    <div className={`${Styles.qtyDiv} gap-3 justify-center items-center`}>
        <button className='btn btn-danger' onClick={props.onDecrease}>
           {props.qty === 1 ? (<i className='fa fa-trash'></i>): (<i className='fa-solid fa-minus'></i>)} 
        </button>
        <h6 style={{paddingTop: "8px"}}>{props.qty}</h6>
        <button className='btn btn-success' onClick={props.onIncrease}>
           <i className='fa-solid fa-plus'></i>
        </button>
    </div>
  )
}

export default QtyBtn