import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";

describe(`SingIn Component`, () => {
  it(`should render correctly SignIn Component`, () => {
    const tree = renderer.create(
        <SignIn
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
