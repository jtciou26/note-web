import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav =  styled.nav`
    padding: 1em;
    background: #f5f4f0;

    @media (max-width: 700px) {
        padding-top: 64px; 
        height: 0px;
    }

    @media (min-width: 700px) {
        position: fixed;
        width: 220px;
        height: calc(100% - 64px);
        overflow-y: auto;
    }
`;

const NavList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 2;
/* 樣式巢狀化 */
    a {
        tex-decoration: none;
        font-weight: bold;
        font-size: 1.1em;
        color: #333;
    }

    a.visited {
        color: #333;
    }

    a.hover,
    a.focus {
        color: #0077cc;
    }

    @media (max-width: 700px) {
        visibility: hidden; 
`;

const Navigation = () => {
    return (
        <Nav>
            <NavList>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/mynotes">My Notes</Link>
                </li>
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                    <Link to="/new">New Note</Link>
                </li>
            </NavList>
        </Nav>
    );
};

export default Navigation;