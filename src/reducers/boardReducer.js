import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FILTER_DATA,
  SORT_DATA
} from "../actions/constants";

const initialState = {
  products: [],
  filteredProducts: [], // продукты после фильтрации
  sortedProducts: [], // продукты после сортировки
  sellers: [],
  loading: false,
  requestError: false,
  lastUpdate: "fetch" // последнее действие (продукты после фетча/фильтрации/сортировки )
};

export default function boardReducer(state = initialState, action) {
  const filterData = (filterParams, state) => {
    const filter = base => {
      let products = [...base];

      // фильтруем, если указана фильтрация по КАТЕГОРИЯМ //
      if (filterParams.category && filterParams.category != "default") {
        const resultProducts = products.filter(product => {
          return product.category === filterParams.category;
        });
        products = resultProducts;
      }

      // фильтруем, если указана фильтрация по ЦЕНЕ //
      if (filterParams.priceFrom && filterParams.priceTo) {
        const resultProducts = products.filter(product => {
          if (product.price) {
            return (
              product.price >= +filterParams.priceFrom &&
              product.price <= +filterParams.priceTo
            );
          }
        });
        products = resultProducts;
      } else if (!filterParams.priceFrom && filterParams.priceTo) {
        const resultProducts = products.filter(product => {
          if (product.price) {
            return product.price <= +filterParams.priceTo;
          }
        });
        products = resultProducts;
      } else if (filterParams.priceFrom && !filterParams.priceTo) {
        const resultProducts = products.filter(product => {
          if (product.price) {
            return product.price >= +filterParams.priceFrom;
          }
        });
        products = resultProducts;
      }

      // фильтруем, если указана фильтрация по ИЗБРАННОМУ
      if (filterParams.favorites) {
        // console.log("ТРИГГЕР!!");
        const favoritesProducts = localStorage
          .getItem("favoritesIds")
          .split(",");
        const resultProducts = products.filter(product => {
          if (favoritesProducts.indexOf(product.id) != -1) {
            return product;
          }
        });
        products = resultProducts;
      }

      return products;
    };

    if (state.sortedProducts.length > 0) {
      return filter(state.sortedProducts);
    }
    return filter(state.products);
  };

  const sortData = (sortParam, state) => {
    if (state.filteredProducts.length > 0) {
      let sortedProducts = [...state.filteredProducts].sort((a, b) => {
        if (sortParam == "priceHightToLow") {
          return b.price - a.price;
        }
        if (sortParam == "priceLowToHight") {
          return a.price - b.price;
        }
        if (sortParam == "rating") {
          return b.seller.rating - a.seller.rating;
        }
        if (sortParam == "default") {
          return 0;
        }
      });
      return {
        ...state,
        sortedProducts: sortedProducts
      };
    }

    let sortedProducts = [...state.products].sort((a, b) => {
      if (sortParam == "priceHightToLow") {
        return b.price - a.price;
      }
      if (sortParam == "priceLowToHight") {
        return a.price - b.price;
      }
      if (sortParam == "rating") {
        return b.seller.rating - a.seller.rating;
      }
      if (sortParam == "default") {
        return 0;
      }
    });
    console.log("SORTedProducts");
    console.log(sortedProducts);
    console.log("sortParam");
    console.log(sortParam);
    return sortedProducts;
  };

  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        requestError: null
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        sellers: action.payload.sellers
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        requestError: action.payload.error,
        products: [],
        sellers: []
      };
    case FILTER_DATA:
      console.log("action.payload");
      console.log(action.payload);
      return {
        ...state,
        filteredProducts: filterData(action.payload, state),
        lastUpdate: "filter"
      };
    case SORT_DATA:
      console.log("action.payload");
      console.log(action.payload);

      switch (action.payload) {
        case "priceHightToLow":
          return {
            ...state,
            sortedProducts: sortData("priceHightToLow", state),
            lastUpdate: "sort"
          };
        case "priceLowToHight":
          return {
            ...state,
            sortedProducts: sortData("priceLowToHight", state),
            lastUpdate: "sort"
          };
        case "rating":
          return {
            ...state,
            sortedProducts: sortData("rating", state),
            lastUpdate: "sort"
          };
        default:
          return {
            ...state,
            sortedProducts: sortData("default", state),
            lastUpdate: "sort"
          };
      }

    // return {
    //   ...state,
    //   filteredProducts: filterData(action.payload, state),
    //   filterError: filterData(action.payload, state).length > 0 ? false : true
    // };
    // return state;
    default:
      return state;
  }
}
