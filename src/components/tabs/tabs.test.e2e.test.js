import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";
import {tabs} from "../../test-mocks/test-tabs";

configure({
  adapter: new Adapter(),
});

const activeTab = tabs[1][`type`];

describe(`Tabs component`, () => {
  it(`should run callback on Tab link click`, () => {
    const onClick = jest.fn();
    const tabsComponent = shallow(
        <Tabs
          activeTab={activeTab}
          onClick={onClick}
          tabs={tabs}
        />
    );
    const link = tabsComponent.find(`.movie-nav__link`).at(2);

    link.simulate(`click`, {preventDefault: () => {}});
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it(`should pass tabName to callback on Tab link click`, () => {
    const tabName = tabs[2][`type`];
    const onClick = jest.fn((...args) => [...args]);

    const tabsComponent = shallow(
        <Tabs
          activeTab={activeTab}
          onClick={onClick}
          tabs={tabs}
        />
    );

    const link = tabsComponent.find(`.movie-nav__link`).at(2);

    link.simulate(`click`, {preventDefault: () => {}});
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toEqual(tabName);
  });
});
