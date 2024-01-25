import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_PROFILE } from '../gql/query';
import Profile from '../components/Profile';



const Account = ({me}) => {

        useEffect(() => {
            document.tilte = 'Account 帳號';
        
    });

    const { loading, error, data } = useQuery(GET_PROFILE);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! User not found</p>;
    return <Profile me={data.me} />
};


export default Account;

