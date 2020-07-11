import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {TabType} from "../../const";
import {testMovies} from "../../test-mocks/test-films.js";

const movie = testMovies[0];

describe(`Tabs Component`, () => {
  it(`should render Overview component inside`, () => {
    const tree = renderer.create(
        <Tabs
          activeItem={TabType.OVERVIEW}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Details component inside`, () => {
    const tree = renderer.create(
        <Tabs
          activeItem={TabType.DETAILS}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Reviews Component inside`, () => {
    const tree = renderer.create(
        <Tabs
          activeItem={TabType.REVIEWS}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
