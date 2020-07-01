import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Overview from "../overview/overview.jsx";
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


class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TabType.OVERVIEW
    };

    this._handleLinkClick = this._handleLinkClick.bind(this);
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
                <li key={item.id} className={`movie-nav__item${isActive ? ` movie-nav__item--active` : ``}`}>
                  <a href="#"
                    className="movie-nav__link"
                    id={item.type}
                    onClick={this._handleLinkClick}
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

  _handleLinkClick(evt) {
    evt.preventDefault();
    const newActiveTab = evt.target.id;
    this.setState({activeTab: newActiveTab});
  }

  _renderInfo() {
    const {activeTab} = this.state;
    const {movie} = this.props;

    switch (activeTab) {
      case TabType.OVERVIEW:
        return (
          <Overview movie={movie}/>
        );
      default: return null;
    }
  }

}
Tabs.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
};

export default Tabs;
