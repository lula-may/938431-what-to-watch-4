import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {AppRoute} from "../../const.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getLoginErrorStatus, getEmailValidity} from "../../reducer/user/selectors.js";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._emailRef = createRef();
    this._passwordRef = createRef();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  render() {
    const {hasLoginError, isInvalidEmail} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this.handleFormSubmit}>
            {hasLoginError && this._renderMessage()}
            <div className="sign-in__fields">
              <div className={`sign-in__field${isInvalidEmail ? ` sign-in__field--error` : ``}`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                  ref={this._emailRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                  ref={this._passwordRef} required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.ROOT} href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }

  _renderMessage() {
    const {hasLoginError, isInvalidEmail} = this.props;
    if (isInvalidEmail) {
      return (
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
        </div>
      );
    }
    if (hasLoginError) {
      return (
        <div className="sign-in__message">
          <p>We can&apos;t recognize this email <br/> and password combination. Please try again.</p>
        </div>
      );
    }
    return null;
  }

  handleFormSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();
    onSubmit({
      email: this._emailRef.current.value,
      password: this._passwordRef.current.value,
    });
  }
}

SignIn.propTypes = {
  hasLoginError: PropTypes.bool.isRequired,
  isInvalidEmail: PropTypes.bool.isRequired,
  loginError: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  hasLoginError: getLoginErrorStatus(state),
  isInvalidEmail: getEmailValidity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (authData) => {
    dispatch(UserOperation.login(authData));
  },
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

