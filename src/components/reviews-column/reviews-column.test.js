import React from "react";
import renderer from "react-test-renderer";
import ReviewsColumn from "./reviews-column.jsx";
import {reviews} from "../../test-mocks/test-films";

it(`should render correctly ReviewsColumnComponent`, () => {
  const tree = renderer.create(
      <ReviewsColumn
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
