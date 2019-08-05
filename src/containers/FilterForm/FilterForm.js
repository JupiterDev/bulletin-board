import React, { Component } from "react";

import "./filter-form.sass";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      priceFrom: "",
      priceTo: "",
      favorites: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, checked } = event.target;
    const { filterData } = this.props;

    // проверяем какой параметр фильтра изменился
    // если изменились "категории" или "избранное", то фильтруем данные
    // если изменилась цена, то ждем нажатия кнопки submit

    switch (name) {
      case "category":
        this.setState(
          {
            ...this.state,
            category: value
          },
          () => filterData(this.state)
        );
        break;
      case "priceFrom":
        this.setState({
          ...this.state,
          priceFrom: value
        });
        break;
      case "priceTo":
        this.setState({
          ...this.state,
          priceTo: value
        });
        break;
      case "favorites":
        this.setState({
          ...this.state,
          favorites: checked
        });
        filterData(this.state);
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
  }

  render() {
    return (
      <aside>
        <form name="filter" onSubmit={this.handleSubmit}>
          <div>
            <span>Категории</span>
            <select name="category" onChange={this.handleChange}>
              <option value="empty" default hidden />
              <option value="immovable">Недвижимость</option>
              <option value="cameras">Фотоаппараты</option>
              <option value="auto">Автомобили</option>
              <option value="laptops">Ноутбуки</option>
            </select>
          </div>
          <div>
            <span>Сортировка по цене</span>
            <div>
              <span>от</span>
              <input
                type="text"
                name="priceFrom"
                onChange={this.handlePriceChange}
              />
              <span>до</span>
              <input
                type="text"
                name="priceTo"
                onChange={this.handlePriceChange}
              />
            </div>
          </div>
          <div>
            <span>Сортировка по избранным</span>
            <input
              type="checkbox"
              name="favorites"
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Отправить" />
        </form>
      </aside>
    );
  }
}

export default FilterForm;
