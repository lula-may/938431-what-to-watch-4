import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button";

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
