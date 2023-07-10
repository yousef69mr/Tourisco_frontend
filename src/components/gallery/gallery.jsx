import { React, useEffect, useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../LandMarkGallery/LandMarkGallery.module.css";

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(1);
  const { t } = useTranslation();
  const location = useLocation();
  const specificlandmark = location.state;
  const mediaUrl = "https://tourisco.onrender.com";

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <h2 className={styles.text_light}>{t("Gallery.Gallery")}</h2>
        {specificlandmark.landmark.images.length > 0 ? (
          <Swiper
            breakpoints={{
              856: { slidesPerView: 3 },
              640: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            modules={[Pagination, Navigation]}
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }}
          >
            {/* Loop through the images and create a slide for each image */}
            {specificlandmark.landmark.images.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{
                  transform:
                    index === activeIndex ? "scale(0.7)" : "scale(0.7)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <div className={styles.swiper_slide_flex}>
                  <div className={styles.swiper_profile}>
                    <img
                      src={`${mediaUrl}${image.image}`}
                      style={{
                        width: "130%",
                        height: "25rem",
                        borderRadius: "50%",
                        padding: "10px",
                        border: "5px solid var(--PrimaryColor)",
                        margin: "10px 0",
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div
              className="swiper-pagination"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                listStyle: "none",
                padding: "0",
              }}
            />
          </Swiper>
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
}

export default Gallery;
