import React from "react";
import renderer from "react-test-renderer";
import AddReviewForm from "./add-review-form.jsx";

describe(`AddReviewForm Component`, () => {
  it(`should render all form controls active`, () => {
    const tree = renderer.create(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={true}
          onSubmit={() => {}}
          onRatingChange={() => {}}
          onTextChange={() => {}}
          rating={5}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render all form controls disabled`, () => {
    const tree = renderer.create(
        <AddReviewForm
          isFormBlocked={true}
          isFormValid={true}
          onSubmit={() => {}}
          onRatingChange={() => {}}
          onTextChange={() => {}}
          rating={5}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render submitButton disabled`, () => {
    const tree = renderer.create(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={false}
          onSubmit={() => {}}
          onRatingChange={() => {}}
          onTextChange={() => {}}
          rating={5}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


