import React from 'react';
import styled from 'styled-components';
import logo from '../img/miffy.png';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';

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
            <img src={logo} alt="Notedly Logo" height="45" />
            <LogoText>隨手記</LogoText>
            {/* 若已登入則顯示登出連結 */}
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink
                        onClick={() => {
                            localStorage.removeItem('token');
                            client.resetStore();
                            client.writeData({ data: { isLoggedIn: false } });
                            props.history.push('/signin');
                        }}
                    >
                        登出
                    </ButtonAsLink>
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