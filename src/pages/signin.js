import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
  useEffect(() => {
    document.tilte = 'Sign In - Toegazer';
  });

  const client = useApolloClient();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      //將JWT資料儲存權杖在localStorage中
      localStorage.setItem('token', data.signIn);
      //更新本機快取
      client.writeData({ data: { isLoggedIn: true } });
      //將使用者重新導向至首頁
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
