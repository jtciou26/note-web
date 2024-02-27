import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Form, Input, Row } from 'antd';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
`;

const NoteForm = props => {
  const [form] = Form.useForm();
  const [value, setValue] = useState({ content: '' });

  useEffect(() => {
    if (props.content) {
      setValue({ content: props.content });
    }
  }, [props.content]);

  const onFinish = values => {
    props.action({
      variables: {
        ...values
      }
    });
  };

  return (
    <Wrapper>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ content: props.content }}
      >
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: 'Please enter your note content!'
            }
          ]}
        >
          <Input.TextArea
            required
            name="content"
            placeholder="隨手記些東西"
            style={{ height: '75vh', overflow: 'auto' }}
          />
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

export default NoteForm;
