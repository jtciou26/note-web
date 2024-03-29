import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';
import FloatMenu from './FloatMenu';

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 64px);
  width: 100%;
  padding: 1em;
  overflow-y: auto;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    width: calc(100% - 220px);
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
        <FloatMenu />
      </Wrapper>
    </>
  );
};

export default Layout;
