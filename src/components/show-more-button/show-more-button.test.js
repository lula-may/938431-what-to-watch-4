import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";

describe(`ShowMore Component`, () => {
  it(`should render correctly ShowMore Component`, () => {
    const tree = renderer.create(
        <ShowMoreButton
          onClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
