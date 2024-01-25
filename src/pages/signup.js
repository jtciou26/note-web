import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email:$email, username:$username, password:$password)
    }
`;

const SignUp = props => {

        useEffect(() => {
            document.tilte = 'Sign Up 註冊';
        
    });

    const client = useApolloClient();

    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //將JWT資料儲存權杖在localStorage中
            localStorage.setItem('token', data.signUp);
            //更新本機快取
            client.writeData({ data: { isLoggedIn: true } });
            //將使用者重新導向至首頁
            props.history.push('/');

        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
        {loading && <p>Loading...</p>}
        {error && <p>Error creating an account</p>}
        </React.Fragment>
    );
};

export default SignUp;

