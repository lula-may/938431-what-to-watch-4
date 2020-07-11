import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: props.activeItem,
      };
      this._handleLinkClick = this._handleLinkClick.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onClick={this._handleLinkClick}
        />
      );
    }

    _handleLinkClick(evt) {
      const {onActiveChange} = this.props;
      const {activeItem} = this.state;
      evt.preventDefault();
      const newActiveItem = evt.target.id;
      if (newActiveItem === activeItem) {
        return;
      }
      this.setState({activeItem: newActiveItem});
      onActiveChange(newActiveItem);
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string.isRequired,
    onActiveChange: PropTypes.func.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
