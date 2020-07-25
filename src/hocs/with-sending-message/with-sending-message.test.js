import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withSendingMessage} from "./with-sending-message.jsx";
import {testMovies} from "../../test-mocks/test-films.js";
const MockComponent = (props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
const avatar = `avatar.jpg`;
const movie = testMovies[0];

const MockComponentWrapped = withSendingMessage(MockComponent);

describe(`WithSendingMessage HOC`, () => {
  it(`should render loading message inside  MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          avatar={avatar}
          hasError={false}
          isFormBlocked={true}
          movie={movie}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render error message inside  MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          avatar={avatar}
          isFormBlocked={false}
          hasError={true}
          movie={movie}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
