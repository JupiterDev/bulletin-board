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
    const { boardActions } = this.props;
    return (
      <main className="main">
        <div className="container">
          <FilterForm filterData={boardActions.filterData} />
          <article>
            <SortPanel sortData={boardActions.sortData} />
            <ProductList
              products={this.props.products}
              filteredProducts={this.props.filteredProducts}
              sortedProducts={this.props.sortedProducts}
              sellers={this.props.sellers}
              // filterError={this.props.filterError}
              lastUpdate={this.props.lastUpdate}
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
    filteredProducts: state.boardReducer.filteredProducts,
    sortedProducts: state.boardReducer.sortedProducts,
    // sortProductsBy: state.boardReducer.sortProductsBy,
    sellers: state.boardReducer.sellers,
    // loading: state.boardReducer.loading,
    // requestError: state.boardReducer.requestError,
    lastUpdate: state.boardReducer.lastUpdate
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
