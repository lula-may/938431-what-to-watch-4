import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button.jsx";

configure({
  adapter: new Adapter(),
});

describe(`ShowMoreButton`, () => {
  it(`should run callback on button click`, () => {
    const onClick = jest.fn();
    const showMoreComponent = shallow(
        <ShowMoreButton
          onClick={onClick}
        />
    );

    const button = showMoreComponent.find(`.catalog__button`);
    button.simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
