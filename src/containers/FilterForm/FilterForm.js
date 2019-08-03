import React, { Component } from "react";

import "./filter-form.sass";

class FilterForm extends Component {
  render() {
    return (
      <aside>
        <form name="filter">
          <div>Категории</div>
          <div>Сортировка по цене</div>
          <div>Сортировка по избранным</div>
        </form>
      </aside>
    );
  }
}

export default FilterForm;
