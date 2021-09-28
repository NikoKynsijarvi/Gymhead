const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Workout = require("./models/workout");
const User = require("./models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

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

  input ExerciseInput {
    name: String
    reps: Int
    weight: Int
    sets: Int
    id: Int
  }

  type User {
    username: String
    password: String
  }

  type Token {
    value: String!
  }

  type Query {
    workoutCount: Int!
    allWorkouts(exercise: String): [Workout!]!
    me: User
  }

  type Mutation {
    addWorkout(
      length: Float
      comment: String
      date: String
      excercises: [ExerciseInput]
    ): Workout
    createUser(username: String, password: String): User
    login(username: String!, password: String!): Token
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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addWorkout: (root, args) => {
      const workout = new Workout({ ...args });
      return workout.save();
    },
    createUser: async (root, args) => {
      const saltRounds = 10;
      const username = args.username;
      const password = await bcrypt.hash(args.password, saltRounds);
      const user = new User({ username, password });
      return user.save();
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "workouts"
      );
      return currentUser;
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
