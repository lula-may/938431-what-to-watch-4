import * as React from "react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import {AddReview} from "./add-review";
import history from "../../history";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

const movie: Movie = testMovies[1];
const avatar = `img/avatar.jpg`;

const store = mockStore({
  [NameSpace.DATA]: {
    activeMovie: movie,
    hasUploadingError: false,
    isUploading: false,
  },
  [NameSpace.USER]: {
    authorizationStatus: `AUTH`,
    avatarUrl: avatar,
  }
});


describe(`AddReview Component`, () => {
  it(`should render correctly AddReview Component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              avatar={avatar}
              movie={movie}
              setActiveMovie={noop}
            />
          </Provider>
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
