import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({title}) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="隨手記" />
    <meta property="og:description" content="寫點筆記"/>
    <meta property="og:url" content="https://toegazer.onrender.com" />
    <meta property="og:image" content="https://github.com/jtciou26/note-web/blob/master/src/img/miffy-large.png?raw=true"/>
  </Helmet>
);

export default SEO;