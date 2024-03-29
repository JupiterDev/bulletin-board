import React, { Component } from "react";

import "./product-list.sass";

import Product from "../Product";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesIds: []
    };
    this.renderTarget = this.renderTarget.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
  }

  // Во время монтирования страницы заносим id-шники избранных продуктов из localStorage в state.favoritesIds.
  componentDidMount() {
    if (!localStorage.getItem("favoritesIds")) {
      localStorage.setItem("favoritesIds", []);
    }
    this.setState({
      favoritesIds: [...localStorage.getItem("favoritesIds").split(",")]
    });
  }

  // Из Product.js возвращается id продукта на котором нажали кнопку "избранное". Если в state.favoritesIds такого id нет, то он добавляется. Если есть - удаляется.
  // Затем обновленный массив state.favoritesIds переписывается в localStorage.
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
    const {
      products,
      filteredProducts,
      sortedProducts,
      sellers,
      lastUpdate
    } = this.props;

    // Обрабатываем результат, когда фильтрация вернула пустой массив.
    if (
      (this.props.lastUpdate === "filter" &&
        this.props.filteredProducts.length == 0) ||
      (this.props.lastUpdate === "sort" &&
        this.props.sortedProducts.length == 0)
    ) {
      return <div>По заданным параметрам фильтрации ничего не найдено</div>;
    }
    // Обрабатываем результат, когда запрос на сервер выдал ошибку.
    else if (this.props.requestError) {
      return <div>Ошибка запроса данных с сервера</div>;
    } else {
      switch (lastUpdate) {
        // Если последнее действие - ЗАПРОС ДАННЫХ, то перебираем и выводим продукты из products.
        case "fetch":
          return products.map(item => {
            const productSeller = sellers.find(
              seller => item.relationships.seller == seller.id
            );
            item.seller = productSeller;
            this.state.favoritesIds.indexOf(item.id) !== -1
              ? (item.favorite = true)
              : (item.favorite = false);
            return (
              <Product
                key={item.id}
                item={item}
                addToFavorite={this.addToFavorite}
              />
            );
          });

        // Если последнее действие - ФИЛЬТРАЦИЯ, то перебираем и выводим продукты из filteredProducts.
        case "filter":
          return filteredProducts.map(item => {
            const productSeller = sellers.find(
              seller => item.relationships.seller == seller.id
            );
            item.seller = productSeller;
            this.state.favoritesIds.indexOf(item.id) !== -1
              ? (item.favorite = true)
              : (item.favorite = false);
            return (
              <Product
                key={item.id}
                item={item}
                addToFavorite={this.addToFavorite}
              />
            );
          });

        // Если последнее действие - СОРТИРОВКА, то перебираем и выводим продукты из sortedProducts
        case "sort":
          return sortedProducts.map(item => {
            const productSeller = sellers.find(
              seller => item.relationships.seller == seller.id
            );
            item.seller = productSeller;
            this.state.favoritesIds.indexOf(item.id) !== -1
              ? (item.favorite = true)
              : (item.favorite = false);
            return (
              <Product
                key={item.id}
                item={item}
                addToFavorite={this.addToFavorite}
              />
            );
          });

        default:
          break;
      }
    }
  }

  render() {
    return <div className="product-list">{this.renderTarget()}</div>;
  }
}

export default ProductList;
