import React, { useState } from 'react';
import styles from './styles.css';

import { Card } from 'antd';
import SignIn from '../../components/SignIn';
import Register from '../../components/Register';

/**
 * Authentication page that switches between signing into
 * or creating an account.
 */
const Authentication = () => {
  const [mode, setMode] = useState('login');
  const modes = {
    login: {
      $component: SignIn,
      prompt: (
        <span>
          New to Chef? <a onClick={() => setMode('register')}>Register now!</a>
        </span>
      ),
    },
    register: {
      $component: Register,
      prompt: (
        <span>
          Already have an account?{' '}
          <a onClick={() => setMode('login')}>Sign in!</a>
        </span>
      ),
    },
  };

  const { $component, prompt } = modes[mode];

  return (
    <div className={styles.page}>
      <div className={styles.authComponent}>
        <$component className={styles.card} />
        <Card className={styles.card}>{prompt}</Card>
      </div>
    </div>
  );
};

export default Authentication;
