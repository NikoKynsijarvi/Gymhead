import { gql } from "@apollo/client";

export const ALL_WORKOUTS = gql`
  query {
    allWorkouts {
      length
      comment
      date
      excercises {
        name
        reps
        sets
        weight
      }
    }
  }
`;
