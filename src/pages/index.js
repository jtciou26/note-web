import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';


//匯入版面元件
import Layout from '../components/Layout';

//匯入路徑
import Home from './home';
import SignUp from './signup';
import SignIn from './signin';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import NewNote from './new';
import EditNote from './edit';


const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
  `;


//定義路徑
const Pages = () => {
    return (
        <Router>
          <Layout>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/mynotes" component={MyNotes} />
            <PrivateRoute path="/favorites" component={Favorites} />
            <Route path="/note/:id" exact component={Note} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/new" component={NewNote} />
            <PrivateRoute path="/edit/:id" exact component={EditNote} />
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
