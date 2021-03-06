import * as React from "react";
import {configure, mount, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import AddReviewForm from "./add-review-form";
import {noop} from "../../utils";

configure({
  adapter: new Adapter(),
});

const children: React.ReactNode = <div className="children-component"/>;

describe(`AddReviewForm Component`, () => {
  it(`should run callback on form submit`, () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={true}
          onSubmit={onSubmit}
          onRatingChange={noop}
          onTextChange={noop}
          rating={4}
        >
          {children}
        </AddReviewForm>
    );

    const form = wrapper.find(`form`);
    form.simulate(`submit`, {preventDefault: noop});
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`should pass rating to callback on rating change`, () => {
    const onRatingChange = jest.fn();
    const wrapper = mount(
        <AddReviewForm
          isFormBlocked={false}
          isFormValid={false}
          onSubmit={noop}
          onRatingChange={onRatingChange}
          onTextChange={noop}
          rating={4}
        >
          {children}
        </AddReviewForm>
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
          onSubmit={noop}
          onRatingChange={noop}
          onTextChange={onTextChange}
          rating={0}
        >
          {children}
        </AddReviewForm>
    );

    const secondStar = wrapper.find(`textarea`);
    secondStar.simulate(`change`, {target: {value: `Jack and Jill went up the hill`}});
    expect(onTextChange).toHaveBeenCalledTimes(1);
    expect(onTextChange.mock.calls[0][0].target.value).toBe(`Jack and Jill went up the hill`);
  });
});
