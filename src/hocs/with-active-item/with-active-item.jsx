import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: props.activeItem,
      };
      this._handleItemClick = this._handleItemClick.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onClick={this._handleItemClick}
        />
      );
    }

    _handleItemClick(evt) {
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
