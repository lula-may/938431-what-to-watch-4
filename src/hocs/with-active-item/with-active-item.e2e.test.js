import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import withActiveItem from "./with-active-item.jsx";

configure({
  adapter: new Adapter()
});

const tabs = [`First`, `Second`, `Third`];

const MockComponent = (props) => {
  const {activeItem, onClick} = props;
  return (
    <div>
      {tabs.map((tab) => (
        <a key={tab} id={tab} onClick={onClick} className={activeItem === tab ? `active` : ``}/>
      ))}
    </div>
  );
};

MockComponent.propTypes = {
  activeItem: PropTypes.string,
  onClick: PropTypes.func
};

const MockComponentWrapped = withActiveItem(MockComponent);

describe(`WithActiveItem HOC`, () => {

  it(`should add "active" class to "Second" link and remove "active" class from "First link on link click`, () => {
    const wrapper = mount(
        <MockComponentWrapped
          activeItem={`First`}
          onActiveChange={() => {}}
        />
    );

    const secondLink = wrapper.find(`#Second`);
    expect(secondLink.getDOMNode().className).not.toContain(`active`);

    const firstLink = wrapper.find(`#First`);
    expect(firstLink.getDOMNode().className).toContain(`active`);

    secondLink.simulate(`click`);

    expect(secondLink.getDOMNode().className).toContain(`active`);
    expect(firstLink.getDOMNode().className).not.toContain(`active`);
  });

  it(`should pass "Second" to callback on second link click`, () => {
    const onActiveChange = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <MockComponentWrapped
          activeItem={`First`}
          onActiveChange={onActiveChange}
        />
    );

    const secondLink = wrapper.find(`#Second`);
    secondLink.simulate(`click`);

    expect(onActiveChange.mock.calls[0][0]).toEqual(`Second`);
  });
});
