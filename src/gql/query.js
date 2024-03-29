import { gql } from '@apollo/client';

const GET_NOTES = gql`
    query noteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                isRemoved
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const GET_NOTE = gql`
query note($id: ID!) {
    note(id: $id) {
        id
        createdAt
        content
        favoriteCount
        author {
            username
            id
            avatar
        }
    }
}
`;

const GET_MY_NOTES = gql`
  query me {
    me {
     id
     username
     notes {
      id
      content
      createdAt
      favoriteCount
      isRemoved
      author {
        username
        id
        avatar
      }
    }
  }
} 
`;

const GET_MY_FAVORITES = gql`
  query me {
    me {
     id
     username
     favorites {
      id
      content
      createdAt
      favoriteCount
      isRemoved
      author {
        username
        id
        avatar
      }
    }
  }
} 
`;

const GET_ME = gql`
    query me {
        me {
            id
            username
            favorites {
                id
            }
        }
    }
`;

const GET_PROFILE = gql`
    query me {
      me {
          id
          username
          avatar
          email
          createdAt
      }
  }
`;

const IS_LOGGED_IN = gql`
 {
    isLoggedIn @client
 }
`;

export { 
    GET_NOTE, 
    GET_NOTES, 
    GET_MY_NOTES, 
    GET_MY_FAVORITES, 
    GET_ME,
    GET_PROFILE,
    IS_LOGGED_IN
};