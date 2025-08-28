import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($phone: String!, $pin: String!) {
    login(phone: $phone, pin: $pin) {
      token
      user {
        id
        phone
        firstName
        lastName
      }
    }
  }
`;
export const TRANSACTIONS = gql`
  query Query {
    transactions {
      id
      userId
      recipient {
        id
        name
        method
      }
      amount
      method
      currency
      status
      createdAt
    }
  }
`;
export const TRANSACTION = gql`
  query ($id: ID!) {
    transaction(id: $id) {
      id
      userId
      recipient {
        id
        name
        method
      }
      amount
      method
      currency
      status
      createdAt
    }
  }
`;
