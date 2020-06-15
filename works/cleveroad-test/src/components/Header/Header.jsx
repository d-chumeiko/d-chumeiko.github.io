import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {isUserAuth, getUserName} from '../../selectors/auth-selectors';
import {logout} from '../../reducers/auth-reducer'

const Header = (props) => {

  const logoutHandler = () => {
    props.logout(null, false)
  }

  return (
    <header className={styles.header}>
      
      <div className={styles.headerLeft}>
      <NavLink className={styles.headerBtn} to='/catalog'>Catalog</NavLink>
      {props.isUserAuth && <NavLink className={styles.headerBtn} to='/adding'>Add new good</NavLink>}
      </div>

      <div className={styles.headerRight}>
      
      {!props.isUserAuth ?
      <NavLink to="/login" className={`${styles.headerBtn} ${styles.headerLoginBtn}`}>Login</NavLink> :
      <div>
        <span className={styles.helloUser}>Hi, {props.userName}</span>
        <button onClick={logoutHandler} className={`${styles.headerBtn} ${styles.headerLogoutBtn}`}>Logout</button>
      </div>
      }
      

      
      </div>

    </header>
  )
}

const mapStateToProps = state => ({
  isUserAuth: isUserAuth(state),
  userName: getUserName(state)
});

export default connect(mapStateToProps, {logout})(Header);