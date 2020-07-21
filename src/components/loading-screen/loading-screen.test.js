import React from "react";
import renderer from "react-test-renderer";
import LoadingScreen from "./loading-screen.jsx";

describe(`LoadingScreen Component`, () => {
  it(`should render correctly LoadingScreen component`, () => {
    const tree = renderer.create(
        <LoadingScreen/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
