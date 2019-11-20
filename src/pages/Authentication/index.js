import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import SignIn from '../../components/SignIn';
import Register from '../../components/Register';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * Authentication page that switches between signing into
 * or creating an account.
 *
 * Initial mode can be configured to either 'login' or 'register'.
 */
const Authentication = ({ mode = 'Login', setDocumentTitle }) => {
  const modes = {
    Login: {
      Component: SignIn,
    },
    Register: {
      Component: Register,
      prompt: (
        <span>
          Already have an account? <Link to={'/login'}>Sign in!</Link>
        </span>
      ),
    },
  };

  useEffect(() => {
    setDocumentTitle(mode);
  });

  const { Component, prompt } = modes[mode];

  return (
    <div className={styles.page}>
      <div className={styles.authComponent}>
        <Component className={styles.card} />
      </div>
    </div>
  );
};

export default asPage(Authentication, null);
