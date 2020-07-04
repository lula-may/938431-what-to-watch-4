import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

it(`should render correctly Tabs Component, "Overview" tab with active class`, () => {
  const activeTab = `Overview`;
  const tree = renderer.create(
      <Tabs
        activeTab={activeTab}
        onClick={() => {}}
      >
        <div/>
      </Tabs>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
