import React, {useEffect} from 'react';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;


const NewNote = props => {
    useEffect(() => {
        document.title = 'New Note';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        //重新擷取 GET_NOTES查詢以更新快取
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => { 
            //完成時 將用戶導向筆記頁面
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading notes...</p>}
            {error && <p>Error saving the note</p>}
            <NoteForm action={data} />
        </React.Fragment>
    )
};

export default NewNote;