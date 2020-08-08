import * as React from "react";
import * as renderer from "react-test-renderer";

import AddReviewForm from "./add-review-form";
import {noop} from "../../utils";

const children: React.ReactNode = <div className="children-component"/>;

describe(`AddReviewForm Component`, () => {
  it(`should render all form controls active`, () => {
    const tree = renderer.create(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={true}
          onSubmit={noop}
          onRatingChange={noop}
          onTextChange={noop}
          rating={5}
        >
          {children}
        </AddReviewForm>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render all form controls disabled`, () => {
    const tree = renderer.create(
        <AddReviewForm
          isFormBlocked={true}
          isFormValid={true}
          onSubmit={noop}
          onRatingChange={noop}
          onTextChange={noop}
          rating={5}
        >
          {children}
        </AddReviewForm>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render submitButton disabled`, () => {
    const tree = renderer.create(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={false}
          onSubmit={noop}
          onRatingChange={noop}
          onTextChange={noop}
          rating={5}
        >
          {children}
        </AddReviewForm>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


