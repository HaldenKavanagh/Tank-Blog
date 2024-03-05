import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $postBody: String!
    $postTitle: String!
    $username: String!
  ) {
    createPost(
      postBody: $postBody
      postTitle: $postTitle
      username: $username
    ) {
      _id
      createdAt
      postBody
      postTitle
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!) {
    updateUser(username: $username) {
      _id
      username
      email
    }
  }
`;
