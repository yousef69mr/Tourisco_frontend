import React from 'react';
import starcss from './starRating.module.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
function StarRating(props) {
    const { rating } = props;

  if (typeof rating !== 'number') {
    // If there is no rating, render empty stars
    return (
      <div className={starcss.star_rating}>
        <FaStar className={`${starcss.star_icon} ${starcss.empty}`} />
        <FaStar className={`${starcss.star_icon} ${starcss.empty}`}/>
        <FaStar className={`${starcss.star_icon} ${starcss.empty}`}/>
        <FaStar className={`${starcss.star_icon} ${starcss.empty}`} />
        <FaStar className={`${starcss.star_icon} ${starcss.empty}`} />
      </div>
    );
  }

  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className= {`${starcss.star_icon} ${starcss.checked}`} />);
  }

  for (let i = 0; i < halfStars; i++) {
    stars.push(<FaStarHalfAlt key={`half-${i}`} className= {`${starcss.star_icon} ${starcss.checked}`} />);
  }

  for (let i = 0; i < 5 - rating; i++) {
    stars.push(<FaStar key={`empty-${i}`} className= {`${starcss.star_icon} ${starcss.empty}`} />);
  }

  return (
    <div className={starcss.star_rating}>
      {stars}
    </div>
  );
}
export default  StarRating;