import { gql } from "@apollo/client";

export const ADD_WORKOUT = gql`
  mutation createWorkout(
    $length: Float
    $date: String
    $comment: String
    $excercises: [ExerciseInput]
  ) {
    addWorkout(
      length: $length
      date: $date
      comment: $comment
      excercises: $excercises
    ) {
      length
      date
      comment
      excercises {
        name
        reps
        sets
        weight
      }
    }
  }
`;
