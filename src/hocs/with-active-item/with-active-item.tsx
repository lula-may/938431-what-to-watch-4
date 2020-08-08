import * as React from "react";
import {Subtract} from "utility-types";

interface Props {
  onActiveChange: (activeItem: string) => void;
}

interface State {
  activeItem: string;
}

interface InjectedProps {
  onActiveChange: (activeItem: string) => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: props.activeItem,
      };
      this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(evt) {
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

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onClick={this.handleItemClick}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
