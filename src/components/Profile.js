import React from 'react';
import styled from 'styled-components';
import ButtonAsLink from './ButtonAsLink';

import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { GET_PROFILE, IS_LOGGED_IN } from '../gql/query';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

//將筆記中繼資料樣式化
const Cotainer = styled.div`
    label,
    input {
        width: 100%;
        margin-bottom: 1em;
      }
`;

const Profile = ({ me }) => {
    const { loading, error, data, client } = useQuery(IS_LOGGED_IN);
    if (loading) return 'Loading...';
    if (error) return <p>Error! </p>;
    return ( 
       <Wrapper>
        {data.isLoggedIn ? (
            <p>
                <img
                    src={me.avatar}
                    alt={me.username}
                    height="50px"
                />  
                <Cotainer>
                    <label>Username:</label>
                    {me.username} 
                </Cotainer>
                <ButtonAsLink
                    onClick={() => {
                    // remove the token
                    localStorage.removeItem('token');
                    // clear the application's cache
                    client.resetStore();
                    // update local state
                    client.writeData({ data: { isLoggedIn: false } });
                    }}
                >
                    Logout
                </ButtonAsLink>
            </p>
                ) : (<p></p>)
        }


            
        </Wrapper>
    );
};

export default Profile;
