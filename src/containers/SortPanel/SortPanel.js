import React, { Component } from "react";

import "./sort-panel.sass";

class SortPanel extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.sortData(event.target.value);
  }

  render() {
    return (
      <aside className="sort">
        <div>Сортировка по</div>
        <select
          className="sort__selector"
          name="sorting"
          onChange={this.handleChange}
        >
          <option value="default" default>
            умолчанию
          </option>
          <option value="priceHightToLow">цене (убыванию)</option>
          <option value="priceLowToHight">цене (возрастанию)</option>
          <option value="rating">рейтингу продавца</option>
        </select>
      </aside>
    );
  }
}

export default SortPanel;
