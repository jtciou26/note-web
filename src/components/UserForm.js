//註冊登入頁
import React from 'react';
import styled from 'styled-components';

import { Button, Form, Input, Row } from 'antd';

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
      <Row justify="center">
        {props.formType === 'signup' ? <h2>註冊</h2> : <h2>登入</h2>}
      </Row>
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
            label="暱稱"
            name="username"
            validateTrigger="onBlur"
            rules={[
              {
                max: 30,
                required: true,
                message: '暱稱為必填且不超過30個字元'
              }
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
              type: 'email'
            }
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
              message: '密碼為必填'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row justify="center">
          <Button size="large" htmlType="submit">
            儲存
          </Button>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
