import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';

import { GET_ME } from '../gql/query';
import { Avatar, Skeleton, Typography } from 'antd';
import { UPDATE_USERNAME } from '../gql/mutation';

const { Paragraph, Text } = Typography;

const Profile = () => {
  const { loading, error, data } = useQuery(GET_ME);

  const [updateUsername] = useMutation(UPDATE_USERNAME, {
    refetchQueries: [{ query: GET_ME }]
  });

  const handleUsernameChange = async newUsername => {
    try {
      await updateUsername({
        variables: { id: data.me.id, username: newUsername }
      });
    } catch (error) {
      console.error('Error updating username:', error.message);
    }
  };

  if (loading) return <Skeleton loading={loading} avatar active />;
  if (error) return <p>Error! User not found </p>;

  return (
    <>
      <Avatar
        src={data.me.avatar}
        alt={data.me.username}
        shape="square"
        size="large"
      />
      <p></p>
      <Paragraph>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          暱&emsp;&emsp;稱
        </Text>
        <Text
          style={{
            fontSize: '16px',
            marginLeft: '30px',
            display: 'inline-block'
          }}
          editable={{
            onChange: handleUsernameChange
          }}
          ellipsis={true}
        >
          {data.me.username}
        </Text>
      </Paragraph>
      <Paragraph>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          信&emsp;&emsp;箱
        </Text>
        <Text style={{ fontSize: '16px', marginLeft: '30px' }}>
          {data.me.email}
        </Text>
      </Paragraph>
      <Paragraph>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          註冊時間
        </Text>
        <Text style={{ fontSize: '16px', marginLeft: '30px' }}>
          {format(data.me.createdAt, 'YYYY-MMM-DD')}
        </Text>
      </Paragraph>
    </>
  );
};

export default Profile;
