import React, { useEffect } from 'react';
import styles from './Catalog.module.css';
import { NavLink } from 'react-router-dom';
import Catalog from './Catalog';
import { connect } from 'react-redux';
import { getCatalogData, /*getProductData*/ deleteCatalogProduct, setProductId, setEditableGood } from '../../reducers/catalog-reducer';
import { getProducts } from '../../selectors/catalog-selectors';


let mapStateToProps = (state) => {
  return {
    goods: getProducts(state),
  }
}

const CatalogContainer = (props) => {

  useEffect(() => {
    props.getCatalogData();
  })

  return (
    <Catalog goods={props.goods} deleteCatalogProduct={props.deleteCatalogProduct} setEditableGood={props.setEditableGood} />
  )
}

export default connect(mapStateToProps, { getCatalogData, deleteCatalogProduct, setEditableGood })(CatalogContainer);