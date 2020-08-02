import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withVideoPlayer from "./with-video-player.jsx";
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

const MockComponentWrapped = withVideoPlayer(MockComponent);

describe(`WithVideoPlayer HOC`, () => {
  it(`should render <video/> inside MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          movie={movie}
          onCardEnter={() => {}}
          onCardClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


