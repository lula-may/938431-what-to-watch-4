import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";
import {movies, promoMovie} from "./mocks/films";
import {reducer} from "./reducer.js";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const init = () => {
  ReactDom.render(
      <Provider store={store}>
        <App
          headerMovie={promoMovie}
          movies={movies}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
