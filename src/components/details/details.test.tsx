import * as React from "react";
import * as renderer from "react-test-renderer";
import Details from "./details";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[0];

it(`should render correctly tab Details component`, () => {
  const tree = renderer.create(
      <Details movie={movie}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
