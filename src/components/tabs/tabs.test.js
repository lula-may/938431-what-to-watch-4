import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

const tabs = [
  {
    id: `aa`,
    type: `First`
  },
  {
    id: `bb`,
    type: `Second`,
  },
  {
    id: `cc`,
    type: `Third`,
  }
];

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
