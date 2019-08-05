import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FILTER_DATA
} from "./constants";

import links from "../api.config.js";

export function fetchData() {
  return dispatch => {
    dispatch(fetchDataBegin());
    return Promise.all([fetch(links.products), fetch(links.sellers)])
      .then(handleErrors)
      .then(res => Promise.all(res.map(r => r.json())))
      .then(res => {
        res = { products: res[0].data, sellers: res[1].data };
        return dispatch(fetchDataSuccess(res));
      })
      .catch(error => dispatch(fetchDataFailure(error)));
  };
}

function handleErrors(response) {
  if (!response[0].ok) {
    throw Error(response.statusText);
  } else if (!response[1].ok) {
    throw Error(response.statusText);
  }
  return response;
}

const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
});

const fetchDataSuccess = result => ({
  type: FETCH_DATA_SUCCESS,
  payload: result
});

const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});

export function filterData(filterParam) {
  return {
    type: FILTER_DATA,
    payload: filterParam
  };
}
