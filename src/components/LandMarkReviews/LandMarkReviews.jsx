/*import { useLocation } from 'react-router-dom';
import css from '../LandMarkReviews/LandMarkReviews.module.css';
import React from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import StarRating from '../starRating/starRating';
import { useTranslation } from 'react-i18next';
import AddReview from '../AddReview/AddReview';
import starcss from '../starRating/starRating.module.css';
import { useState } from 'react';

SwiperCore.use([Pagination, Navigation]);

function LandmarkReviews() {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const specificlandmarkReview = location.state;
  const mediaUrl = 'https://tourisco.onrender.com';
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };
  
  
  return (
    <div className={css.container}>
      <div className={css.board}>
        <h2 className={css.text_light}>{t("LandmarkReviews.Reviews")}</h2>
       
        <Swiper
          className={css.swiper}
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          grabCursor={true}
          pagination={{ clickable: true ,cssMode: true }}
          navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
          onSlideChange={handleSlideChange}
        >
          {specificlandmarkReview.landmark.reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              style={{
                
                transform: index === activeIndex ? 'scale(1.1)' : 'scale(0.5)',
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <div className={css.flex}>
               
                <div className={css.profile}>
                  <img src={mediaUrl+review.user.profile_image} alt="" />
                  <div className={css.reviews}>
                  <div className={css.user}>{review.user.username}</div>
                  <p className={css.comment}>{review.comment}</p>
                  <div className={starcss.rate}>
                    <p>{t("LandmarkReviews.Rate")}: {review.rating} </p>
                  <StarRating rating={review.rating} />
                  </div> 
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className={`swiper-pagination ${css.swiper_pagination}`} />
          <div className={`swiper-button-prev ${css.swiper_button_prev}`} />
          <div className={`swiper-button-next ${css.swiper_button_next}`} />
         
        </Swiper>
      </div>
      <AddReview/>
    </div>
  );
}
export default LandmarkReviews;*/