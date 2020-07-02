import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[0];

it(`should render correctly Tabs Component, Second tab with active class`, () => {
  const tree = renderer.create(
      <Tabs
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});