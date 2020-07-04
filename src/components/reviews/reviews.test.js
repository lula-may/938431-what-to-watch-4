import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[0];

it(`should render correctly Reviews Component`, () => {
  const tree = renderer.create(
      <Reviews
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
