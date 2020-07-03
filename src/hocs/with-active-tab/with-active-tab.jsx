import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Details from "../../components/details/details.jsx";
import Overview from "../../components/overview/overview.jsx";
import Reviews from "../../components/reviews/reviews.jsx";
import {movieShape} from "../../components/shapes";
import {TabType} from "../../const";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: TabType.OVERVIEW
      };
      this._handleLinkClick = this._handleLinkClick.bind(this);
    }

    render() {
      const {activeTab} = this.state;
      const {movie} = this.props;

      switch (activeTab) {
        case TabType.OVERVIEW:
          return (
            <Component
              {...this.props}
              activeTab={activeTab}
              onClick={this._handleLinkClick}
            >
              <Overview movie={movie}/>
            </Component>
          );
        case TabType.DETAILS:
          return (
            <Component
              {...this.props}
              activeTab={activeTab}
              onClick={this._handleLinkClick}
            >
              <Details movie={movie}/>
            </Component>
          );
        case TabType.REVIEWS:
          return (
            <Component
              {...this.props}
              activeTab={activeTab}
              onClick={this._handleLinkClick}
            >
              <Reviews movie={movie}/>
            </Component>
          );
        default: return null;
      }
    }

    _handleLinkClick(evt) {
      evt.preventDefault();
      const newActiveTab = evt.target.id;
      this.setState({activeTab: newActiveTab});
    }
  }

  WithActiveTab.propTypes = {
    movie: PropTypes.shape(movieShape).isRequired
  };

  return WithActiveTab;
};

export default withActiveTab;
