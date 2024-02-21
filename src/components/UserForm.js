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

const UserForm = (props) => {
  const [form] = Form.useForm(); // Use Form hook
  const onFinish = (values) => {
    props.action({
      variables: {
        ...values,
      },
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
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        {props.formType === 'signup' && (
          <Form.Item
            label="暱稱"
            name="username"
            validateTrigger="onBlur"
            rules={[
              {
                max: 30,
                required: true,
                message: '暱稱為必填且不超過30個字元',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="信箱"
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: '請填寫正確信箱',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密碼"
          name="password"
          rules={[
            {
              required: true,
              message: '密碼為必填',
            },
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
