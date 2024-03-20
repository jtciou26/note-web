import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_NOTES } from '../gql/query';
import { Button, Row, Skeleton } from 'antd';
import NoteFeed from '../components/NoteFeed';

const Home = () => {
  useEffect(() => {
    document.title = 'Home - Toegazer';
  });
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    if (data) {
      fetchNotes();
    }
  }, [data]);

  const fetchNotes = () => {
    if (data && data.noteFeed) {
      const filteredNotes = data.noteFeed.notes.filter(note => !note.isRemoved);
      setNotes(filteredNotes);
      setCursor(data.noteFeed.cursor);
    }
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        cursor: cursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          noteFeed: {
            cursor: fetchMoreResult.noteFeed.cursor,
            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
            notes: [
              ...previousResult.noteFeed.notes,
              ...fetchMoreResult.noteFeed.notes
            ],
            __typename: 'noteFeed'
          }
        };
      }
    });
  };

  if (loading)
    return (
      <Skeleton
        loading={loading}
        active
        avatar
        style={{ maxWidth: '800px', margin: '0 auto' }}
        paragraph={{ rows: 10 }}
      />
    );
  if (error || !data || !data.noteFeed) return <p>Error!</p>;

  return (
    <>
      {notes.length === 0 ? <p>No notes yet.</p> : <NoteFeed notes={notes} />}
      {/* 僅在 hasNextPage = true 的情況下顯示 laod more 按鈕 */}
      {data.noteFeed.hasNextPage && (
        <Row justify="center">
          {/*  onClick 執行查詢 以變數形式傳遞目前游標 */}
          <Button size="large" onClick={handleLoadMore}>
            Load More
          </Button>
        </Row>
      )}
    </>
  );
};

export default Home;
