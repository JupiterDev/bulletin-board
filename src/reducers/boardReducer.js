import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FILTER_DATA
} from "../actions/constants";

const initialState = {
  products: [],
  sellers: [],
  loading: false,
  error: null
};

export default function boardReducer(state = initialState, action) {
  const filterData = (filterParams, state) => {
    let filterProducts = [...state.products];
    if (filterParams.category) {
      filterProducts.filter(product => {
        product.category === filterParams.category;
      });
    }

    return filterProducts;
  };

  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
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
        error: action.payload.error,
        products: [],
        sellers: []
      };
    case FILTER_DATA:
      console.log("action.payload");
      console.log(action.payload);
      return {
        ...state,
        products: filterData(action.payload, state)
      };
    default:
      return state;
  }
}
