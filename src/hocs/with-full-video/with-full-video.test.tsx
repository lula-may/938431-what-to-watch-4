import * as React from "react";
import * as renderer from "react-test-renderer";

import {withFullVideo} from "./with-full-video";
import {Movie} from "../../types";
import {testMovies} from "../../test-mocks/test-films";

const movie: Movie = testMovies[0];

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
