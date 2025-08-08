import React from 'react';
import styles from './loader.module.css';
import PropTypes from 'prop-types';
const Loader = ({ show }) => {
  if (!show) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>Loading...</p>
    </div>
  );
};
Loader.propTypes = {
  show: PropTypes.bool.isRequired
}
export default Loader;
