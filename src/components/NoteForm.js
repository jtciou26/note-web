import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MD } from '../components/Misc';
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
    props.action(values.content); // Pass the content directly
  };

  return (
    <Wrapper>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ content: props.content }}
      >
        <Form.Item name="content">
          <Input.TextArea
            required
            placeholder="隨手記些東西"
            style={{ height: '60vh', overflow: 'auto' }}
          />
        </Form.Item>

        <Row justify="space-around">
          <MD />
          <Button size="large" htmlType="submit">
            儲存
          </Button>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default NoteForm;
