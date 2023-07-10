import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLandmarkContext } from "../../contexts/LandmarkContext";
import { filterLandmarks } from "../filters/landmarkfilter";
import { backendBaseURL } from "../../axios";
import { useTranslation } from "react-i18next";
import Search from "../Search/LandMarkSearch";
import { useCategoriesContext } from "../../contexts/CategoriesContext";
import css from "./LandMarksCards.module.css";

function LandMarksCards() {
  const { landmarks } = useLandmarkContext();
  const { tourismCategories } = useCategoriesContext();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedlandmark, setSelectedlandmark] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [ratingRange, setRatingRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuerycategory, setSearchQuerycategory] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      setCategories(tourismCategories);
    }
    fetchCategories();
  }, [tourismCategories]);

  const navigate = useNavigate();
  const handleLandmarkClick = (landmark) => {
    setSelectedlandmark(landmark?.landmark.id);
    navigate(`/landmark/${landmark?.landmark?.id}`, { state: landmark });
  };

  if (!landmarks) {
    return null;
  }

  const filteredLandmarks = filterLandmarks(
    landmarks,
    selectedCategory,
    searchQuery,
    activeOnly,
    ratingRange,
    searchQuerycategory
  );

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  return (
    <div className={css.landmarkbodyy}>
      <div className={css.page_title}>
        <h1>{t("LandMarksCards.LandMarks")}</h1>
      </div>
      {selectedCategory ? (
        <h2>
          {
            categories.find(
              (category) => category.category.id === selectedCategory
            )?.title
          }
        </h2>
      ) : null}
      {filteredLandmarks && filteredLandmarks.length > 0 ? (
        <div className={css.cards_container}>
          {filteredLandmarks?.map((landmark, index) => (
            <React.Fragment key={landmark.id}>
              <div className={css.flip_card}>
                <div className={css.flip_card_inner}>
                  <div className={css.flip_card_front}>
                    <img
                      className="card_img"
                      src={backendBaseURL + landmark.landmark.image}
                      alt={landmark.title}
                    />
                    <div className={css.flip_card_text}>
                      <h2>{landmark.title}</h2>
                    </div>
                  </div>
                  <div className={css.flip_card_back}>
                    <h3 className={css.landmarkTitleBack}>{landmark.title}</h3>
                    <blockquote>
                      <p className={css.landmarkdesc}>
                        {landmark.description
                          ? truncateText(landmark.description, 300)
                          : ""}
                      </p>
                    </blockquote>
                    <p>
                      {t("LandMarksCards.From")} {landmark.category_type}{" "}
                    </p>
                    <a
                      className={css.read_more}
                      onClick={() => {
                        handleLandmarkClick(landmark);
                      }}
                    >
                      {t("LandMarksCards.Read More")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={css.icon}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              {index + (1 % 4) === 0 && <br className={css.clearfix} />}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>No landmarks match the selected category.</p>
      )}

      <Search
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeOnly={activeOnly}
        setActiveOnly={setActiveOnly}
        ratingRange={ratingRange}
        setRatingRange={setRatingRange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchQuerycategory={searchQuerycategory}
        setSearchQuerycategory={setSearchQuerycategory}
      />
    </div>
  );
}

export default LandMarksCards;
