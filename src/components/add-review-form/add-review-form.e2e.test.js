import React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReviewForm from "./add-review-form.jsx";

configure({
  adapter: new Adapter(),
});

describe(`AddReviewForm Component`, () => {
  it(`should run callback on form submit`, () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={true}
          onSubmit={onSubmit}
          onRatingChange={() => {}}
          onTextChange={() => {}}
          rating={4}
        />
    );

    const form = wrapper.find(`form`);
    form.simulate(`submit`, {preventDefault: () => {}});
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`should pass rating to callback on rating change`, () => {
    const onRatingChange = jest.fn();
    const wrapper = mount(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={false}
          onSubmit={() => {}}
          onRatingChange={onRatingChange}
          onTextChange={() => {}}
          rating={4}
        />
    );

    const secondStar = wrapper.find(`#star-2`);
    secondStar.simulate(`change`);
    expect(onRatingChange).toHaveBeenCalledTimes(1);
    expect(onRatingChange.mock.calls[0][0].target.value).toBe(`2`);
  });

  it(`should pass commentText to callback on comment text change`, () => {
    const onTextChange = jest.fn();
    const wrapper = mount(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={false}
          onSubmit={() => {}}
          onRatingChange={() => {}}
          onTextChange={onTextChange}
          rating={0}
        />
    );

    const secondStar = wrapper.find(`textarea`);
    secondStar.simulate(`change`, {target: {value: `Jack and Jill went up the hill`}});
    expect(onTextChange).toHaveBeenCalledTimes(1);
    expect(onTextChange.mock.calls[0][0].target.value).toBe(`Jack and Jill went up the hill`);
  });
});
