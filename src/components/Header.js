import React from 'react';
import styled from 'styled-components';
import logo from '../img/miffy.png';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';
import { EditPen } from './Icons/EditPen';

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;   
`;

const LogoText = styled.h1`
    margin-left: 10px;
    padding: 0;
    display: inline;
`;

const UserState = styled.div`
    margin-left: auto;
    `;

const Header = props => {
    //使用者已登入狀態的查詢勾點 包括參考Apollo的用庫端
    const { data, client } = useQuery(IS_LOGGED_IN);
    
    return (
        <HeaderBar>
            <Link to="/">
                <img src={logo} alt="Notedly Logo" height="45" />
            </Link>
            <LogoText>隨手記</LogoText>
            
            <UserState>
                {data.isLoggedIn ? (
                    [
                    <ButtonAsLink
                    onClick={() => {
                      // remove the token
                      localStorage.removeItem('token');
                      // clear the application's cache
                      client.resetStore();
                      // update local state
                      client.writeData({ data: { isLoggedIn: false } });
                      // redirect the user to the homepage
                      props.history.push('/');
                    }}
                  >
                    logout 
                    </ButtonAsLink>,
                    ' ',
                    <Link to='/video'>Video</Link>,
                    ' ',
                    <Link to='/new'>新筆記<EditPen /></Link>
                    ]   
                    ) : (
                    <p>
                        <Link to={'/signin'}>Sign In</Link> or{' '}
                        <Link to={'/signup'}>Sign Up</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    );
};

//若要在本身無法直接路由的元件加上路由、需要將元件包在 withRouter 高階元件中
export default withRouter(Header);