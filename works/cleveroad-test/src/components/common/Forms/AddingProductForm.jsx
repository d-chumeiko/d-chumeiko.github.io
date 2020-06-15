import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength, minLength, discountRange, maxPrice } from '../../../utils/validators/validator';
import { Input, Textarea, RenderDatePicker } from '../FormControls/FormControls';

const isDiscountValid = discountRange();
const isMaxPriceValid = maxPrice();
const minLength20 = minLength(20);
const maxLength60 = maxLength(60);
const maxLength200 = maxLength(200);

const AddingProductForm = (props) => {
  const { handleSubmit, pristine, submitting} = props;

  return (
    <form onSubmit={handleSubmit}>
        <Field
          name="photo"
          label="Product image link"
          type="text"
          component={Input}
          autoComplete="on"
          validate={required}
          defaultValue='avfdfgdg' />

        <Field
          name="heading"
          label="Heading"
          type="text"
          component={Input}
          autoComplete="on"
          validate={[required, minLength20, maxLength60]} />
 
        <Field
          name="description"
          label="Description"
          type="text"
          component={Textarea}
          autoComplete="on"
          validate={maxLength200} />

        <Field
          name="initialPrice"
          label="Price ($)"
          type="text"
          component={Input}
          autoComplete="on"
          validate={[required, isMaxPriceValid]} />

        <Field
          name="discount"
          label="Discount percentage (%)"
          type="text"
          component={Input}
          autoComplete="on"
          validate={isDiscountValid} />

        <Field
          name="discountEndDate"
          component={RenderDatePicker}
          label="Discount end date"
          />

      {props.error && <div>{props.error}</div>}

      <button type="submit" disabled={pristine || submitting}>Add product</button>
    </form>
  )
}

export default reduxForm({
  form: 'addingProduct'
})(AddingProductForm);