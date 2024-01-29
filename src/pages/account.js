import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import Profile from '../components/Profile';
import Button from '../components/Button';

const Account = () => {
    useEffect(() => {
        document.title = 'Account';
    });

    const { loading, error, data, client } = useQuery(IS_LOGGED_IN);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! User not found</p>;
    return (
        <React.Fragment>
            <Profile/>
            {data.isLoggedIn ? (
                <Button
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
                </Button>
                ) : <p></p>
            }   
        </React.Fragment>
    );
};
export default Account;

