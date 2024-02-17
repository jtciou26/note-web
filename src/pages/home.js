import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTES } from '../gql/query';
import { Button, Flex } from 'antd';
import NoteFeed from '../components/NoteFeed';

const Home = () => {
  useEffect(() => {
    document.title = 'Home - Notedly';
  });
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const filteredNotes = data.noteFeed.notes.filter(note => !note.isRemoved);

  return (
    //新增 react fragment 元素以提供父元素
    <React.Fragment>
      <NoteFeed notes={filteredNotes} />
      {/* 僅在 hasNextPage = true 的情況下顯示 laod more 按鈕 */}
      {data.noteFeed.hasNextPage && (
        // onClick 執行查詢 以變數形式傳遞目前游標
        <Flex align="center" justify="center">
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
        </Flex>
      )}
    </React.Fragment>
  );
};

export default Home;
