import reducer, { initialState } from "./boardReducer";
import * as constants from "../actions/constants";

describe("Board reducers", () => {
  it("FETCH_DATA_BEGIN", () => {
    const action = {
      type: constants.FETCH_DATA_BEGIN
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  it("FETCH_DATA_SUCCESS", () => {
    const action = {
      type: constants.FETCH_DATA_SUCCESS,
      payload: {
        products: [1, 2, 3, 4],
        sellers: [5, 6, 7, 8]
      }
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      products: [1, 2, 3, 4],
      sellers: [5, 6, 7, 8]
    });
  });

  it("FETCH_DATA_FAILURE", () => {
    const action = {
      type: constants.FETCH_DATA_FAILURE,
      payload: { error: "Fatal Error" }
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      requestError: "Fatal Error",
      products: [],
      sellers: []
    });
  });

  it("FILTER_DATA", () => {
    const action = {
      type: constants.FILTER_DATA,
      payload: {
        category: "auto",
        priceFrom: "",
        priceTo: "",
        favorites: false
      }
    };

    const initialState = {
      products: [
        {
          id: 1,
          category: "auto"
        },
        {
          id: 2,
          category: "laptops"
        },
        {
          id: 3,
          category: "auto"
        }
      ],
      sortedBy: "default"
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      filteredProducts: [
        {
          id: 1,
          category: "auto"
        },
        {
          id: 3,
          category: "auto"
        }
      ],
      lastUpdate: "filter"
    });
  });

  it("SORT_DATA", () => {
    const action = {
      type: constants.SORT_DATA,
      payload: "priceHightToLow"
    };

    const initialState = {
      filteredProducts: [
        {
          id: 1,
          price: 63
        },
        {
          id: 2,
          price: 122
        },
        {
          id: 3,
          price: 18
        }
      ]
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      sortedProducts: [
        {
          id: 2,
          price: 122
        },
        {
          id: 1,
          price: 63
        },
        {
          id: 3,
          price: 18
        }
      ],
      lastUpdate: "sort",
      sortedBy: "priceHightToLow"
    });
  });
});
