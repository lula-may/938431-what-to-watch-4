import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter(),
});

const movie = testMovies[0];

describe(`Tabs component`, () => {
  it(`should pass Tab name to state.activeTab on link click`, () => {
    const tabName = `Details`;
    const tabsComponent = shallow(
        <Tabs
          movie={movie}
        />
    );
    const link = tabsComponent.find(`.movie-nav__link`).at(1);

    link.simulate(`click`, {preventDefault: () => {}, target: {id: tabName}});
    expect(tabsComponent.state().activeTab).toEqual(tabName);
  });
});
