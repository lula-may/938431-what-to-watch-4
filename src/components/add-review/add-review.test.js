import React from "react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import {AddReview} from "./add-review.jsx";
import history from "../../history.js";
import {testMovies} from "../../test-mocks/test-films.js";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const movie = testMovies[1];
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
              onLogoLinkClick={() => {}}
            />
          </Provider>
        </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
