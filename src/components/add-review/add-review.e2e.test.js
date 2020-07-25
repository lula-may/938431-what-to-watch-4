import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review.jsx";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});

describe(`AddReview Component`, () => {
  it(`should run callback on form submit`, () => {
    const onSubmit = jest.fn();
    const wrapper = mount(
        <AddReview
          movie={testMovies[0]}
          isFormBlocked={false}
          onSubmit={onSubmit}
        />
    );

    const form = wrapper.find(`form`);
    form.simulate(`submit`, {preventDefault: () => {}});
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
