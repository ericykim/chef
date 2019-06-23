import React, { useState } from 'react';
import styles from './styles.css';

import { Card } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

const Login = (props) => {
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <Card className={styles.card} title="Login" bordered={true}>
          <Input
            className={styles.spaced}
            placeholder="Username or email address"
            size={'large'}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />

          <Input.Password
            className={styles.spaced}
            placeholder="Password"
            size={'large'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.spaced}>
            <Button className={styles.login} type="primary">
              Login
            </Button>

            <Button className={styles.forgotPassword} type="link">
              Forgot your password?
            </Button>
          </div>
        </Card>
        <Card className={styles.card} bordered={true}>
          New to Chef?<Button type="link">Create an account.</Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;
