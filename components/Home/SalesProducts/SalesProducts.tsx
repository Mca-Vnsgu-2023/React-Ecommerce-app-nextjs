import React from 'react'
import Products from '../../ProductCard'
import CountDownTimer from '@/components/CountDownTimer/CountDownTimer'

const SalesProducts = () => {

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className='col-12'>
      <div className='container sub-container'>
        <div className="tag" style={{paddingTop: "15px"}}>
          <span>
            {`Today's`}
          </span>
        </div>
        <div className='row'>
          <div className='col-3'>
            <h1>Flash Sales</h1>
          </div>
          <div className='col-9' style={{paddingBottom: "10px"}}>
          {/* <CountDownTimer targetDate={dateTimeAfterThreeDays} /> */}
          </div>
        </div>
      </div>
      <Products />
    </div>
  )
}

export default SalesProducts