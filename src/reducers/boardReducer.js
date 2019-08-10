import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FILTER_DATA,
  SORT_DATA
} from "../actions/constants";

const initialState = {
  products: [],
  filteredProducts: [], // товары после фильтрации
  sortedProducts: [], // товары после сортировки
  sortedBy: "default", // по какому принципу отсортированы товары
  lastUpdate: "fetch", // последнее действие (товары после фетча/фильтрации/сортировки)
  sellers: [],
  loading: false,
  requestError: false
};

export default function boardReducer(state = initialState, action) {
  const makeChange = (changeType, changeParams) => {
    const filterData = (filterParams, state) => {
      console.log("FILTERPARAM");
      console.log(filterParams);
      console.log("STATE");
      console.log(state);
      let products = [...state.products];

      const filterFunc = () => {
        // фильтруем по КАТЕГОРИЯМ //
        if (filterParams.category && filterParams.category != "default") {
          const resultProducts = products.filter(product => {
            return product.category === filterParams.category;
          });
          products = resultProducts;
        }

        // фильтруем по ЦЕНЕ //
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

        // фильтруем по ИЗБРАННОМУ
        if (filterParams.favorites) {
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

      if (state.sortedBy === "default") {
        return filterFunc();
      } else {
        const newState = {
          filteredProducts: filterFunc(),
          lastUpdate: state.lastUpdate
          // , products: state.products
        };
        console.log("SORTED BY");
        console.log(state.sortedBy);
        console.log("newState");
        console.log(newState);
        return sortData(state.sortedBy, newState);
      }
    };

    const sortData = (sortParam, state) => {
      // console.log("сортируем");

      const sortByParam = param => {
        console.log("PARAM");
        console.log(param);
        const sortedProducts = [...param].sort((a, b) => {
          // при сортировке ПО ВОЗРАСТАНИЮ товары без цены показываются ПЕРВЫМИ
          // при сортировке ПО УБЫВАНИЮ товары без цены показываются ПОСЛЕДНИМИ
          if (!a.price) {
            a.price = 0;
          } else if (!b.price) {
            b.price = 0;
          }

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
        return sortedProducts;
      };

      // if (state.filteredProducts.length > 0 || state.filteredProducts.length == 0 && state.lastUpdate === "filter" ) {
      if (state.lastUpdate === "filter") {
        console.log("FILTER PRODUCTS");
        console.log(state.filteredProducts);
        return sortByParam(state.filteredProducts);
      }
      console.log("SORT PRODUCTS");
      console.log(state.products);
      return sortByParam(state.products);

      // let sortedProducts = [...state.products].sort((a, b) => {
      //   if (sortParam == "priceHightToLow") {
      //     return b.price - a.price;
      //   }
      //   if (sortParam == "priceLowToHight") {
      //     return a.price - b.price;
      //   }
      //   if (sortParam == "rating") {
      //     return b.seller.rating - a.seller.rating;
      //   }
      //   if (sortParam == "default") {
      //     return 0;
      //   }
      // });
      // console.log("SORTedProducts");
      // console.log(sortedProducts);
      // console.log("sortParam");
      // console.log(sortParam);
      // console.log("Товары после отсортировки");
      // console.log(sortedProducts);
      // return sortedProducts;
    };

    if (changeType === "filter") {
      return filterData(changeParams, state);
    } else if (changeType === "sort") {
      return sortData(changeParams, state);
    }
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
      // console.log("action.payload");
      // console.log(action.payload);
      return {
        ...state,
        filteredProducts: makeChange("filter", action.payload),
        lastUpdate: "filter"
      };
    case SORT_DATA:
      // console.log("action.payload");
      // console.log(action.payload);

      switch (action.payload) {
        case "priceHightToLow":
          return {
            ...state,
            sortedProducts: makeChange("sort", "priceHightToLow"),
            lastUpdate: "sort",
            sortedBy: "priceHightToLow"
          };
        case "priceLowToHight":
          return {
            ...state,
            sortedProducts: makeChange("sort", "priceLowToHight"),
            lastUpdate: "sort",
            sortedBy: "priceLowToHight"
          };
        case "rating":
          return {
            ...state,
            sortedProducts: makeChange("sort", "rating"),
            lastUpdate: "sort",
            sortedBy: "rating"
          };
        default:
          return {
            ...state,
            sortedProducts: makeChange("sort", "default"),
            lastUpdate: "sort",
            sortedBy: "default"
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
