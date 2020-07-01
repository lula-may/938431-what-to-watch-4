import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TabType} from "../../const";
import {movieShape} from "../shapes";

const tabsWithIds = [
  {
    type: TabType.OVERVIEW,
    id: `0`
  },
  {
    type: TabType.DETAILS,
    id: `1`
  },
  {
    type: TabType.REVIEWS,
    id: `2`
  }
];

const getRatingLevel = (rating) => {
  if (rating < 3) {
    return `Bad`;
  } else if (rating < 5) {
    return `Normal`;
  } else if (rating < 8) {
    return `Good`;
  } else if (rating < 10) {
    return `Very Good`;
  }
  return `Awesome`;
};

class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TabType.OVERVIEW
    };

    this._setClickHandler = this._setClickHandler.bind(this);
  }

  render() {
    const {activeTab} = this.state;

    return (
      <div className="movie-card__desc">

        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabsWithIds.map((item) => {
              const isActive = item.type === activeTab;
              return (
                <li key={item.id} id={item.type} className={`movie-nav__item${isActive ? ` movie-nav__item--active` : ``}`}>
                  <a href="#"
                    className="movie-nav__link"
                    onClick={this._setClickHandler(item.type)}
                  >{item.type}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        {this._renderInfo()}
      </div>
    );
  }

  _setClickHandler(type) {
    return (evt) => {
      evt.preventDefault();
      this.setState({activeTab: type});
    };
  }

  _renderInfo() {
    const {activeTab} = this.state;
    const {movie} = this.props;
    const {actors, description, director, rating} = movie;
    const {count: ratingCount, score: ratingScore} = rating;
    const {paragraphs} = description;

    const actorsText = `${actors.join(`, `)} and others`;
    const ratingLevel = getRatingLevel(ratingScore);

    switch (activeTab) {
      case TabType.OVERVIEW: return (
        <React.Fragment>
          <div className="movie-rating">
            <div className="movie-rating__score">{ratingScore}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{ratingLevel}</span>
              <span className="movie-rating__count">{ratingCount} ratings</span>
            </p>
          </div>

          <div className="movie-card__text">
            {paragraphs.map((paragraph) => (<p key={Math.random() * new Date()}>{paragraph}</p>))}

            <p className="movie-card__director"><strong>Director: {director}</strong></p>

            <p className="movie-card__starring"><strong>Starring: {actorsText}</strong></p>
          </div>
        </React.Fragment>
      );
      default: return null;
    }
  }

}
Tabs.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
};

export default Tabs;
