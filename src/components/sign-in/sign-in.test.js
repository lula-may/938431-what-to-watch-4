import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";
import history from "../../history.js";

describe(`SingIn Component`, () => {
  it(`should render correctly SignIn Component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <SignIn
            hasLoginError={false}
            isInvalidEmail={false}
            onSubmit={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Wrong Email Message in SignIn Component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <SignIn
            hasLoginError={true}
            isInvalidEmail={true}
            onSubmit={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Upload Error Message in SignIn Component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <SignIn
            hasLoginError={true}
            isInvalidEmail={false}
            onSubmit={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
