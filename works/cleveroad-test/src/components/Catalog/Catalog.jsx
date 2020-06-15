import React from 'react';
import styles from './Catalog.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserAuth } from '../../selectors/auth-selectors';

const Catalog = (props) => {

  const goToEditing = (id) => {
    props.setEditableGood(props.goods[id]);
  }

  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.catalog}>
        {

          props.goods.map(g =>
            g === null ? undefined : <div className={styles.catalogItem} key={g.id}>

              <div className={styles.catalogItem_img}>
                <img src={g.photo} alt="good-image" />
              </div>

              <div className={styles.catalogItem_data}>
                <p>{g.heading}</p>

                <p>{g.description}</p>

                <p>
                  <span>
                    {g.price.discount
                      ? Number(g.price.initialPrice - (g.price.initialPrice * g.price.discount / 100)).toFixed(2)
                      : Number(g.price.initialPrice).toFixed(2)}$</span>
                  <span>
                    {g.price.discount ? ` (with discount -${g.price.discount}%)` : null}
                  </span>
                </p>

                <p>
                  <span>{g.price.discountEndDate ? 'Discount expires: ' : null}</span>
                  <span>{g.price.discountEndDate ? g.price.discountEndDate.split('T')[0] : null}</span>
                </p>
              </div>

              {props.isUserAuth && <div className={styles.catalogItem_manage}>
                <NavLink to='/editing' className={styles.editBtn} onClick={() => { goToEditing(g.id) }}>Edit</NavLink>
                <button className={styles.deleteBtn} onClick={() => {
                  props.deleteCatalogProduct(g.id)
                }}>Delete</button>
              </div>}
            </div>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isUserAuth: isUserAuth(state)
});

export default connect(mapStateToProps, {})(Catalog);