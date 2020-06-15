import React from 'react';
import styles from './Login.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserAuth } from '../../selectors/auth-selectors';
import { login } from '../../reducers/auth-reducer'
import LoginForm from './LoginForm';

const mapStateToProps = state => ({
  isAuth: isUserAuth(state)
});

const Login = (props) => {

  const loginToSite = (formData) => {
    props.login(formData.emailField, formData.passwordField, 'true');
  }

  return (
    <div>
      {props.isAuth ?
        <Redirect to="/catalog" /> :
        <div className={styles.loginWrapper}>
          <div className={styles.useData}>Use 'admin@gmail.com' and 'admin0' to login</div>
          <LoginForm onSubmit={loginToSite} />
          <p>{props.error}</p>
        </div>}
    </div>


  )
}



export default connect(mapStateToProps, { login })(Login);