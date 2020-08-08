import * as React from "react";
import {connect} from "react-redux";
import {Subtract} from "utility-types";
import {getUploadingError, getUploadingState} from "../../reducer/data/selectors";
import {Operation} from "../../reducer/data/data";

const DEFAULT_RATING = 0;


const isValidComment = (comment) => {
  return comment.length >= 50 && comment.length <= 400;
};

const isValidFormData = (comment, rating) => isValidComment(comment) && (rating !== DEFAULT_RATING);

type CommentType = {
  comment: string;
  rating: number;
}

interface Props {
  hasError: boolean;
  isCommentLoading: boolean;
  onSubmit: (commentData: CommentType) => void;
}

interface State {
  comment: string;
  isFormValid: boolean;
  rating: number;
}

interface InjectedProps {
  isFormBlocked: boolean;
  isFormValid: boolean;
  onRatingChange: (evt: React.SyntheticEvent) => void;
  onTextChange: (evt: React.SyntheticEvent) => void;
  onSubmit: (evt: React.SyntheticEvent) => void;
  rating: number;
}

const withFormValidity = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithFormValidity extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: DEFAULT_RATING,
        comment: ``,
        isFormValid: false,
      };

      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderMessage() {
      const {hasError, isCommentLoading} = this.props;
      if (isCommentLoading) {
        return (
          <p style={{color: `black`, textAlign: `center`}}>Sending your review...</p>
        );
      }
      if (hasError) {
        return (
          <div style={{color: `black`, textAlign: `center`}}>
            <p>Sorry, we can&apos;t post your review.</p>
            <p>Please, check the Internet connection and try again later.</p>
          </div>
        );
      }
      return null;
    }

    handleRatingChange(evt) {
      const rating = parseInt(evt.target.value, 10);
      this.setState((oldState) => ({
        rating,
        isFormValid: isValidFormData(oldState.comment, rating),
      }));
    }

    handleTextChange(evt) {
      const text = evt.target.value;
      this.setState((oldState) => ({
        comment: text,
        isFormValid: isValidFormData(text, oldState.rating),
      }));
    }

    handleSubmit(evt) {
      const {onSubmit} = this.props;
      const {comment, rating} = this.state;
      evt.preventDefault();
      onSubmit({comment, rating});
    }

    render() {
      const {isCommentLoading} = this.props;
      const {isFormValid, rating} = this.state;

      return (
        <Component
          {...this.props}
          isFormBlocked={isCommentLoading}
          isFormValid={isFormValid}
          onRatingChange={this.handleRatingChange}
          onTextChange={this.handleTextChange}
          onSubmit={this.handleSubmit}
          rating={rating}
        >
          {this.renderMessage()}
        </Component>
      );
    }

  }

  return WithFormValidity;
};

const mapStateToProps = (state) => ({
  hasError: getUploadingError(state),
  isCommentLoading: getUploadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (formData) => {
    dispatch(Operation.postComment(formData));
  }
});
export {withFormValidity};
export default (Comp) => connect(mapStateToProps, mapDispatchToProps)(withFormValidity(Comp));
