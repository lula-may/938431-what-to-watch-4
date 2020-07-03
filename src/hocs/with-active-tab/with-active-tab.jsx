import React, {PureComponent} from "react";
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
      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onClick={this._handleLinkClick}
        />
      );
    }

    _handleLinkClick(evt) {
      evt.preventDefault();
      const newActiveTab = evt.target.id;
      this.setState({activeTab: newActiveTab});
    }
  }

  WithActiveTab.propTypes = {};

  return WithActiveTab;
};

export default withActiveTab;
