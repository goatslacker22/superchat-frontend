/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRepoData
// ====================================================

export interface GetRepoData_repository_owner {
  __typename: "Organization" | "User";
  /**
   * A URL pointing to the owner's public avatar.
   */
  avatarUrl: any;
  id: string;
  /**
   * The username used to login.
   */
  login: string;
}

export interface GetRepoData_repository_stargazers_nodes {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
}

export interface GetRepoData_repository_stargazers {
  __typename: "StargazerConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetRepoData_repository_stargazers_nodes | null)[] | null;
}

export interface GetRepoData_repository_watchers {
  __typename: "UserConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface GetRepoData_repository {
  __typename: "Repository";
  /**
   * The User owner of the repository.
   */
  owner: GetRepoData_repository_owner;
  id: string;
  /**
   * The description of the repository.
   */
  description: string | null;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * Returns a boolean indicating whether the viewing user has starred this starrable.
   */
  viewerHasStarred: boolean;
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
  /**
   * A list of users who have starred this starrable.
   */
  stargazers: GetRepoData_repository_stargazers;
  /**
   * A list of users watching the repository.
   */
  watchers: GetRepoData_repository_watchers;
  /**
   * Returns how many forks there are of this repository in the whole network.
   */
  forkCount: number;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
}

export interface GetRepoData {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: GetRepoData_repository | null;
}

export interface GetRepoDataVariables {
  name: string;
  owner: string;
}
