export const required = value => value ? undefined : 'Required field';

export const maxLength = (number) => (value) => 
value && value.length > number ? `Max length is ${number} symbols` : undefined;

export const minLength = (number) => (value) => 
value && value.length < number ? `Min length is ${number} symbols` : undefined;

export const discountRange = () => (value) =>
(isFinite(value) && value >= 10 && value <= 90) || !value ? undefined : 'Input number in range from 10 to 90';

export const maxPrice = () => (value) => 
isFinite(value) && value > 0 && value <= 99999999.99 ? undefined : 'Input positive number from to 99999999.99';

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined