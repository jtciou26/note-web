import React from 'react';
import styled from 'styled-components';
import NoteUser from './NoteUser';
import NoteContent from './NoteContent';

import { format } from 'date-fns';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import { Avatar } from 'antd';

//防止筆記寬度超過800
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
`;

//將筆記中繼資料樣式化
const MetaData = styled.div`
  @media (min-width: 370px) {
    display: flex;
    align-items: top;
  }
`;

//在頭像與中繼資料之間增加一些空間
const MetaInfo = styled.div`
  padding-right: 1em;
`;

//在大型螢幕將UserAction向右對齊
const UserActions = styled.div`
  margin-left: auto;
`;

const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return 'Loading...';
  if (error) return <p>Error! </p>;
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <Avatar
            src={note.author.avatar}
            alt={note.author.username}
            shape="square"
            size="large"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(note.createdAt, 'YYYY-MMM-DD')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <NoteContent content={note.content} />
    </StyledNote>
  );
};

export default Note;
