/*import { React, useEffect, useState } from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import css from '../LandMarkGallery/LandMarkGallery.module.css';

SwiperCore.use([Pagination, Navigation]);

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(1);
  const { t } = useTranslation();
  const location = useLocation();
  const specificlandmark = location.state;
  const mediaUrl = 'https://tourisco.onrender.com';

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };
  
  return (
    <div className={css.container}>
      <div className={css.board}>
        <h2 className={css.text_light}>{t('Gallery.Gallery')}</h2>
        {specificlandmark.landmark.images.length > 0 ? (
          <Swiper
            className={css.swiper}
            spaceBetween={30}
            slidesPerView={3}
            centeredSlides={true}
            grabCursor={true}
            pagination={{ clickable: true, cssMode: true }}
            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            onSlideChange={handleSlideChange}
          >
            
            {specificlandmark.landmark.images.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{
                  transform: index === activeIndex ? 'scale(1.3)' : 'scale(0.4)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <div className={css.flex}>
                  <div className={css.profile}>
                    <img src={`${mediaUrl}${image.image}`} alt="" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className={`swiper-pagination ${css.swiper_pagination}`} />
            <div className={`swiper-button-prev ${css.swiper_button_prev}`} />
            <div className={`swiper-button-next ${css.swiper_button_next}`} />
          </Swiper>
        ) : (
          <p>No images found.</p>
        )}
      </div>
      <UploadPhoto/>
    </div>
  );
}


export default Gallery;*/

