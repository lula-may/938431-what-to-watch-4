import React from "react";
import PropTypes from "prop-types";
import ReviewsColumn from "../reviews-column/reviews-column.jsx";
import {movieShape} from "../shapes";

const splitReviewsIntoColumns = (reviews) => {
  const totalLength = reviews.reduce((acc, item) => {
    acc += item.text.length;
    return acc;
  }, 0);
  const firstColumnReviews = reviews.slice(0, 1);
  let lengthCount = reviews[0][`text`].length;
  let count = 0;

  while (lengthCount < (totalLength / 2)) {
    count++;
    const nextReview = reviews[count];
    lengthCount += nextReview.text.length;
    if (lengthCount < totalLength) {
      firstColumnReviews.push(nextReview);
    }
  }

  const secondColumnReviews = reviews.slice(count);

  return [firstColumnReviews, secondColumnReviews];
};

const Reviews = (props) => {
  const {movie} = props;
  const {reviews} = movie;

  const sortedReviews = reviews.slice().sort((left, right) => {
    return right.rating - left.rating;
  });

  const splitRevies = splitReviewsIntoColumns(sortedReviews);
  return (
    <div className="movie-card__reviews movie-card__row">
      <ReviewsColumn reviews={splitRevies[0]}/>
      <ReviewsColumn reviews={splitRevies[1]}/>
    </div>
  );
};

Reviews.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
};

export default Reviews;
