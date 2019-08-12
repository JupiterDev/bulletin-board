import React, { Component } from "react";

import "./filter-form.sass";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      priceFrom: "",
      priceTo: "",
      favorites: false
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
        this.setState(
          {
            ...this.state,
            favorites: checked
          },
          () => filterData(this.state)
        );
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    const { filterData } = this.props;
    filterData(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <aside>
        <form name="filter" onSubmit={this.handleSubmit}>
          <div>
            <div className="filter__category">Категории</div>
            <select name="category" onChange={this.handleChange}>
              <option value="default" default>
                Любая категория
              </option>
              <option value="immovable">Недвижимость</option>
              <option value="cameras">Фотоаппараты</option>
              <option value="auto">Автомобили</option>
              <option value="laptops">Ноутбуки</option>
            </select>
          </div>
          <div className="filter__favorites">
            <span>Только избранное</span>
            <input
              type="checkbox"
              name="favorites"
              onChange={this.handleChange}
            />
          </div>
          <hr />
          <div className="filter__price">
            <div>Фильтрация по цене</div>
            <div className="priceFrom">
              <span>от</span>
              <input
                type="text"
                name="priceFrom"
                onChange={this.handleChange}
              />
            </div>
            <div className="priceTo">
              <span>до</span>
              <input type="text" name="priceTo" onChange={this.handleChange} />
            </div>
          </div>
          <input type="submit" value="Отправить" />
        </form>
      </aside>
    );
  }
}

export default FilterForm;
