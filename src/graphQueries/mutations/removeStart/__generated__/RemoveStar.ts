/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RemoveStarInput } from "./../../../../lib/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveStar
// ====================================================

export interface RemoveStar_removeStar_starrable {
  __typename: "Gist" | "Repository" | "Topic";
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
}

export interface RemoveStar_removeStar {
  __typename: "RemoveStarPayload";
  /**
   * The starrable.
   */
  starrable: RemoveStar_removeStar_starrable | null;
}

export interface RemoveStar {
  /**
   * Removes a star from a Starrable.
   */
  removeStar: RemoveStar_removeStar | null;
}

export interface RemoveStarVariables {
  input: RemoveStarInput;
}
