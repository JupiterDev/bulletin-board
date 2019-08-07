import React, { Component } from "react";

import "./product-list.sass";

import Product from "../../components/Product";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesIds: []
    };
    this.renderTarget = this.renderTarget.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
  }

  // При обновлении страницы заносим id-шники избранных товаров в state.favoritesIds.
  componentDidMount() {
    this.setState({
      favoritesIds: [...localStorage.getItem("favoritesIds").split(",")]
    });
  }

  // Из Product.js возвращается id продукта на котором нажали кнопку "избранное". Если в state.favoritesIds такого id нет, то он добавляется. Если есть - удаляется.
  //  Затем обновленный массив state.favoritesIds переписывается в localStorage.
  addToFavorite(id) {
    if (this.state.favoritesIds.indexOf(id) == -1) {
      this.setState(
        {
          ...this.state,
          favoritesIds: [...this.state.favoritesIds, id]
        },
        () => {
          localStorage.setItem("favoritesIds", this.state.favoritesIds);
        }
      );
    } else {
      const updatedState = this.state.favoritesIds.filter(item => {
        return item != id;
      });
      this.setState(
        {
          ...this.state,
          favoritesIds: [...updatedState]
        },
        () => {
          localStorage.setItem("favoritesIds", this.state.favoritesIds);
        }
      );
    }
  }

  renderTarget() {
    const { products, filteredProducts, sortedProducts, sellers } = this.props;

    if (sortedProducts.length != 0) {
      return sortedProducts.map(item => {
        const productSeller = sellers.find(
          seller => item.relationships.seller == seller.id
        );
        item.seller = productSeller;
        return (
          <Product
            key={item.id}
            item={item}
            addToFavorite={this.addToFavorite}
          />
        );
      });
    }

    if (filteredProducts.length != 0 && sortedProducts.length == 0) {
      return filteredProducts.map(item => {
        const productSeller = sellers.find(
          seller => item.relationships.seller == seller.id
        );
        item.seller = productSeller;
        return (
          <Product
            key={item.id}
            item={item}
            addToFavorite={this.addToFavorite}
          />
        );
      });
    }

    return products.map(item => {
      const productSeller = sellers.find(
        seller => item.relationships.seller == seller.id
      );
      item.seller = productSeller;
      this.state.favoritesIds.indexOf(item.id) !== -1
        ? (item.favorite = true)
        : (item.favorite = false);
      return (
        <Product key={item.id} item={item} addToFavorite={this.addToFavorite} />
      );
    });
  }

  render() {
    return this.props.filterError ? (
      <div>По заданным параметрам фильтрации ничего не найдено</div>
    ) : (
      <div className="product-list">{this.renderTarget()}</div>
    );
  }
}

export default ProductList;
