import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {TabType} from "../../const";
import {reviews, testMovies} from "../../test-mocks/test-films.js";

const movie = testMovies[0];

describe(`Tabs Component`, () => {
  it(`should render Overview component inside`, () => {
    const tree = renderer.create(
        <Tabs
          activeItem={TabType.OVERVIEW}
          comments={reviews}
          hasLoadingError={false}
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
          comments={reviews}
          hasLoadingError={false}
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
          comments={reviews}
          hasLoadingError={false}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
