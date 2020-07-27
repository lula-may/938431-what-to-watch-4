import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withFormValidity} from "./with-form-validity.jsx";
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
const MockComponentWrapped = withFormValidity(MockComponent);

describe(`WithFormValidity HOC`, () => {
  it(`should render loading message inside  MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          hasError={false}
          isCommentLoading={true}
          onSubmit={() => {}}
          onRatingChange={() => {}}
          onTextChange={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render error message inside  MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          isCommentLoading={false}
          hasError={true}
          onRatingChange={() => {}}
          onTextChange={() => {}}
          onSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
