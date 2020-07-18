import React from "react";
import ReactDom from "react-dom";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import App from "./components/app/app.jsx";
import {promoMovie} from "./mocks/films";
import {reducer} from "./reducer.js";
import {createApi} from "./api.js";

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const api = createApi(() => {});

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <App
          headerMovie={promoMovie}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
