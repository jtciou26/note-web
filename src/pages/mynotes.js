import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_NOTES } from '../gql/query';
import { Button, Row, Skeleton } from 'antd';
import NoteFeed from '../components/NoteFeed';

const MyNotes = () => {
  useEffect(() => {
    document.title = 'My Notes - Toegazer';
  });

  const { loading, error, data, fetchMore } = useQuery(GET_MY_NOTES, {
    variables: { cursor: null }
  });

  const [notes, setNotes] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    if (data) {
      fetchNotes();
    }
  }, [data]);

  const fetchNotes = () => {
    if (data && data.me && data.me.notes) {
      const filteredNotes = data.me.notes.notes.filter(note => !note.isRemoved);
      setNotes(filteredNotes);
      setCursor(data.me.notes.cursor);
    }
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        cursor: cursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          me: {
            ...previousResult.me,
            notes: {
              cursor: fetchMoreResult.me.notes.cursor,
              hasNextPage: fetchMoreResult.me.notes.hasNextPage,
              notes: [
                ...previousResult.me.notes.notes,
                ...fetchMoreResult.me.notes.notes
              ],
              __typename: 'NotesFeed'
            }
          }
        };
      }
    });
  };

  if (loading) return 'Loading...';
  if (error || !data || !data.me || !data.me.notes) {
    return <p>Error!</p>;
  }

  return (
    <>
      {notes.length === 0 ? <p>No notes yet.</p> : <NoteFeed notes={notes} />}
      {data.me.notes.hasNextPage && (
        <Row justify="center">
          <Button size="large" onClick={handleLoadMore}>
            Load More
          </Button>
        </Row>
      )}
    </>
  );
};

export default MyNotes;
