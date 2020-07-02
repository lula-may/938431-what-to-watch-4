import React from "react";
import PropTypes from "prop-types";
import {reviewShape} from "../shapes";

const ReviewsColumn = (props) => {
  const {reviews} = props;
  return (
    <div className="movie-card__reviews-col">
      {reviews.map((review) => {
        const {author, date, id, rating, text} = review;
        const reviewDate = date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
        return (
          <div className="review" key={id}>
            <blockquote className="review__quote">
              <p className="review__text">{text}</p>

              <footer className="review__details">
                <cite className="review__author">{author}</cite>
                <time className="review__date" dateTime="2016-12-24">{reviewDate}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{rating}</div>
          </div>

        );
      })}
    </div>
  );
};

ReviewsColumn.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewShape)).isRequired,
};

export default ReviewsColumn;
