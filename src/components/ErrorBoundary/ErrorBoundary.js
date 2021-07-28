import React from 'react';
import ErrorPage from './';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  isMissingChunkError =
    this.state &&
    this.state.error &&
    this.state.error.name === 'ChunkLoadError';

  render() {
    if (this.state.errorInfo || this.props.isDisabled) {
      // Error path
      return (
        <ErrorPage
          error={`${
            this.props.isDisabled
              ? '404 Not Found'
              : this.isMissingChunkError
              ? `Something went wrong. Please try again.`
              : `Sorry. Please try again!`
          }`}
        />
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
