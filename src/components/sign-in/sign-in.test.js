import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";

describe(`SingIn Component`, () => {
  it(`should render correctly SignIn Component`, () => {
    const tree = renderer.create(
        <SignIn
          hasLoginError={false}
          isInvalidEmail={false}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Wrong Email Message in SignIn Component`, () => {
    const tree = renderer.create(
        <SignIn
          hasLoginError={true}
          isInvalidEmail={true}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Upload Error Message in SignIn Component`, () => {
    const tree = renderer.create(
        <SignIn
          hasLoginError={true}
          isInvalidEmail={false}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
