import * as React from "react";
import * as renderer from "react-test-renderer";
import LoadingScreen from "./loading-screen";

describe(`LoadingScreen Component`, () => {
  it(`should render correctly LoadingScreen component`, () => {
    const tree = renderer.create(
        <LoadingScreen/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
