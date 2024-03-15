import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      _id
      postBody
      postTitle
      createdAt
      username
      comments {
        commentBody
      }
    }
  }
`;

export const QUERY_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      comments {
        username
        createdAt
        commentBody
        commentId
      }
      createdAt
      postBody
      postTitle
      username
    }
  }
`;

export const QUERY_USERS = gql`
  query getAllPosts {
    getAllUsers {
      _id
      email
      username
      posts {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      _id
      email
      username
      bio
      posts {
        _id
        postBody
        postTitle
        createdAt
      }
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query getLoggedInUser {
    me {
      _id
      username
      email
      bio
      posts {
        _id
        postTitle
        postBody
        createdAt
      }
      following {
        _id
        username
      }
    }
  }
`;

// export const GET_USER_POSTS = gql`
//   query getUserPosts($userId: ID!) {
//     getUser(userId: $userId) {
//       _id
//       username
//       posts {
//         _id
//         postTitle
//         postBody
//         createdAt
//       }
//     }
//   }
// `;
