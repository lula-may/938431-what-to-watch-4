import * as React from "react";
import * as renderer from "react-test-renderer";

import {withFormValidity} from "./with-form-validity";
import {noop} from "../../utils";

interface Props {
  children: React.ReactNode;
}

const MockComponent: React.FC<Props> = (props: Props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withFormValidity(MockComponent);

describe(`WithFormValidity HOC`, () => {
  it(`should render loading message inside  MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          hasError={false}
          isCommentLoading={true}
          onSubmit={noop}
          onRatingChange={noop}
          onTextChange={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render error message inside  MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          isCommentLoading={false}
          hasError={true}
          onRatingChange={noop}
          onTextChange={noop}
          onSubmit={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
