import React from "react";
import renderer from "react-test-renderer";
import ErrorScreen from "./error-screen.jsx";

describe(`ErrorComponent`, () => {
  it(`should render correctly ErrorScreen component`, () => {
    const tree = renderer.create(
        <ErrorScreen/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
