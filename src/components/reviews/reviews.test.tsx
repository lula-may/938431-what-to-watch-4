import * as React from "react";
import * as renderer from "react-test-renderer";
import Reviews from "./reviews";
import {reviews} from "../../test-mocks/test-films";

describe(`Reviews Component`, () => {
  it(`should render correctly Reviews Component`, () => {
    const tree = renderer.create(
        <Reviews
          comments={reviews}
          hasLoadingError={false}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render error message on comments loading error`, () => {
    const tree = renderer.create(
        <Reviews
          comments={[]}
          hasLoadingError={true}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
