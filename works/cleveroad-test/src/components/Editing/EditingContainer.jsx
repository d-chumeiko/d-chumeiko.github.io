import React from 'react';
import { Redirect } from 'react-router-dom';
import { isUserAuth } from '../../selectors/auth-selectors';
import { connect } from 'react-redux';
import { getProductId, getEditableProduct, getIsFetching } from '../../selectors/catalog-selectors';
import { /*getProductData*/ addProductToCatalog } from '../../reducers/catalog-reducer';

import { Editing } from './Editing';

const mstp = state => ({
  isAuth: isUserAuth(state),
  productId: getProductId(state),
  editableProduct: getEditableProduct(state),
  isFetching: getIsFetching(state)
})


export const EditingContainer = (props) => {

    return (
      <div>
        {props.isAuth ?
          <div>
            <Editing productId={props.productId} editableProduct={props.editableProduct} addProductToCatalog={props.addProductToCatalog}/>
          </div> :
          <Redirect to="/login" />
        }
      </div>
    )
}

export default connect(mstp, { addProductToCatalog })(EditingContainer);