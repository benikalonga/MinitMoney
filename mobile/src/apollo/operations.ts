import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      id
      firstName
      lastName
      phone
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
export const REGISTER = gql`
  mutation ($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        firstName
        lastName
        phone
      }
    }
  }
`;
export const LOGIN = gql`
  mutation ($phone: String!, $pin: String!) {
    login(phone: $phone, pin: $pin) {
      token
      user {
        id
        firstName
        lastName
        phone
      }
    }
  }
`;
export const SEND_MONEY = gql`
  mutation ($input: SendMoneyInput!) {
    sendMoney(input: $input) {
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
export const BENEFICIARIES = gql`
  query Beneficiaries {
    beneficiaries {
      id
      name
      method
    }
  }
`;
