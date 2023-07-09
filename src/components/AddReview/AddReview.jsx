import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './AddReview.module.css';

function AddReview() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className={css.container}>
      <h2 className={css.header}>{t('CommentForm.WriteComment')}</h2>
      <div className={css.ratingContainer}>
        <label className={css.label}>{t('CommentForm.RateThisPlace')}:</label>
        <input
          type="number"
          min="0"
          max="5"
          step="1"
          value={rating}
          onChange={(event) => setRating(parseFloat(event.target.value))}
          className={css.ratingInput}
          required
        />
      </div>
      <div className={css.commentContainer}>
        <label className={css.label} htmlFor="comment">
          {t('CommentForm.WriteYourComment')}
        </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className={css.textarea}
          required
        />
      </div>
      <button type="submit" className={css.button}>
        {t('CommentForm.Submit')}
      </button>
    </form>
  );
}

export default AddReview;