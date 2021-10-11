import { gql } from "@apollo/client";

export const ADD_WORKOUT = gql`
  mutation createWorkout(
    $user: String
    $length: Float
    $date: String
    $comment: String
    $excercises: [ExerciseInput]
  ) {
    addWorkout(
      user: $user
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($username: String, $password: String) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`;
