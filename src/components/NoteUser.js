import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';
import { EditPen } from './Icons/EditPen';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    if (loading) return 'Loading...';
    if (error) return <p>Error! </p>;
    return (
        <React.Fragment>
            <FavoriteNote
                me= {data.me}
                noteId= {props.note.id}
                favoriteCount= {props.note.favoriteCount} 
                />
                {'  '}
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <DeleteNote noteId={props.note.id} />{' '}
                    <Link to={`/edit/${props.note.id}`}>編輯<EditPen /></Link>
        
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default NoteUser;