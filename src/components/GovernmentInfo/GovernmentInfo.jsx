import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLandmarkContext } from "../../contexts/LandmarkContext";
import { backendBaseURL } from "../../axios";
import css from "./GovernmentInfo.module.css";

import { useGovernorateContext } from "../../contexts/GovernorateContext";

function GovernmentInfo() {
  const { id } = useParams();

  const location = useLocation();
  const Specificgovernment = location.state;

  const { governorates } = useGovernorateContext();
  const { landmarks } = useLandmarkContext();
  const [selectedgov, setSelectedgov] = useState(null);
  {
    console.log("governorates", governorates);
  }
  const navigate = useNavigate();

  const { t } = useTranslation();
  // const [governmentInfo, setGovernmentInfo] = useState(null);
  const [selectedlandmark, setSelectedlandmark] = useState(null);

  useEffect(() => {
    const filteredGovernorate = governorates?.find(
      (governorate) => governorate?.governorate?.id === Number(id)
    );
    if (filteredGovernorate) {
      setSelectedgov(filteredGovernorate);
    } else {
      setSelectedgov(null);
    }
  }, [governorates, Specificgovernment, id]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  const handleLandMarkClick = (landmark) => {
    setSelectedlandmark(landmark.id);
    navigate(`/landmark/${landmark?.landmark?.id}`, { state: landmark });
  };

  return (
    <div className={css.govInfoInfo_Body}>
      {selectedgov ? (
        <>
          <h1 className={css.page_title}>{selectedgov.title}</h1>
          <div className={css.container}>
            <div className={css.image_container}>
              <figure class={css.swing}>
                <div className={css.image}>
                  <img
                    src={backendBaseURL + selectedgov?.governorate?.emblem}
                    alt={selectedgov.title}
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className={css.texts}>
            <h2 className={css.about_header}>{t("GovernmentInfo.About")}</h2>
            <p>
              {selectedgov.description} ,{" "}
              <span>
                {t("GovernmentInfo.area")} {selectedgov.governorate.area}{" "}
                {t("GovernmentInfo.KM")}{" "}
              </span>
              , {selectedgov.governor} {t("GovernmentInfo.governor")}{" "}
              {selectedgov.title}
            </p>
          </div>

          {landmarks?.filter(
            (landmark) =>
              landmark.landmark.governorate.id === selectedgov.governorate.id
          )?.length > 0 && (
            <h1 className={css.box_title}>
              {t("GovernmentInfo.LandMarks Found in")} {selectedgov.title}{" "}
            </h1>
          )}

          <div className={css.row3_container}>
            {landmarks
              ?.filter(
                (landmark) =>
                  landmark.landmark.governorate.id ===
                  selectedgov.governorate.id
              )
              .map((landmark) => (
                <div
                  key={landmark.id}
                  className={`${css.box5} ${css.grayishBlue} ${
                    selectedlandmark?.id === landmark.landmark.id
                      ? css.selected
                      : ""
                  }`}
                >
                  <h2>{landmark.title}</h2>
                  {/*<div className={css.imgLandMarkContainer}>
              <img className={css.landmarkImg} src={backendBaseURL + landmark.landmark.image} alt={landmark.title} />
            </div>*/}

                  {/*<p>tourismCategoryObject: {landmark.landmark.tourismCategoryObject}</p>*/}
                  <p>
                    {landmark?.description
                      ? truncateText(landmark.description, 300)
                      : ""}
                  </p>
                  <a
                    class={css.read_more}
                    onClick={() => handleLandMarkClick(landmark)}
                  >
                    {" "}
                    {t("GovernmentCards.Read More")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class={css.icon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  {/* <h3>Tourism Categories</h3>
              <p>
                {landmark.landmark.tourism_categories?.map((category) => (
                  <span key={category.id}>
                    {category.name}
                    <br />
                  </span>
                ))}
                </p>*/}
                </div>
              ))}
          </div>
        </>
      ) : (
        <p>No gov match the selected gov.</p>
      )}
    </div>
  );
}

export default GovernmentInfo;
