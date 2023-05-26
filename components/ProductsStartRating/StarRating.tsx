import React from 'react'
import StarRatings from 'react-star-ratings'
import Styles from './starRating.styles.module.scss'

interface IProp {
    rating: number;
    shownumber?: boolean | undefined;
}

const StarRating = (props:IProp) => {

    const { rating, shownumber } = props

  return (
    <div className={Styles.ratingTextDiv}>
            <StarRatings
                rating={rating * 50 / 100}
                numberOfStars={5}
                starDimension="18px"
                starSpacing='1px'
                starRatedColor='#FFAD33'
                starEmptyColor='gray'
                
            />
           <div>
                 {shownumber && <p className={Styles.ratingText}>{rating}/10</p>}
           </div>
        </div>
  )
}

export default StarRating