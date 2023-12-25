import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({title}) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="寫筆記的地方" />
    <meta property="og:description" content="寫點筆記"/>
    <meta property="og:url" content="https://toegazer.onrender.com" />
    <meta property="og:image" content="https://toegazer.onrender.com/miffy-large.8dbadafb.png"/>
  </Helmet>
);

export default SEO;