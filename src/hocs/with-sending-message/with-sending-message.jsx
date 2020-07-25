import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getActiveMovie, getCommentUploadingError, getLoadingState} from "../../reducer/data/selectors.js";
import {getAvatarUrl} from "../../reducer/user/selectors.js";
import {Operation} from "../../reducer/data/data.js";
import {movieShape} from "../../components/shapes.js";

const MESSAGE_STYLE = {
  color: `black`,
  textAlign: `center`,
};

const withSendingMessage = (Component) => {
  class WithSendingMessage extends PureComponent {
    render() {
      const {avatar, isFormBlocked, movie, onSubmit} = this.props;

      return (
        <Component
          {...this.props}
          avatar={avatar}
          isFormBlocked={isFormBlocked}
          movie={movie}
          onSubmit={onSubmit}
        >
          {this.renderMessage()}
        </Component>
      );
    }

    renderMessage() {
      const {hasError, isFormBlocked} = this.props;
      if (isFormBlocked) {
        return (
          <p style={MESSAGE_STYLE}>Sending your review...</p>
        );
      }
      if (hasError) {
        return (
          <div style={MESSAGE_STYLE}>
            <p>Sorry, we can&apos;t post your review.</p>
            <p>Please, check the Internet connection and try again later.</p>
          </div>
        );
      }
      return null;
    }
  }

  WithSendingMessage.propTypes = {
    avatar: PropTypes.string.isRequired,
    hasError: PropTypes.bool.isRequired,
    isFormBlocked: PropTypes.bool.isRequired,
    movie: PropTypes.shape(movieShape).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return WithSendingMessage;

};

const mapStateToProps = (state) => ({
  avatar: getAvatarUrl(state),
  movie: getActiveMovie(state),
  hasError: getCommentUploadingError(state),
  isFormBlocked: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (formData) => {
    dispatch(Operation.postComment(formData));
  }
});
export {withSendingMessage};
export default (Comp) => connect(mapStateToProps, mapDispatchToProps)(withSendingMessage(Comp));
