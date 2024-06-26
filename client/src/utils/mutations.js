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
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $bio: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      bio: $bio
    ) {
      token
      user {
        _id
        username
        email
        bio
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $postBody: String!
    $postTitle: String!
    $username: String!
    $imagePath: String!
  ) {
    createPost(
      postBody: $postBody
      postTitle: $postTitle
      username: $username
      imagePath: $imagePath
    ) {
      _id
      createdAt
      postBody
      postTitle
      imgePath
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $username: String!, $bio: String!) {
    updateUser(userId: $userId, username: $username, bio: $bio) {
      _id
      bio
      username
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $postBody: String!, $postTitle: String!) {
    updatePost(postId: $postId, postBody: $postBody, postTitle: $postTitle) {
      _id
      postBody
      postTitle
      username
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!, $username: String!) {
    addComment(
      postId: $postId
      commentBody: $commentBody
      username: $username
    ) {
      _id
      username
      comments {
        commentBody
        commentId
        createdAt
        username
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`;
