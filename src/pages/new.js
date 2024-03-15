import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';
import NoteForm from '../components/NoteForm';
import { message } from 'antd';

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note - Toegazer';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    //重新擷取 GET_NOTES查詢以更新快取
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      //完成時 將用戶導向筆記頁面
      props.history.push(`note/${data.newNote.id}`);
      message.success('儲存成功');
    }
  });

  return (
    <React.Fragment>
      {loading && <p>Loading notes...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
