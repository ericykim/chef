import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import SignIn from '../../components/SignIn';
import Register from '../../components/Register';
import styles from './styles.css';

/**
 * Authentication page that switches between signing into
 * or creating an account.
 *
 * Initial mode can be configured to either 'login' or 'register'.
 */
const Authentication = ({ mode = 'login' }) => {
  const modes = {
    login: {
      Component: SignIn,
      prompt: (
        <span>
          New to Chef? <Link to={'/register'}>Register now!</Link>
        </span>
      ),
    },
    register: {
      Component: Register,
      prompt: (
        <span>
          Already have an account? <Link to={'/login'}>Sign in!</Link>
        </span>
      ),
    },
  };

  const { Component, prompt } = modes[mode];

  return (
    <div className={styles.page}>
      <div className={styles.authComponent}>
        <Component className={styles.card} />
        <Card className={styles.card}>{prompt}</Card>
      </div>
    </div>
  );
};

export default Authentication;
