import React, {Fragment, createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {movieShape} from "../../components/shapes.js";

const MAX_RATING = 5;
const REVIEW_LENGTH_MIN = 50;
const REVIEW_LENGTH_MAX = 400;
const starsIds = [1, 2, 3, 4, 5];

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();
    const formData = new FormData(this._formRef.current);
    const rating = parseInt(formData.get(`rating`), 10) || MAX_RATING;
    const comment = formData.get(`review-text`);
    onSubmit({rating, comment});
  }

  render() {
    const {avatar, children, isFormBlocked, movie: {bgPoster, poster, title}} = this.props;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={bgPoster} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
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

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this.handleSubmit} ref={this._formRef}>
            <div className="rating">
              <div className="rating__stars">
                {starsIds.map((id) => {
                  return (<Fragment key={id}>
                    <input className="rating__input" id={`star-${id}`} type="radio" name="rating" value={id} disabled={isFormBlocked}/>
                    <label className="rating__label" htmlFor={`star-${id}`}>Rating {id}</label>
                  </Fragment>
                  );
                })}
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                minLength={REVIEW_LENGTH_MIN}
                maxLength={REVIEW_LENGTH_MAX}
                required
                disabled={isFormBlocked}
              ></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isFormBlocked}>Post</button>
              </div>

            </div>
          </form>
        </div>
        {children}
      </section>
    );
  }
}


AddReview.propTypes = {
  avatar: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isFormBlocked: PropTypes.bool.isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddReview;
