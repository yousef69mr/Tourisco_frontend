import React, { useState } from "react";

import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import StarRating from "../starRating/starRating";
import { useTranslation } from "react-i18next";
import css from "../LandMarkReviews/LandMarkReviews.module.css";
import starcss from "../starRating/starRating.module.css";

function LandmarkReviews(props) {
  const { t } = useTranslation();
  const { landmark } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  // const location = useLocation();
  // const specificlandmarkReview = location.state;
  const mediaUrl = "https://tourisco.onrender.com";
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={css.container}>
      {landmark ? (
        <div className={css.board}>
          <h2 className={css.text_light}>{t("LandmarkReviews.Reviews")}</h2>

          <Swiper
            breakpoints={{
              856: { slidesPerView: 3 },
              640: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            modules={[Pagination, Navigation]}
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }}
            //style={styles.swiper}
          >
            <div className={css.swiper_slide_flex}>
              {landmark?.landmark?.reviews?.map((review, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    transform:
                      index === activeIndex ? "scale(0.7)" : "scale(0.7)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <div className={css.flex}>
                    <div className={css.profile}>
                      <img
                        src={mediaUrl + review?.user?.profile_image}
                        style={{
                          width: "110%",
                          borderRadius: "50%",
                          padding: "10px",
                          border: "5px solid var(--PrimaryColor)",
                          margin: "10px 0",
                        }}
                        alt={review?.id}
                      />
                      <div className={css.reviews}>
                        <div className={css.user}>{review?.user?.username}</div>
                        <p className={css.comment}>{review?.comment}</p>
                        <div className={starcss.rate}>
                          <p>
                            {t("LandmarkReviews.Rate")}: {review?.rating}{" "}
                          </p>
                          <StarRating rating={review?.rating} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
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
        </div>
      ) : (
        t("nodata")
      )}
    </div>
  );
}
export default LandmarkReviews;
