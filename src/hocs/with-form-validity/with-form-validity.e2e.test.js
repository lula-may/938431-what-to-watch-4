import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import {withFormValidity} from "./with-form-validity.jsx";

configure({
  adapter: new Adapter()
});

const ratingIds = [0, 1, 2, 3, 4, 5];

const MockComponent = (props) => {
  const {isFormBlocked, isFormValid, onRatingChange, onTextChange, onSubmit, rating} = props;
  const isDisabled = isFormBlocked || !isFormValid;
  return <form onSubmit={onSubmit}>
    {ratingIds.map((id) => (
      <input type="radio" key={id} id={id} name="rating" value={id} checked={rating === id}
        disabled={isFormBlocked} onChange={onRatingChange}/>
    ))}
    <textarea name="review-text" onChange={onTextChange} disabled={isFormBlocked}></textarea>
    <button type="submit" disabled={isDisabled}/>
  </form>;
};

MockComponent.propTypes = {
  isFormBlocked: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  rating: PropTypes.number,
};

const WithFormValidity = withFormValidity(MockComponent);

describe(`WithFormValidity HOC`, () => {
  it(`should unblock the submit button when rating is checked and enough length comment entered and pass entered values to callback on submit`, () => {
    const onSubmit = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <WithFormValidity
          hasError={false}
          isCommentLoading={false}
          onSubmit={onSubmit}
        />
    );

    expect(wrapper.find(`button`).prop(`disabled`)).toBe(true);
    expect(wrapper.find(`input`).at(0).prop(`checked`)).toBe(true);

    wrapper.find(`input`).at(4).simulate(`change`, {target: {value: 4}});

    expect(wrapper.find(`input`).at(4).prop(`checked`)).toBe(true);
    expect(wrapper.find(`input`).at(0).prop(`checked`)).toBe(false);
    expect(wrapper.find(`button`).prop(`disabled`)).toBe(true);

    wrapper.find(`textarea`).simulate(`change`, {target: {value: `This is the house that Jack built.`}});

    expect(wrapper.find(`button`).prop(`disabled`)).toBe(true);

    wrapper.find(`textarea`).simulate(`change`, {target: {value: `This is the house that Jack built. And this is the malt`}});

    expect(wrapper.find(`button`).prop(`disabled`)).toBe(false);

    wrapper.simulate(`submit`, {preventDefault: () => {}});

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      comment: `This is the house that Jack built. And this is the malt`,
      rating: 4,
    });
  });
});
