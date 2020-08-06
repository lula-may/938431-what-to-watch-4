import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import AddReviewForm from "../add-review-form/add-review-form";
import withFormValidity from "../../hocs/with-form-validity/with-form-validity";
import {Movie} from "../../types";
import {getAvatarUrl} from "../../reducer/user/selectors";
import {getMovieById} from "../../reducer/data/selectors";
import {AppRoute} from "../../const";
import {ActionCreator} from "../../reducer/app-state/app-state";


interface Props {
  avatar: string;
  movie: Movie;
  setActiveMovie: (movie: Movie) => void;
}

const AddReviewFormWrapped = withFormValidity(AddReviewForm);

class AddReview extends React.PureComponent<Props> {
  props: Props;

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
