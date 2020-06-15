import React, { useEffect } from 'react';
import styles from './Editing.module.css';
import { Redirect, NavLink } from 'react-router-dom';
import AddingProductForm from '../common/Forms/AddingProductForm';

export const Editing = props => {

  if (!props.editableProduct) {
    return <Redirect to="/catalog" />;
  }

  const product = props.editableProduct;
  const id = product.id;
  const discountEndDateChecking = product.price.discountEndDate ? new Date(product.price.discountEndDate.split('T')[0]) : null;

  let editableProduct = {
    heading: product.heading,
    description: product.description,
    photo: product.photo,
    initialPrice: product.price.initialPrice,
    discountEndDate: discountEndDateChecking,
    discount: product.price.discount
  }

  const addEditedProduct = (data) => {
    props.addProductToCatalog(data, id);
  };

  return (
    <div>
        <AddingProductForm onSubmit={addEditedProduct} initialValues={editableProduct} />
    </div>
  )
}