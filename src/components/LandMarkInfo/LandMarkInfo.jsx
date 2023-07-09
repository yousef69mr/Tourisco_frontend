import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LandmarkReviews from "../LandMarkReviews/LandMarkReviews";
import LandmarkContextProvider from "../../contexts/LandmarkContext";
import TicketContextProvider from "../../contexts/TicketContext";
import LandmarkEventContextProvider from "../../contexts/LandmarkEventContext";
import { backendBaseURL } from "../../axios";
import { useLandmarkContext } from "../../contexts/LandmarkContext";
import Gallery from "../LandMarkGallery/LandMarkGallery";
import { useEffect, useState } from "react";
import api_root from "../../axios";
import LandmarkEvent from "../LandMarkEvent/LandMarkEvent";
import css from "../LandMarkInfo/LanMarkInfo.module.css";

function LandmarkInfo() {
  const location = useLocation();
  const specificlandmark = location.state;
  const { id } = useParams();
  const { t } = useTranslation();

  const { landmarks } = useLandmarkContext();

  const [selectedLandmark, setSelectedLandmark] = useState(null);

  useEffect(() => {
    const filteredLandmark = landmarks?.find(
      (landmark) => landmark?.landmark?.id === Number(id)
    );
    const UpdateViews = async () => {
      try {
        const UpdateViewsPromis = await api_root.api.post(
          `increace_landmark_views/${filteredLandmark?.landmark?.id}/`
        );
        if (UpdateViewsPromis.state !== 202) {
          throw new Error(UpdateViewsPromis.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (filteredLandmark) {
      UpdateViews();
      setSelectedLandmark(filteredLandmark);
    } else {
      setSelectedLandmark(null);
    }
  }, [landmarks, specificlandmark, id]);

  {
    console.log("selectedlandmark", selectedLandmark);
  }

  return (
    <div className={css.LandMarkInfo_Body}>
      {selectedLandmark ? (
        <>
          <h1 className={css.page_title}>{selectedLandmark.title}</h1>
          <div className={css.container}>
            <div className={css.image_container}>
              <figure className={css.swing}>
                <div className={css.image}>
                  <img
                    src={backendBaseURL + selectedLandmark.landmark.image}
                    alt={selectedLandmark.title}
                  />
                </div>
              </figure>
            </div>
          </div>
          <div className={css.texts}>
            <h2 className={css.about_header}>{t("LandmarkInfo.About")}</h2>
            <p className={css.landmarkDesc}>
              {selectedLandmark.description}
              <span>
                {" "}
                {t("LandmarkInfo.area")} {selectedLandmark.landmark.area}{" "}
                {t("LandmarkInfo.KM")}{" "}
              </span>
              <span>
                {t("LandmarkInfo.founder ")} {selectedLandmark.founder}{" "}
              </span>
              <span>
                {t("LandmarkInfo.Locates")} {selectedLandmark.address}
              </span>
            </p>
          </div>
          <LandmarkContextProvider>
            <LandmarkEventContextProvider>
              <TicketContextProvider>
                <LandmarkEvent id={selectedLandmark.landmark.id} />
              </TicketContextProvider>
            </LandmarkEventContextProvider>
          </LandmarkContextProvider>

          {/* <LandmarkReviews/>*/}

          {/*<Gallery id={selectedLandmark.landmark.id} />*/}
        </>
      ) : (
        <p>No landmarks match the selected landmark.</p>
      )}
    </div>
  );
}

export default LandmarkInfo;
