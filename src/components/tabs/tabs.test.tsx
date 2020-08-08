import * as React from "react";
import * as renderer from "react-test-renderer";

import {noop} from "../../utils";
import Tabs from "./tabs";
import {TabType} from "../../types";
import {reviews, testMovies} from "../../test-mocks/test-films";

const movie = testMovies[0];

describe(`Tabs Component`, () => {
  it(`should render Overview component inside`, () => {
    const tree = renderer.create(
        <Tabs
          activeItem={TabType.OVERVIEW}
          comments={reviews}
          hasLoadingError={false}
          movie={movie}
          onClick={noop}
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
          onClick={noop}
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
          onClick={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
