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

  const handleLogout = () => {
    localStorage.removeItem('token');

    // Update cache to set isLoggedIn to false
    const logout = {
      isLoggedIn: false
    };

    client.writeQuery({
      query: IS_LOGGED_IN,
      data: logout
    });

    client.resetStore();
  };

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
            <Button size="large" onClick={handleLogout}>
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
