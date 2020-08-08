import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import history from "../../history";
import {noop} from "../../utils";
import {SignIn} from "./sign-in";

describe(`SingIn Component`, () => {
  it(`should render correctly SignIn Component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <SignIn
            hasLoginError={false}
            isInvalidEmail={false}
            onSubmit={noop}
            updateMovies={noop}
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
            onSubmit={noop}
            updateMovies={noop}
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
            onSubmit={noop}
            updateMovies={noop}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
