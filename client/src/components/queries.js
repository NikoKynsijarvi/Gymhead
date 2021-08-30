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

export const ADD_WORKOUT = gql`
  mutation createWorkout($length: Float, $date: String, $comment: String) {
    addWorkout(length: $length, date: $date, comment: $comment) {
      length
      date
      comment
    }
  }
`;
