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
  query getPost {
    getPost(postId: $postId) {
      _id
      comments {
        commentBody
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
  query getUser {
    getUser(userId: $userId) {
      _id
      email
      username
      following {
        _id
      }
      posts {
        _id
      }
    }
  }
`;
