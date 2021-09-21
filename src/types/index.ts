export interface RepositoryType {
  owner: OwnerType;
  description: string;
  name: string;
  stargazerCount: number;
  stargazers: StargazersType;
  id: string;
  viewerHasStarred: boolean;
  watcher: WatchersType;
  forkCount: number;
  createdAt: string;
}
export interface CardType extends RepositoryType {
  color: string;
  starrableId: string;
  repositoryId: string;
  icon: string;
}
export interface OwnerType {
  avatarUrl: string;
  id: string;
  login: string;
}
export interface NodeType {
  login: string;
}
export interface WatchersType {
  totalCount: number;
}
export interface StargazersType {
  nodes: NodeType[];
}
export interface AddStarInputType {
  starrableId: string;
  clientMutationId: string;
}
