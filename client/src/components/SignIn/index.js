import React, { useState } from 'react';
import wretch from 'wretch';
import { Form, Icon, Checkbox, Card, Input, Button } from 'antd';

import api from '../../constants';
import styles from './styles.css';

/**
 * Sign in widget for authentication.
 */
const SignIn = ({ className, form }) => {
  const [error, setError] = useState('');
  const { validateFields, getFieldDecorator } = form;

  const submit = (e) => {
    e.preventDefault();

    validateFields(async (err, values) => {
      if (!err) {
        await wretch(api.LOGIN)
          .post({
            handle: values.username,
            password: values.password,
          })
          .unauthorized(() => setError('Incorrect username or password'))
          .res(() => setError(''))
          .catch(() => setError('Something went wrong'));
      }
    });
  };

  return (
    <Card
      className={className}
      title={'Sign In'}
      extra={error && <span className={styles.error}>{error}</span>}
      data-testid={'SignIn'}
    >
      <Form onSubmit={submit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Username or email address is required',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username or email address"
              size={'large'}
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              size={'large'}
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className={styles.forgot} href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.signIn}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create()(SignIn);
