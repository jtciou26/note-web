import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import UserContent from '../components/UserContent';
import { Gravatar } from '../components/Misc';
import { Button, Card, Row } from 'antd';

const Account = () => {
  useEffect(() => {
    document.title = 'Account - Toegazer';
  });

  const { loading, error, data, client } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! User not found</p>;
  return (
    <>
      <Card
        style={{
          width: '500px',
          margin: '3% auto'
        }}
      >
        <UserContent />
        {data.isLoggedIn && (
          <Row justify="center">
            <Button
              size="large"
              onClick={() => {
                // remove the token
                localStorage.removeItem('token');
                // clear the application's cache
                client.resetStore();
                // update local state
                client.writeData({ data: { isLoggedIn: false } });
              }}
            >
              登出
            </Button>
          </Row>
        )}
      </Card>
      <Row justify="center">
        <Gravatar />
      </Row>
    </>
  );
};
export default Account;
