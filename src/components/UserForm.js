//註冊登入頁
import React from 'react';
import styled from 'styled-components';

import { Button, Flex, Form, Input } from 'antd';

const Wrapper = styled.div`
  max-width: 600px;
  border: 1px sold #f5f4f0;
  padding: 1em;
  margin: 0 auto;
`;

const UserForm = props => {
  const [form] = Form.useForm(); // Use Form hook
  const onFinish = values => {
    props.action({
      variables: {
        ...values
      }
    });
  };

  return (
    <Wrapper>
      <Flex align="center" justify="center">
        {props.formType === 'signup' ? <h2>註冊</h2> : <h2>登入</h2>}
      </Flex>
      <Form
        name="basic"
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 800
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        {props.formType === 'signup' && (
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Flex align="center" justify="center">
          <Button htmlType="submit" size="large">
            送出
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
