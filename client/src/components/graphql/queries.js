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

export const USERS_WORKOUTS = gql`
  query getUsersWorkouts($username: String) {
    usersWorkouts(user: $username) {
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
