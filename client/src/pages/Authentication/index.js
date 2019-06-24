import React from 'react';
import styles from './styles.css';

import Login from '../../components/Login';

const Authentication = (props) => {
  return (
    <div className={styles.page}>
      <Login className={styles.login} />
    </div>
  );
};

export default Authentication;
