import * as React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {SignIn} from "./sign-in";
import history from "../../history";
import {noop} from "../../utils";

configure({
  adapter: new Adapter(),
});

describe(`SignIn Component`, () => {
  it(`should pass email and password to callback on form submit`, () => {
    const onSubmit = jest.fn((...args) => [...args]);

    const wrapper = mount(
        <Router history={history}>
          <SignIn
            hasLoginError={false}
            isInvalidEmail={false}
            onSubmit={onSubmit}
            updateMovies={noop}
          />
        </Router>
    );

    const Component = wrapper.find(SignIn);
    const form = wrapper.find(`form`);
    const {emailRef, passwordRef} = Component.instance();

    emailRef.current.value = `email`;
    passwordRef.current.value = `password`;

    form.simulate(`submit`, {preventDefault: noop});
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email: `email`,
      password: `password`,
    });
  });
});
