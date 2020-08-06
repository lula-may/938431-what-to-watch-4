import * as React from "react";
import * as renderer from "react-test-renderer";
import Overview from "./overview.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[0];

it(`should render correctly Overview Component`, () => {
  const tree = renderer.create(
      <Overview
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
