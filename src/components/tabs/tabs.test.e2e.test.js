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
  it(`should run callback on link click`, () => {
    const activeTab = `Details`;
    const onClick = jest.fn();
    const tabsComponent = shallow(
        <Tabs
          activeTab={activeTab}
          movie={movie}
          onClick={onClick}
        />
    );
    const link = tabsComponent.find(`.movie-nav__link`).at(0);

    link.simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
