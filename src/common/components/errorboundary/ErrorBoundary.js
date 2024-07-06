import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/global/actions';
// import { getData } from "utils/storage";

export class ErrorBoundary extends Component {
  state = {
    errorMessage: '',
  };
  static getDerivedStateFromError(error) {
    return { errorMessage: error.toString() };
  }
  // componentDidCatch(error, info) {
  // 	// const user = getData("User");
  // 	// let logging = {
  // 	// 	type: 'render',
  // 	// 	date: new Date(),
  // 	// 	email: user ? user.email : '',
  // 	// 	errorMessage: error.toString(),
  // 	// 	errorInfo: info.componentStack
  // 	// };
  // 	// this.props.onUpdateLogging(actions.updateLogging(logging));
  // 	// console.log(error.toString(), info.componentStack);
  // }
  render() {
    if (this.state.errorMessage) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorMessage}
            {/* <br />
						{this.state.errorInfo.componentStack} */}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
const mapStateToProps = (state) => ({});

export function mapDispatchToProps(dispatch) {
  return {
    onUpdateLogging: (logging) => {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
