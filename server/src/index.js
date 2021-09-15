const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Workout = require("./models/workout");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Exercise {
    name: String
    reps: Int
    weight: Int
    sets: Int
    id: Int
  }

  type Workout {
    length: Float!
    comment: String
    date: String
    excercises: [Exercise]
  }

  type Query {
    workoutCount: Int!
    allWorkouts(exercise: String): [Workout!]!
  }

  input ExerciseInput {
    name: String
    reps: Int
    weight: Int
    sets: Int
    id: Int
  }

  type Mutation {
    addWorkout(
      length: Float
      comment: String
      date: String
      excercises: [ExerciseInput]
    ): Workout
  }
`;

const resolvers = {
  Query: {
    workoutCount: () => Workout.collection.countDocuments(),
    allWorkouts: (root, args) => {
      if (args.exercise) {
        const filteredWorkouts = workouts.filter((w) =>
          w.excercises.map((e) => e.name).includes(args.exercise)
        );
        return Workout.find({});
      }

      return Workout.find({});
    },
  },
  Mutation: {
    addWorkout: (root, args) => {
      const workout = new Workout({ ...args });
      // workouts = workouts.concat(workout);
      return workout.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
