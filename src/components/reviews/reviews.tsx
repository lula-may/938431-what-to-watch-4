import * as React from "react";

import ReviewsColumn from "../reviews-column/reviews-column";
import {Review} from "../../types";

const splitReviewsIntoColumns = (reviews) => {
  const firstColumnLength = Math.ceil(reviews.length / 2);
  const firstColumnReviews = reviews.slice(0, firstColumnLength);
  const secondColumnReviews = reviews.slice(firstColumnLength);

  return [firstColumnReviews, secondColumnReviews];
};

interface Props {
  comments: Array<Review>;
  hasLoadingError: boolean;
}

const Reviews: React.FC<Props> = (props: Props) => {
  const {comments, hasLoadingError} = props;

  const sortedReviews = comments.slice().sort((left, right) => {
    return right.rating - left.rating;
  });

  const splitReviews = splitReviewsIntoColumns(sortedReviews);
  return (
    hasLoadingError
      ? <p style={{color: `black`}}>Sorry, we can&apos;t load comments now. Please, try again later.</p>
      : <div className="movie-card__reviews movie-card__row">
        <ReviewsColumn reviews={splitReviews[0]}/>
        <ReviewsColumn reviews={splitReviews[1]}/>
      </div>
  );
};

export default Reviews;
