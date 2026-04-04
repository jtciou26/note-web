import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';
import { message } from 'antd';

const EditNote = props => {
  useEffect(() => {
    document.title = 'Edit Note - Toegazer';
  });

  // 將在 url 找到的id儲存為變數
  const id = props.match.params.id;
  // 定義註記查詢
  const { loading, error, data, refetch } = useQuery(GET_NOTE, {
    variables: { id }
  });
  const { data: userdata } = useQuery(GET_ME);
  //square brackets are used to extract the first item of an array returned by the useMutation hook.
  const [editNote] = useMutation(EDIT_NOTE, {
    onCompleted: () => {
      props.history.push(`/note/${id}`);
      message.success('儲存成功');
    }
  });

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const handleEditNote = content => {
    editNote({ variables: { id, content: content } });
  };

  if (loading) return 'Loading...';
  if (error) return <p>Error! Note not found</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>it's not yours.</p>;
  }
  //將資料和變動傳遞至表單元件
  return <NoteForm content={data.note.content} action={handleEditNote} />;
};

export default EditNote;
