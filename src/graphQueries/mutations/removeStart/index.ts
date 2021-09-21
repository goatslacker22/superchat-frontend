import { gql } from '@apollo/client';

export const REMOVE_STAR = gql`
  mutation RemoveStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      __typename
      starrable {
        stargazerCount
      }
    }
  }
`;
