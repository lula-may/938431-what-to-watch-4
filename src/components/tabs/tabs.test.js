import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[0];

describe(`Tabs Component`, () => {
  it(`should render correctly Tabs Component, "Overview" tab with active class`, () => {
    const activeTab = `Overview`;
    const tree = renderer.create(
        <Tabs
          activeTab={activeTab}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly Tabs Component, "Details" tab with active class`, () => {
    const activeTab = `Details`;
    const tree = renderer.create(
        <Tabs
          activeTab={activeTab}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render correctly Tabs Component, "Reviews" tab with active class`, () => {
    const activeTab = `Reviews`;
    const tree = renderer.create(
        <Tabs
          activeTab={activeTab}
          movie={movie}
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
