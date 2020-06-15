import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './FormControls.module.css'
import { subDays } from "date-fns";

export const RenderDatePicker = ({ input, label,
  meta: { touched, error }
}) => (
    <div className={styles.formControl} >
      <p className={styles.fieldLabel}>{label}</p>
      <DatePicker {...input} dateFormat="yyyy-MM-dd" selected={input.value}
        minDate={subDays(new Date(), -1)} placeholderText="Discount end date" onBlur={() => undefined} />
      {touched && error && <span>{error}</span>}
    </div>

  )

export const FormElement = Element => ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {

  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError && styles.error)}>
      <p className={styles.fieldLabel}>{label}</p>
      <Element {...input} placeholder={label} type={type} />
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea = FormElement('textarea');
export const Input = FormElement('input');

