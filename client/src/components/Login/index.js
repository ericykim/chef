import React, { useState } from 'react';
import wretch from 'wretch';

import { Form, Icon, Checkbox, Card, Input, Button } from 'antd';
import styles from './styles.css';

const Login = ({ className, form }) => {
  const [error, setError] = useState(false);
  const { validateFields, getFieldDecorator } = form;

  const submit = (e) => {
    e.preventDefault();

    validateFields(async (err, values) => {
      if (!err) {
        await wretch('http://localhost:3000/auth/login')
          .post({
            handle: values.username,
            password: values.password,
          })
          .unauthorized(() => setError(true))
          .res(() => {
            setError(false);
          });
      }
    });
  };

  return (
    <div className={className}>
      <Card
        className={styles.card}
        title={'Log In'}
        extra={
          error && (
            <span className={styles.error}>Incorrect username or password</span>
          )
        }
      >
        <Form onSubmit={submit} className="loginForm">
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
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
                size={'large'}
              />,
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className={styles.loginFormForgot} href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card className={styles.card}>
        New to Chef? <a href="">Register now!</a>
      </Card>
    </div>
  );
};

export default Form.create({ name: 'normal_login' })(Login);
