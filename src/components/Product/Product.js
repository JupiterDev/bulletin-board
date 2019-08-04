import React from "react";

import "./product.sass";

const Product = ({ item }) => {
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
    </section>
  );
};

export default Product;
