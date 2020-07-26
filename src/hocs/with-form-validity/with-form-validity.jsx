import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCommentUploadingError, getCommentUploadingState} from "../../reducer/data/selectors.js";
import {Operation} from "../../reducer/data/data.js";

const DEFAULT_RATING = 0;
const MESSAGE_STYLE = {
  color: `black`,
  textAlign: `center`,
};

const isValidComment = (comment) => {
  return comment.length >= 50 && comment.length <= 400;
};

const isValidFormData = (comment, rating) => isValidComment(comment) && (rating !== DEFAULT_RATING);

const withFormValidity = (Component) => {
  class WithFormValidity extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: DEFAULT_RATING,
        comment: ``,
        isFormValid: false,
      };

      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleTextChange = this._handleTextChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
    render() {
      const {isCommentLoading} = this.props;
      const {isFormValid, rating} = this.state;

      return (
        <Component
          {...this.props}
          isFormBlocked={isCommentLoading}
          isFormValid={isFormValid}
          onRatingChange={this._handleRatingChange}
          onTextChange={this._handleTextChange}
          onSubmit={this._handleSubmit}
          rating={rating}
        >
          {this.renderMessage()}
        </Component>
      );
    }

    renderMessage() {
      const {hasError, isCommentLoading} = this.props;
      if (isCommentLoading) {
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

    _handleRatingChange(evt) {
      const rating = parseInt(evt.target.value, 10);
      this.setState((oldState) => ({
        rating,
        isFormValid: isValidFormData(oldState.comment, rating),
      }));
    }

    _handleTextChange(evt) {
      const text = evt.target.value;
      this.setState((oldState) => ({
        comment: text,
        isFormValid: isValidFormData(text, oldState.rating),
      }));
    }

    _handleSubmit(evt) {
      const {onSubmit} = this.props;
      const {comment, rating} = this.state;
      evt.preventDefault();
      onSubmit({comment, rating});
    }
  }

  WithFormValidity.propTypes = {
    hasError: PropTypes.bool.isRequired,
    isCommentLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return WithFormValidity;

};

const mapStateToProps = (state) => ({
  hasError: getCommentUploadingError(state),
  isCommentLoading: getCommentUploadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (formData) => {
    dispatch(Operation.postComment(formData));
  }
});
export {withFormValidity};
export default (Comp) => connect(mapStateToProps, mapDispatchToProps)(withFormValidity(Comp));
