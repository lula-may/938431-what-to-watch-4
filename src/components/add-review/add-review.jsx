import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import AddReviewForm from "../add-review-form/add-review-form.jsx";
import withFormValidity from "../../hocs/with-form-validity/with-form-validity.jsx";
import {movieShape} from "../../components/shapes.js";
import {getAvatarUrl} from "../../reducer/user/selectors.js";
import {getMovieById} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
import {ActionCreator} from "../../reducer/data/data.js";

const AddReviewFormWrapped = withFormValidity(AddReviewForm);

class AddReview extends PureComponent {
  componentDidMount() {
    const {movie, setActiveMovie} = this.props;
    setActiveMovie(movie);
  }

  render() {
    const {avatar, movie: {bgPoster, id, poster, title}} = this.props;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={bgPoster} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.FILMS}/${id}`} className="breadcrumbs__link">{title}</Link>
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
  }
}


AddReview.propTypes = {
  avatar: PropTypes.string.isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  avatar: getAvatarUrl(state),
  movie: getMovieById(state, props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveMovie(movie) {
    dispatch(ActionCreator.setActiveMovie(movie));
  }
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
