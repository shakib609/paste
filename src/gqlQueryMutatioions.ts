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
