import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../gql/mutation';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
import { TrashCan } from './Icons/TrashCan';

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
        onCompleted: data => {
            props.history.push('/mynotes');
        }
    });
return <ButtonAsLink onClick={deleteNote} style={{color: 'lightgray'}}>刪除<TrashCan /></ButtonAsLink>

}

//要在不可路由元件中執行重新導向
export default withRouter(DeleteNote);
