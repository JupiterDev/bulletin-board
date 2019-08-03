import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./board.sass";

import * as boardActions from "../../actions/boardActions";

import FilterForm from "../FilterForm";
import SortPanel from "../SortPanel";
import ProductList from "../ProductList";

class Board extends Component {
  render() {
    return (
      <main className="main">
        <div className="container">
          <FilterForm />
          <article>
            <SortPanel />
            <ProductList />
          </article>
        </div>
      </main>
    );
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
)(Board);
