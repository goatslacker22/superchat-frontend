/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddStarInput } from "./../../../lib/globalTypes";

// ====================================================
// GraphQL mutation operation: AddStar
// ====================================================

export interface AddStar_addStar_starrable {
  __typename: "Gist" | "Repository" | "Topic";
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
}

export interface AddStar_addStar {
  __typename: "AddStarPayload";
  /**
   * The starrable.
   */
  starrable: AddStar_addStar_starrable | null;
}

export interface AddStar {
  /**
   * Adds a star to a Starrable.
   */
  addStar: AddStar_addStar | null;
}

export interface AddStarVariables {
  input: AddStarInput;
}
