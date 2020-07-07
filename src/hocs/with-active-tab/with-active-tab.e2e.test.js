import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import withActiveTab from "./with-active-tab.jsx";
import {testMovies} from "../../test-mocks/test-films";
import Details from "../../components/details/details.jsx";
import Overview from "../../components/overview/overview.jsx";
import Reviews from "../../components/reviews/reviews.jsx";


configure({
  adapter: new Adapter()
});

const movie = testMovies[0];
const tabs = [`Overview`, `Details`, `Reviews`];

const MockComponent = (props) => {
  const {activeTab, children, onClick} = props;
  return (
    <div>
      {tabs.map((tab) => (
        <a key={tab} id={tab} onClick={onClick} className={activeTab === tab ? `active` : ``}/>
      ))}
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  activeTab: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick: PropTypes.func
};

const MockComponentWrapped = withActiveTab(MockComponent);

describe(`WithActiveTab HOC`, () => {
  it(`should render Overview component`, () => {
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
        />
    );

    expect(wrapper.find(Overview).length).toBe(1);
    expect(wrapper.find(Details).length).toBe(0);
    expect(wrapper.find(Reviews).length).toBe(0);
  });

  it(`should render Details component and remove Overview component on Details link click`, () => {
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
        />
    );

    const detailsLink = wrapper.find(`#Details`);
    expect(wrapper.find(Overview).length).toBe(1);
    expect(wrapper.find(Details).length).toBe(0);

    detailsLink.simulate(`click`);
    expect(wrapper.find(Details).length).toBe(1);
    expect(wrapper.find(Overview).length).toBe(0);
  });

  it(`should add "active" class to Details link and remove "active" class from Overviews link on Details link click`, () => {
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
        />
    );

    const overviewLink = wrapper.find(`#Overview`);
    expect(overviewLink.getDOMNode().className).toContain(`active`);

    const detailsLink = wrapper.find(`#Details`);
    expect(detailsLink.getDOMNode().className).not.toContain(`active`);

    detailsLink.simulate(`click`);
    expect(overviewLink.getDOMNode().className).not.toContain(`active`);
    expect(detailsLink.getDOMNode().className).toContain(`active`);
  });
});
