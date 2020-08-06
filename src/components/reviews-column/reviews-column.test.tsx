import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewsColumn from "./reviews-column";
import {reviews} from "../../test-mocks/test-films";

it(`should render correctly ReviewsColumnComponent`, () => {
  const tree = renderer.create(
      <ReviewsColumn
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
