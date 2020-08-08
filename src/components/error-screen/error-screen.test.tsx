import * as React from "react";
import * as renderer from "react-test-renderer";
import ErrorScreen from "./error-screen";

describe(`ErrorComponent`, () => {
  it(`should render correctly ErrorScreen component`, () => {
    const tree = renderer.create(
        <ErrorScreen/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
