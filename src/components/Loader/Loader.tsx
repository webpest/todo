import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC<{}> = () => (
  <div className={styles.overlay} title="loader">
    <div className={styles.loader} />
  </div>
);

export default Loader;
