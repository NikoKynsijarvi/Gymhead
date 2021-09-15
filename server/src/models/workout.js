const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  length: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  excercises: [
    { name: String, reps: Number, weight: Number, sets: Number, Id: Number },
  ],
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Workout", schema);
