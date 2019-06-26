import React, { useState } from 'react';
import wretch from 'wretch';

import { Form, Icon, Checkbox, Card, Input, Button } from 'antd';
import styles from './styles.css';

/**
 * Register widget for creating a new account.
 */
const Register = ({ className, form }) => {
  const [error, setError] = useState('');
  const { validateFields, getFieldDecorator } = form;

  const register = (e) => {
    e.preventDefault();

    validateFields(async (err, values) => {
      if (!err) {
        await wretch('http://localhost:3000/auth/register')
          .post(values)
          .error(409, (error) => setError('Username or email is taken'))
          .res(() => setError(''))
          .catch(() => setError('Something went wrong'));
      }
    });
  };

  const comparePasswords = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  };

  return (
    <Card
      className={className}
      title={'Create Account'}
      extra={<span className={styles.error}>{error}</span>}
      data-testid={'Register'}
    >
      <Form onSubmit={register}>
        <div className={styles.names}>
          <div className={styles.firstName}>
            <Form.Item>
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'First name is required',
                  },
                ],
              })(<Input placeholder="First name" size={'large'} />)}
            </Form.Item>
          </div>

          <div className={styles.lastName}>
            <Form.Item>
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Last name is required',
                  },
                ],
              })(
                <Input
                  className={styles.lastName}
                  placeholder="Last name"
                  size={'large'}
                />,
              )}
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Email address is required',
              },
              {
                type: 'email',
                message: 'Invalid email address',
              },
            ],
          })(<Input placeholder="Email address" size={'large'} />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Username is required',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
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
          {getFieldDecorator('confirmPassword', {
            rules: [
              { required: true, message: 'Confirm your password' },
              { validator: comparePasswords },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
              size={'large'}
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.register}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create()(Register);
