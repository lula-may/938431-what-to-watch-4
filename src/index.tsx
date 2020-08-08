import * as React from "react";
import * as ReactDom from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import App from "./components/app/app";
import {createApi} from "./api";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {ActionCreator, AuthorizationStatus, Operation as UserOperation} from "./reducer/user/user";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorized);
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

store.dispatch(DataOperation.loadMovies());
store.dispatch(UserOperation.checkAuth());
init();
