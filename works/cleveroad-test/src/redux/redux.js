import {combineReducers, createStore, applyMiddleware } from "redux";
import catalogReducer from "../reducers/catalog-reducer";
import authReducer from "../reducers/auth-reducer";
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
  catalogePage: catalogReducer,
  auth: authReducer,
  form: formReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;