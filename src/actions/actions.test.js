import {
  handleErrors,
  fetchDataBegin,
  fetchDataSuccess,
  fetchDataFailure,
  filterData,
  sortData
} from "./boardActions";

import * as constants from "./constants";

describe("Sync actions", () => {
  // проверка ошибки получения списка товаров с сервера
  it("throw error in handleErrors (products)", () => {
    const response = [
      {
        ok: false,
        status: 404
      },
      {
        ok: true,
        status: 200
      }
    ];
    expect(() => handleErrors(response)).toThrowError(
      "Ошибка получения списка товаров с сервера."
    );
  });

  // проверка ошибки получения списка продавцов с сервера
  it("throw error in handleErrors (sellers)", () => {
    const response = [
      {
        ok: true,
        status: 200
      },
      {
        ok: false,
        status: 404
      }
    ];
    expect(() => handleErrors(response)).toThrowError(
      "Ошибка получения списка продавцов с сервера."
    );
  });

  // проверка ошибки получения списка товаров и продавцов с сервера
  it("throw errors in handleErrors (products and sellers)", () => {
    const response = [
      {
        ok: false,
        status: 404
      },
      {
        ok: false,
        status: 404
      }
    ];
    expect(() => handleErrors(response)).toThrowError(
      "Ошибка получения списка товаров и продавцов с сервера."
    );
  });

  // проверка fetchDataBegin
  it("fetchDataBegin", () => {
    expect(fetchDataBegin()).toEqual({
      type: constants.FETCH_DATA_BEGIN
    });
  });

  // проверка fetchDataSuccess на моковых данных
  it("fetchDataSuccess", () => {
    const result = {
      id: 123,
      title: "product"
    };
    expect(fetchDataSuccess(result)).toEqual({
      type: constants.FETCH_DATA_SUCCESS,
      payload: {
        id: 123,
        title: "product"
      }
    });
  });

  // проверка fetchDataFailure на моковых данных
  it("fetchDataFailure", () => {
    const error = {
      message: "Failed to fetch"
    };
    expect(fetchDataFailure(error)).toEqual({
      type: constants.FETCH_DATA_FAILURE,
      payload: {
        error
      }
    });
  });

  // проверка filterData на моковых данных
  it("filterData", () => {
    const filterParam = {
      category: "auto",
      priceFrom: "1500000",
      priceTo: "",
      favorites: false
    };
    expect(filterData(filterParam)).toEqual({
      type: constants.FILTER_DATA,
      payload: {
        category: "auto",
        priceFrom: "1500000",
        priceTo: "",
        favorites: false
      }
    });
  });

  // проверка sortData на моковых данных
  it("sortData", () => {
    const sortParam = "priceHightToLow";
    expect(sortData(sortParam)).toEqual({
      type: constants.SORT_DATA,
      payload: "priceHightToLow"
    });
  });
});
