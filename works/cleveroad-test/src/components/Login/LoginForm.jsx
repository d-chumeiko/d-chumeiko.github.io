import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {required, email} from '../../utils/validators/validator';
import { Input } from '../common/FormControls/FormControls';

let LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field 
        name="emailField" 
        label="E-mail" 
        type="email"
        component={Input}
        autoComplete="on"
        validate={[required, email]}
        />
        </div>
      <div>
        <Field name="passwordField" label="Password" type="password" component={Input}  autoComplete="on" validate={[required]}/>
        </div>

      {props.error && <div>{props.error}</div>}
      
      <button type="submit" disabled={pristine || submitting}>Login</button>
    </form>
  )
}

export default reduxForm({
  form: 'login'
})(LoginForm);