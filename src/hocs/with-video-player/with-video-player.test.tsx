import * as React from "react";
import * as renderer from "react-test-renderer";

import withVideoPlayer from "./with-video-player";
import {testMovies} from "../../test-mocks/test-films";
import {Movie} from "../../types";
import {noop} from "../../utils";

const movie: Movie = testMovies[0];

interface Props {
  children: React.ReactNode;
  onCardClick: () => void;
  onCardEnter: () => void;
}

const MockComponent: React.FC<Props> = (props: Props) => {
  const {children, onCardClick, onCardEnter} = props;
  return (
    <div onMouseEnter={onCardEnter} onClick={onCardClick}>
      {children}
    </div>
  );
};


const MockComponentWrapped = withVideoPlayer(MockComponent);

describe(`WithVideoPlayer HOC`, () => {
  it(`should render <video/> inside MockComponent`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          movie={movie}
          onCardEnter={noop}
          onCardClick={noop}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


