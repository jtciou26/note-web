import React from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import { format } from 'date-fns';

import { GET_PROFILE } from '../gql/query';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  border-radius: 10px;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Feild = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
        &:not(:first-child) {
    margin-top: 8px;
    }
`;

const Label = styled.label`
    max-width: 220px;
    color: darkGray;
`;

const Input = styled.div`
    width: 70%;
    margin-left: 20px;
    min-height: 24px;
`;

const Profile = ({ me }) => {
    const { loading, error, data } = useQuery(GET_PROFILE);
    if (loading) return 'Loading...';
    if (error) return <p>Error! </p>;
    return ( 
       <Wrapper>
            <Feild>
                <img
                    src={data.me.avatar}
                    alt={data.me.username}
                    height="50px"
                />  
            </Feild>
            <Feild>
                <Label>暱&emsp;&emsp;稱</Label>{' '}
                <Input>{data.me.username} </Input>
            </Feild>    
            <Feild>
                <Label>信&emsp;&emsp;箱</Label>{' '}
                <Input>{data.me.email} </Input>
            </Feild>
            <Feild>    
                <Label>註冊時間</Label>{' '}
                <Input>{format(data.me.createdAt, 'YYYY-MMM-DD')}</Input>
            </Feild>
        </Wrapper>
    );
};

export default Profile;
