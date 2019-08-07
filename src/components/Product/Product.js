import React, { Component } from "react";

import "./product.sass";

class Product extends Component {
  constructor(props) {
    super(props);
    this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
  }

  handleAddToFavorites() {
    this.props.addToFavorite(this.props.item.id);
  }

  render() {
    const { item } = this.props;

    // Разделяем пробелами цену на группы, по 3 знака в каждой.
    const price = item.price
      ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : "Цена не указана";

    return (
      <section className="product">
        <img
          src={`https:${item.pictures[0]}`}
          alt="picture"
          className="product__picture"
        />
        <span>{item.pictures.length}</span>
        <h4 className="green red">{item.title}</h4>
        <div>{price}</div>
        <span>{item.seller.name}</span>
        <span>{item.seller.rating}</span>
        <button onClick={this.handleAddToFavorites}>
          Добавить в избранное
        </button>
        <i className={`${item.favorite ? "fas" : "far"} fa-star`} />
      </section>
    );
  }
}

export default Product;
