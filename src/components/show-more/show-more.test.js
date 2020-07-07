import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

describe(`ShowMore Component`, () => {
  it(`should render correctly ShowMore Component`, () => {
    const tree = renderer.create(
        <ShowMore
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
