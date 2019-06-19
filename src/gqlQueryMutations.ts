import { gql } from "apollo-boost";

export const GET_RECENT_PASTES = gql`
  query {
    pastes(last: 5) {
      id
      title
      createdAt
    }
  }
`;

export const GET_PASTE_DETAILS = gql`
  query paste($id: ID!) {
    paste(id: $id) {
      title
      content
      createdAt
      public
      language
      createdBy {
        username
      }
    }
  }
`;

export const CREATE_PASTE = gql`
  mutation createPaste($input: CreatePasteInput!) {
    createPaste(input: $input) {
      paste {
        id
      }
    }
  }
`;

export const UPDATE_PASTE = gql`
  mutation updatePaste($input: UpdatePasteInput!) {
    updatePaste(input: $input) {
      paste {
        id
      }
    }
  }
`;

export const OBTAIN_JWT_TOKEN = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
