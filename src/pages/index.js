import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
  Switch
} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';

//匯入版面元件
import Layout from '../components/Layout';

//匯入路徑
import Home from './home';
import SignUp from './signup';
import SignIn from './signin';
import Account from './account';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './notepage';
import NewNote from './new';
import EditNote from './edit';
import Video from './video';
import Preview from './preview';
import Test from './test';
import SearchResults from './searchresults';

//定義路徑
const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route exact path="/note/:id" component={NotePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/video" component={Video} />
        <Route path="/preview" component={Preview} />
        <Route path="/test" component={Test} />
        <Switch>
          <Route path="/searchresults/:keyword" component={SearchResults} />
        </Switch>
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/account" component={Account} />
        <PrivateRoute exact path="/edit/:id" component={EditNote} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;
