import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";
import {Operation as DataOperation} from "../../reducer/data/data";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getLoginErrorStatus, getEmailValidity} from "../../reducer/user/selectors";

type LoginProps = {
  email: string;
  password: string;
}

interface Props {
  hasLoginError: boolean;
  isInvalidEmail: boolean;
  onSubmit: (authData: LoginProps) => void;
  updateMovies: () => void;
}

class SignIn extends React.PureComponent<Props> {
  private emailRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  renderMessage() {
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
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    });
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
            {hasLoginError && this.renderMessage()}
            <div className="sign-in__fields">
              <div className={`sign-in__field${isInvalidEmail ? ` sign-in__field--error` : ``}`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                  ref={this.emailRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                  ref={this.passwordRef} required
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
}

const mapStateToProps = (state) => ({
  hasLoginError: getLoginErrorStatus(state),
  isInvalidEmail: getEmailValidity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  updateMovies: () => {
    dispatch(DataOperation.loadMovies());
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

