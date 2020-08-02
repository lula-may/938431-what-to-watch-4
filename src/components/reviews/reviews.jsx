import React from "react";
import PropTypes from "prop-types";
import ReviewsColumn from "../reviews-column/reviews-column.jsx";
import {reviewShape} from "../shapes";

const splitReviewsIntoColumns = (reviews) => {
  const firstColumnLength = Math.ceil(reviews.length / 2);
  const firstColumnReviews = reviews.slice(0, firstColumnLength);
  const secondColumnReviews = reviews.slice(firstColumnLength);

  return [firstColumnReviews, secondColumnReviews];
};

const Reviews = (props) => {
  const {comments, hasLoadingError} = props;

  const sortedReviews = comments.slice().sort((left, right) => {
    return right.rating - left.rating;
  });

  const splitReviews = splitReviewsIntoColumns(sortedReviews);
  return (
    hasLoadingError
      ? <p>Sorry, we can&apos;t load comments now. Please, try again later.</p>
      : <div className="movie-card__reviews movie-card__row">
        <ReviewsColumn reviews={splitReviews[0]}/>
        <ReviewsColumn reviews={splitReviews[1]}/>
      </div>
  );
};

Reviews.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(reviewShape)).isRequired,
  hasLoadingError: PropTypes.bool.isRequired,
};

export default Reviews;
