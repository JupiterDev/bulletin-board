import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as boardActions from "../actions/boardActions";

class App extends Component {
  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    boardState: state.boardReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    boardActions: bindActionCreators(boardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
