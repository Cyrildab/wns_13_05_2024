import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query {
    countries {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
  query ($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation ($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      code
      emoji
    }
  }
`;
