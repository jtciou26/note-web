import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages/index';
import { IS_LOGGED_IN } from './gql/query';

//配置API URI快取
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//檢查是否有權杖 並將標頭回傳至context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

//建立 apollo用戶端
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

//檢查是否有本機權杖 現在可以使用@client指示、在程式任何位置以GraphQL查詢的形式存取isLoggedIn
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};
//在初始載入時間寫入快取資料
client.writeQuery({
  query: IS_LOGGED_IN,
  data
});
// 在重設快取後寫入快取資料
client.onResetStore(() => {
  client.writeQuery({
    query: IS_LOGGED_IN,
    data
  });
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// index.html -> App.js -> Pages (/pages/index.js) => home, etc..
