import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./board.sass";

import * as boardActions from "../../actions/boardActions";

import FilterForm from "../FilterForm";
import SortPanel from "../SortPanel";
import ProductList from "../ProductList";

class Board extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.boardActions.fetchData();
  }

  render() {
    return (
      <main className="main">
        <div className="container">
          <FilterForm />
          <article>
            <SortPanel />
            <ProductList
              products={this.props.products}
              sellers={this.props.sellers}
            />
          </article>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.boardReducer.products,
    sellers: state.boardReducer.sellers,
    loading: state.boardReducer.loading,
    error: state.boardReducer.error
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
