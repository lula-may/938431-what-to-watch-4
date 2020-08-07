import * as React from "react";
import * as renderer from "react-test-renderer";

import ReviewsColumn from "./reviews-column";
import {Review} from "../../types";
import {reviews} from "../../test-mocks/test-films";

const comments: Array<Review | null> = reviews;

it(`should render correctly ReviewsColumnComponent`, () => {
  const tree = renderer.create(
      <ReviewsColumn
        reviews={comments}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
