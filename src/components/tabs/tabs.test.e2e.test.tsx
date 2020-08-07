import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {Movie, Review, TabType} from "../../types";
import Tabs from "./tabs";
import {testMovies, reviews} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter(),
});

const movie: Movie = testMovies[0];
const comments: Array<Review | null> = reviews;

describe(`Tabs component`, () => {
  it(`should run callback on link click`, () => {
    const activeTab: TabType = TabType.DETAILS;
    const onClick = jest.fn();
    const tabsComponent = shallow(
        <Tabs
          activeItem={activeTab}
          comments={comments}
          hasLoadingError={false}
          movie={movie}
          onClick={onClick}
        >
          <div/>
        </Tabs>
    );
    const link = tabsComponent.find(`.movie-nav__link`).at(0);

    link.simulate(`click`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
