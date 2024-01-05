import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';

import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

import { Heart } from './Icons/Heart';
import { HeartFilled } from './Icons/HeartFilled';

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
                        <HeartFilled />
                    </ButtonAsLink>
            ) : (
                <ButtonAsLink
                onClick={() => {
                    toggleFavorite();
                    setFavorited(true);
                    setCount(count +1)
                }}
                > 
                    <Heart />
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>
    );
};

//要在不可路由元件中執行重新導向
export default FavoriteNote;