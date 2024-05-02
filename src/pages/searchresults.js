import React from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import { SearchByKeyword } from '../gql/query';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { keyword } = useParams();

  const { loading, error, data } = useQuery(SearchByKeyword, {
    variables: { keyword }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const notes = data && data.searchNotes;

  if (notes && notes.length !== 0) {
    return <NoteFeed notes={notes} />;
  } else {
    return <p>no matched notes found for "{keyword}"</p>;
  }
};

export default SearchResults;
