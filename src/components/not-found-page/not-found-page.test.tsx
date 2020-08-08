import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import NotFoundPage from "./not-found-page";
import history from "../../history";

describe(`NotFoundPage`, () => {
  it(`should render correctly 404 Page`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <NotFoundPage/>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
