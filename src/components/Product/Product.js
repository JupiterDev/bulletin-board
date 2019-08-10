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
    // Если цена не указана, выводим сообщение.
    const price = item.price
      ? `${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
      : "Цена не указана";

    return (
      <section className="product">
        <img
          src={`https:${item.pictures[0]}`}
          alt="picture"
          className="product__picture"
        />
        <div className="product__info">
          <div className="product__title">{item.title}</div>
          <div className="product__price">{`${price}`}</div>
          <div className="product__author">
            {`${item.seller.name} (рейтинг: ${item.seller.rating})`}
          </div>
        </div>
        <div className="product__buttons">
          {item.pictures.length > 0 ? (
            <div className="product__pic-count">
              +{item.pictures.length - 1} <i className="fas fa-images" />
            </div>
          ) : null}
          <i
            className={`${
              item.favorite ? "fas" : "far"
            } fa-heart product__favorite`}
            onClick={this.handleAddToFavorites}
          />
        </div>
      </section>
    );
  }
}

export default Product;
