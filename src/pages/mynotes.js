import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
  useEffect(() => {
    document.title = 'My Notes - Toegazer';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) return 'Loading...';
  if (error) return `Error! $ {error.message}`;

  const filteredNotes = data.me.notes.filter(note => !note.isRemoved);

  if (filteredNotes.length !== 0) {
    return <NoteFeed notes={filteredNotes} />;
  } else {
    return <p>no note yet</p>;
  }
};

export default MyNotes;
