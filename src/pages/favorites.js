import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites - Toegazer';
  });
// abc
  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  if (loading) return 'Loading...';
  if (error) return `Error! $ {error.message}`;

  const filteredNotes = data.me.favorites.filter(note => !note.isRemoved);

  if (filteredNotes.length !== 0) {
    return <NoteFeed notes={filteredNotes} />;
  } else {
    return <p>no favorites yet</p>;
  }
};

export default Favorites;
