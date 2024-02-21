import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../gql/mutation';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

const DeleteNote = (props) => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: (data) => {
      props.history.push('/mynotes');
      message.success('刪除成功');
    },
  });
  return (
    <Popconfirm
      title="確定刪除筆記嗎"
      onConfirm={deleteNote}
      okText="確定"
      cancelText="取消"
    >
      <ButtonAsLink style={{ color: 'lightgray' }}>
        <DeleteOutlined />
        刪除
      </ButtonAsLink>
    </Popconfirm>
  );
};

//要在不可路由元件中執行重新導向
export default withRouter(DeleteNote);
