import React from 'react';
import styled from 'styled-components';

const StyledIframeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 56.25%; 
`;
/* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 10px;
`;

export default function RwdYoutube({ src }) {
    return (
        <StyledIframeContainer>
            <StyledIframe
                src={src} allow="fullscreen;"
            />
        </StyledIframeContainer>
    )
}



