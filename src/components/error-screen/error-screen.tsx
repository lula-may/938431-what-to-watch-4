import * as React from "react";

const ErrorScreen: React.FC = () => {
  return (
    <React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Loading Error</h1>
        </header>

        <div className="sign-in user-page__content">
          <div className="sign-in__message">
            <p>Sorry, something went wrong.</p>
            <p> Please try again later.</p>
          </div>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>

    </React.Fragment>
  );
};

export default ErrorScreen;
