import React from 'react';
import styles from './Adding.module.css';
import { NavLink, Redirect } from 'react-router-dom';
import AddingProductForm from '../common/Forms/AddingProductForm';
import { connect } from 'react-redux';
import {addProductToCatalog} from '../../reducers/catalog-reducer';
import {getProductsCount, getEditableProduct} from '../../selectors/catalog-selectors';
import 'react-widgets/dist/css/react-widgets.css'
import { isUserAuth } from '../../selectors/auth-selectors';


const mstp = state => ({
  productCount: getProductsCount(state),
  isAuth: isUserAuth(state),
})

const Adding = (props) => {

  const addProductToDb = (data) => {
    props.addProductToCatalog(data, props.productCount);
  }

  return (
    <div className={styles.formWrapper}>
    {props.isAuth ?
    <AddingProductForm onSubmit={addProductToDb}/> :
    <Redirect to="/login"/>
    }
    </div>
  )
}

export default connect(mstp, {addProductToCatalog})(Adding);