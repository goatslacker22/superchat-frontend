import { gql } from '@apollo/client';

export const GET_REPO_DATA = gql`
  query GetRepoData($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      owner {
        avatarUrl
        id
        login
      }
      id
      description
      name
      viewerHasStarred
      stargazerCount
      stargazers(first: 10) {
        nodes {
          login
        }
      }
      watchers {
        totalCount
      }
      forkCount
      createdAt
    }
  }
`;
