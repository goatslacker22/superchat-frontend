import { gql } from '@apollo/client';

export const ADD_STAR = gql`
  mutation AddStar($input: AddStarInput!) {
    addStar(input: $input) {
      __typename
      starrable {
        stargazerCount
      }
    }
  }
`;
