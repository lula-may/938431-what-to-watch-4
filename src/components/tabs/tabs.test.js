import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {tabs} from "../../test-mocks/test-tabs";

const activeTab = tabs[1][`type`];

it(`should render correctly Tabs Component, Second tab with active class`, () => {
  const tree = renderer.create(
      <Tabs
        activeTab={activeTab}
        onClick={() => {}}
        tabs={tabs}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
