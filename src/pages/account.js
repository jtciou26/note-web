import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import Profile from '../components/Profile';
import { Button, Flex } from 'antd';

const Account = () => {
  useEffect(() => {
    document.title = 'Account';
  });

  const { loading, error, data, client } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! User not found</p>;
  return (
    <React.Fragment>
      <Profile />
      {data.isLoggedIn && (
        <Flex align="center" justify="center">
          <Button
            size="large"
            onClick={() => {
              // remove the token
              localStorage.removeItem('token');
              // clear the application's cache
              client.resetStore();
              // update local state
              client.writeQuery({
                query: gql`
                  query IsLoggedIn {
                    isLoggedIn @client
                  }
                `,
                data: { isLoggedIn: false }
              });
            }}
          >
            登出
          </Button>
        </Flex>
      )}
    </React.Fragment>
  );
};
export default Account;
