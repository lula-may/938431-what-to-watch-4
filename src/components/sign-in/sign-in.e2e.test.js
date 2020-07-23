import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SignIn} from "./sign-in.jsx";

configure({
  adapter: new Adapter(),
});

describe(`SignIn Component`, () => {
  it(`should pass email and password to callback on form submit`, () => {
    const onSubmit = jest.fn((...args) => [...args]);

    const wrapper = mount(
        <SignIn
          hasLoginError={false}
          isInvalidEmail={false}
          onSubmit={onSubmit}
        />
    );

    const form = wrapper.find(`form`);
    const {_emailRef, _passwordRef} = wrapper.instance();

    _emailRef.current.value = `email`;
    _passwordRef.current.value = `password`;

    form.simulate(`submit`, {preventDefault: () => {}});
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      email: `email`,
      password: `password`,
    });
  });
});
