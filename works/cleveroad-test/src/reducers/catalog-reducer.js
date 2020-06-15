import { catalogAPI } from '../api/api';
import {reset} from 'redux-form';

const SET_GOODS = 'SET_GOODS';
const SET_EDITABLE_GOOD = 'SET_EDITABLE_GOOD';
const SET_PRODUCT_ID = 'SET_PRODUCT_ID';

let initialState = {
  catalog: [],
  productCount: null,
  productId: null,
  editableProduct: null,
  isFetching: false,
};

export const catalogReducer = (state = initialState, action) => {

  switch (action.type) {

    // в users добавляем тех кто пришли в стейте и новых с сервера
    case SET_GOODS: {
      return {
        ...state,
        catalog: action.goods,
        productCount: action.goods.length
      }
    }

    case SET_PRODUCT_ID: {
      return {
        ...state,
        productId: action.id
      }
    }

    case SET_EDITABLE_GOOD: {
      return {
        ...state,
        editableProduct: action.data
      }
    }

    default:
      return state;
  }

}

export const setGoods = (goods) => ({
  type: SET_GOODS,
  goods
});
export const setEditableGood = (data) => ({
  type: SET_EDITABLE_GOOD,
  data
});
export const setProductId = (id) => ({
  type: SET_PRODUCT_ID,
  id
});

// thunks

export const getCatalogData = () => {
  return dispatch => {
    catalogAPI.getCatalogData().then(response => {
      dispatch(setGoods(response.data))
    })
  }
}

export const deleteCatalogProduct = (id) => {
  return dispatch => {
    catalogAPI.deleteCatalogProduct(id).then( () => {
      dispatch(getCatalogData());
    })
  }
}

export const addProductToCatalog = (body, id) => {
  const data = {
    description: body.description,
    heading: body.heading,
    id,
    photo: body.photo,
    price: {
      discount: body.discount,
      discountEndDate: body.discountEndDate,
      initialPrice: body.initialPrice
    }
  }

  return dispatch => {
    catalogAPI.addProduct(data, id).then( () => {
      dispatch(getCatalogData());
      dispatch(reset('addingProduct'));
      dispatch(setEditableGood(null))
    })
  }
}

export default catalogReducer;