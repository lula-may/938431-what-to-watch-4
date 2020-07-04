import React from "react";
import PropTypes from "prop-types";
import ReviewsColumn from "../reviews-column/reviews-column.jsx";
import {movieShape} from "../shapes";

const splitReviewsIntoColumns = (reviews) => {
  const firstColumnLength = Math.ceil(reviews.length / 2);
  const firstColumnReviews = reviews.slice(0, firstColumnLength);
  const secondColumnReviews = reviews.slice(firstColumnLength);

  return [firstColumnReviews, secondColumnReviews];
};

const Reviews = (props) => {
  const {movie: {reviews}} = props;

  const sortedReviews = reviews.slice().sort((left, right) => {
    return right.rating - left.rating;
  });

  const splitReviews = splitReviewsIntoColumns(sortedReviews);
  return (
    <div className="movie-card__reviews movie-card__row">
      <ReviewsColumn reviews={splitReviews[0]}/>
      <ReviewsColumn reviews={splitReviews[1]}/>
    </div>
  );
};

Reviews.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
};

export default Reviews;
