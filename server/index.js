const { ApolloServer, gql } = require("apollo-server");

let workouts = [
  {
    length: 1.1,
    comment: "Hyvä treeni",
    date: "19.08.2021",
    excercises: [
      {
        name: "Penkkipunnerrus",
        reps: 10,
        weight: 80,
        sets: 3,
        id: 0,
      },
      {
        name: "Maastaveto",
        reps: 5,
        weight: 140,
        sets: 4,
        id: 1,
      },
    ],
  },
  {
    length: 0.8,
    comment: "Huono treeni",
    date: "19.07.2021",
    excercises: [
      {
        name: "Jalkakyykky",
        reps: 7,
        weight: 180,
        sets: 2,
        id: 0,
      },
      {
        name: "Hauiskääntö",
        reps: 15,
        weight: 15,
        sets: 1,
        id: 1,
      },
    ],
  },
  {
    length: 1.3,
    comment: "Aika meh",
    date: "20.08.2021",
    excercises: [
      {
        name: "Penkkipunnerrus",
        reps: 10,
        weight: 80,
        sets: 6,
        id: 0,
      },
    ],
  },
  {
    length: 1.5,
    comment: "Aika meh",
    date: "10.08.2021",
    excercises: [
      {
        name: "Penkkipunnerrus",
        reps: 10,
        weight: 80,
        sets: 6,
        id: 0,
      },
    ],
  },
  {
    length: 0.5,
    comment: "Aika meh",
    date: "11.08.2021",
    excercises: [
      {
        name: "Penkkipunnerrus",
        reps: 10,
        weight: 80,
        sets: 6,
        id: 0,
      },
    ],
  },
];

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
    workoutCount: () => workouts.length,
    allWorkouts: (root, args) => {
      if (args.exercise) {
        const filteredWorkouts = workouts.filter((w) =>
          w.excercises.map((e) => e.name).includes(args.exercise)
        );
        return filteredWorkouts;
      }

      return workouts;
    },
  },
  Mutation: {
    addWorkout: (root, args) => {
      const workout = { ...args };
      workouts = workouts.concat(workout);
      return workout;
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
