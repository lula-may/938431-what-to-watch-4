import React from "react";
import renderer from "react-test-renderer";
import ReviewsColumn from "./reviews-column.jsx";
import {testMovies} from "../../test-mocks/test-films";

const reviews = testMovies[0][`reviews`];

it(`should render correctly ReviewsColumnComponent`, () => {
  const tree = renderer.create(
      <ReviewsColumn
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
