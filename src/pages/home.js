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

  useEffect(() => {
    if (data) {
      fetchNotes();
    }
  }, [data]);

  const fetchNotes = () => {
    if (data && data.noteFeed) {
      const filteredNotes = data.noteFeed.notes.filter(note => !note.isRemoved);
      setNotes(filteredNotes);
    }
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
    //新增 react fragment 元素以提供父元素
    <>
      {notes.length > 0 ? (
        <>
          <NoteFeed notes={notes} />
          {/* 僅在 hasNextPage = true 的情況下顯示 laod more 按鈕 */}
          {data.noteFeed.hasNextPage && (
            // onClick 執行查詢 以變數形式傳遞目前游標
            <Row justify="center">
              <Button
                size="large"
                onClick={() =>
                  fetchMore({
                    variables: {
                      cursor: data.noteFeed.cursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      return {
                        noteFeed: {
                          cursor: fetchMoreResult.noteFeed.cursor,
                          hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                          //將新舊結果合併
                          notes: [
                            ...previousResult.noteFeed.notes,
                            ...fetchMoreResult.noteFeed.notes
                          ],
                          __typename: 'noteFeed'
                        }
                      };
                    }
                  })
                }
              >
                Load more
              </Button>
            </Row>
          )}
        </>
      ) : (
        <p> No notes available</p>
      )}
      ;
    </>
  );
};
export default Home;
