import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import UserContent from '../components/UserContent';
import { Gravatar } from '../components/Misc';
import { Button, Row } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Drawn = styled.div`
  --radius-drawn: 250px 25px 15px 20px / 15px 80px 105px 115px;
  border-radius: var(--radius-drawn);
  border: 2px solid #f5f4f0;
  margin: 5% auto;
  padding: 20px;
`;

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
    <Wrapper>
      <Drawn>
        <UserContent />
      </Drawn>

      <Row justify="center">
        <Gravatar />
      </Row>
      <Row justify="center">
        {data.isLoggedIn && (
          <Button
            size="large"
            onClick={handleLogout}
            style={{ margin: '30px' }}
          >
            登出
          </Button>
        )}
      </Row>
    </Wrapper>
  );
};
export default Account;
