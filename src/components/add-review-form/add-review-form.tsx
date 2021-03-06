import * as React from "react";

const NO_RATING = 0;
const REVIEW_LENGTH_MIN = 50;
const REVIEW_LENGTH_MAX = 400;
const starsIds = [1, 2, 3, 4, 5];

interface Props {
  children?: React.ReactNode;
  isFormBlocked: boolean;
  isFormValid: boolean;
  onRatingChange: () => void;
  onSubmit: () => void;
  onTextChange: () => void;
  rating: number;
}

const AddReviewForm: React.FC<Props> = (props: Props) => {
  const {
    children,
    isFormBlocked,
    isFormValid,
    onSubmit,
    onRatingChange,
    onTextChange,
    rating,
  } = props;

  const isButtonDisabled = !isFormValid || isFormBlocked;
  const buttonStyle = isButtonDisabled ? {opacity: 0.5} : {};

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-0" type="radio" name="rating" value={0} disabled={isFormBlocked} onChange={onRatingChange} checked={rating === NO_RATING}/>
            {starsIds.map((id) => {
              const isChecked = (rating === id);
              return (<React.Fragment key={id}>
                <input className="rating__input" id={`star-${id}`} type="radio" name="rating" value={id} disabled={isFormBlocked} checked={isChecked} onChange={onRatingChange}/>
                <label className="rating__label" htmlFor={`star-${id}`}>Rating {id}</label>
              </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            minLength={REVIEW_LENGTH_MIN}
            maxLength={REVIEW_LENGTH_MAX}
            required
            disabled={isFormBlocked}
            onChange={onTextChange}
          ></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isButtonDisabled} style={buttonStyle}>Post</button>
          </div>

        </div>
      </form>
      {children}
    </div>
  );
};

export default AddReviewForm;
