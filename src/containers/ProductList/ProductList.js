import React, { Component } from "react";

import "./product-list.sass";

import Product from "../../components/Product";

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-list">
        {this.props.products.map(item => {
          const seller = this.props.sellers.find(
            seller => item.relationships.seller == seller.id
          );
          item.seller = seller;
          return <Product key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default ProductList;
