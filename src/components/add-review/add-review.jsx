import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import AddReviewForm from "../add-review-form/add-review-form.jsx";
import withFormValidity from "../../hocs/with-form-validity/with-form-validity.jsx";
import {movieShape} from "../../components/shapes.js";
import {getAvatarUrl} from "../../reducer/user/selectors.js";
import {getActiveMovie} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
import {ActionCreator} from "../../reducer/data/data.js";

const AddReviewFormWrapped = withFormValidity(AddReviewForm);

const AddReview = (props) => {
  const {avatar, movie: {bgPoster, id, poster, title}, onLogoLinkClick} = props;
  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={bgPoster} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link" onClick={onLogoLinkClick}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src={avatar} alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={`${title} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewFormWrapped/>
    </section>
  );
};


AddReview.propTypes = {
  avatar: PropTypes.string.isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  onLogoLinkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  avatar: getAvatarUrl(state),
  movie: getActiveMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogoLinkClick() {
    dispatch(ActionCreator.resetActiveMovie());
  }
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
