import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';

import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';


export const Heart = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox= '0 0 24 24'>
    <path d="M11.45,21.2a.71.71,0,0,1,.17-1l.41-.3.42.3a.72.72,0,0,1,.16,1,1.06,1.06,0,0,1-.15.15.72.72,0,0,1-.85,0c-4.35-3.15-6.54-5.18-8.27-8.17a8,8,0,0,1-.89-6.8,5.58,5.58,0,0,1,9.47-2l.06.07a5.82,5.82,0,0,1,6.35-1.54A6,6,0,0,1,21.94,8.3a9.59,9.59,0,0,1-2.11,6.29,30.14,30.14,0,0,1-7.37,6.77.74.74,0,0,1-.86,0A.75.75,0,0,1,11.45,21.2Zm7.23-7.45a8.24,8.24,0,0,0,1.84-5.39,4.61,4.61,0,0,0-2.68-4.14,4.3,4.3,0,0,0-4.78,1.2L12.58,6l-.52.62L11.51,6s-.48-.51-.6-.65l-.07-.08a4.16,4.16,0,0,0-7,1.56,6.57,6.57,0,0,0,.77,5.64C6.12,15.15,8.11,17,12,19.91A27.66,27.66,0,0,0,18.68,13.75Z" />
  </svg>
  );

  export const Star = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg"  width="21px" height="20px">
    <path d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855 l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z"/>
    </svg>
  );


const FavoriteNote = props => {
    //將筆記的最愛數儲存為狀態
    const [count, setCount] = useState(props.favoriteCount);
    // 將用戶是否把註記加入最愛儲存為狀態
    const [favorited, setFavorited ]= useState(
        //檢查筆記是否存在於用戶最愛清單中
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{ query: GET_MY_FAVORITES}]
    });

    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(false);
                        setCount(count -1);
                    }}
                    >
                        <Heart></Heart>
                    </ButtonAsLink>
            ) : (
                <ButtonAsLink
                onClick={() => {
                    toggleFavorite();
                    setFavorited(true);
                    setCount(count +1)
                }}
                > 
                    <Star></Star>
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>
    );
};

//要在不可路由元件中執行重新導向
export default FavoriteNote;