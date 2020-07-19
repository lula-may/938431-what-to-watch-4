import React from "react";
import renderer from "react-test-renderer";
import Error from "./error.jsx";

describe(`ErrorComponent`, () => {
  it(`should render correctly Error component`, () => {
    const tree = renderer.create(
        <Error/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
