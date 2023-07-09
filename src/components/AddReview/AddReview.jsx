import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import css from "./AddReview.module.css";
import axios from "axios";
import { object, string, number, array, mixed } from "yup";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import api_root from "../../axios";
import { useFormik } from "formik";

function AddReview(props) {
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  // const {landmark_id} = props
  const { t } = useTranslation();

  const onUpload = useCallback((files) => {
    formik.setFieldValue("image_list", [...formik.values.image_list, files]);
  }, []);

  const formik = useFormik({
    initialValues: {
      rating: "",
      comment: "",
      image_list: [],
    },
    validationSchema: object().shape({
      rating: number().required(t("form.requiredField")),
      comment: string().required(t("form.required")),
      image_list: array().of(
        mixed()
          .required(t("form.requiredField"))
          .test("fileType", t("form.invalidFileType"), function (value) {
            if (!value) return true; // allow empty value
            return [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
              "image/bmp",
              "image/webp",
              "image/svg+xml",
            ].includes(value.type);
          })
      ),
    }),
    onSubmit: async (values) => {
      let cancelToken;
      try {
        const formData = new FormData();
        formData.append("comment", values.comment);
        formData.append("rating", values.rating);

        const reviewPromise = await api_root.apiToken.post(
          `landmark_reviews/8/`,
          formData,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        if (reviewPromise.status !== 201) {
          throw new Error(reviewPromise.statusText);
        }
        const reviewData = reviewPromise.data;

        alert("created", { instance: "comment" });

        if (values.image_list?.length > 0) {
          formData.append("image_list", values.image_list);
          const reviewImagesPromise = await api_root.apiToken.post(
            `review_images/${reviewData?.id}/`,
            formData,
            { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
          );
          if (reviewImagesPromise.status !== 201) {
            throw new Error(reviewImagesPromise.statusText);
          }
          alert("created", { instance: "comment images" });
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          alert(error);
        }
      }
      return () => {
        if (cancelToken) {
          cancelToken();
        }
      };
    },
  });
  // const handleSubmit = async (event) => {
  //   // event.preventDefault();
  //   alert(JSON.stringify(event));

  //   const cancelToken = axios.CancelToken.source();
  //   try {
  //     const formData = new FormData();
  //     const reviewPromise = await api_root.apiToken.post(
  //       `landmark_reviews/`,
  //       formData,
  //       { cancelToken: cancelToken.token }
  //     );
  //     if (reviewPromise.status !== 201) {
  //       throw new Error(reviewPromise.statusText);
  //     }

  //     alert("created");
  //   } catch (error) {
  //     if (axios.isCancel(error)) {
  //       console.error("cancelled");
  //     } else {
  //       alert(error);
  //     }
  //   }
  //   return () => {
  //     cancelToken.cancel("cancelled");
  //   };
  //   // handle form submission here
  // };

  return (
    <form onSubmit={formik.handleSubmit} className={css.container}>
      <h2 className={css.header}>{t("CommentForm.WriteComment")}</h2>
      <div className={css.ratingContainer}>
        <label className={css.label}>{t("CommentForm.RateThisPlace")}:</label>
        <input
          type="number"
          min="0"
          max="5"
          step="1"
          // value={rating}
          name="rating"
          value={formik.values.rating}
          // onChange={(event) => setRating(parseFloat(event.target.value))}
          onChange={formik.handleChange}
          className={css.ratingInput}
          required
        />
      </div>
      <div className={css.commentContainer}>
        <label className={css.label} htmlFor="comment">
          {t("CommentForm.WriteYourComment")}
        </label>
        <textarea
          id="comment"
          name="comment"
          // value={comment}
          value={formik.values.comment}
          // onChange={(event) => setComment(event.target.value)}
          onChange={formik.handleChange}
          className={css.textarea}
          required
        />
      </div>
      <UploadPhoto
        name="image_list"
        // onChange={}
        onUpload={onUpload}
        value={formik.values.image_list}
      />
      <button type="submit" className={css.button}>
        {t("CommentForm.Submit")}
      </button>
    </form>
  );
}

export default AddReview;
