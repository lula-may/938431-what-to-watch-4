import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withFullVideo from "./with-full-video.jsx";
import {testMovies} from "../../test-mocks/test-films.js";

const movie = testMovies[0];

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

const MockComponentWrapped = withFullVideo(MockComponent);

describe(`WithFullVideo HOC`, () => {
  it(`should render <video/> inside MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          movie={movie}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
