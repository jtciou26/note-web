import React from "react";
import { useQuery, gql } from "@apollo/client";

import Note from "../components/Note";
import { GET_NOTE } from '../gql/query';


//將屬性props物件傳遞至元件 動態查詢
const NotePage = props => {
    // 將在 url 中找到的id儲存為變數
        const id = props.match.params.id;
    //查詢hook 以變數形式傳遞id值
        const { loading, error, data } = useQuery(GET_NOTE, { variables: {id} });

        if (loading) return <p> Loading... </p>
        if (error) return <p> ERROR! note not found... </p>
    //若資料成功、則在 UI 中顯示資料
        return <Note note={data.note} />;
};

export default NotePage;