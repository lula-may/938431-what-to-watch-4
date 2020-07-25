import React, {createRef} from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {testMovies} from "../../test-mocks/test-films.js";

const movie = testMovies[0];

describe(`AddReview Component`, () => {
  it(`should render correctly AddReview Component`, () => {
    const formRef = createRef();
    const tree = renderer.create(
        <AddReview
          formRef={formRef}
          isFormBlocked={false}
          movie={movie}
          onSubmit={() => {}}
        />, {createNodeMock: () => {}}

    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
