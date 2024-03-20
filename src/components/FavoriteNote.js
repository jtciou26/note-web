import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';

import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const FavoriteNote = props => {
  //將筆記的最愛數儲存為狀態
  const [count, setCount] = useState(props.favoriteCount);
  // 將用戶是否把註記加入最愛儲存為狀態
  const [favorited, setFavorited] = useState(
    //檢查筆記是否存在於用戶最愛清單中
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  return (
    <>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          <HeartFilled style={{ color: '#FC5983' }} />
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          <HeartOutlined style={{ color: '#848484' }} />
        </ButtonAsLink>
      )}
      : {count}
    </>
  );
};

//要在不可路由元件中執行重新導向
export default FavoriteNote;
