var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  email: String,
});

module.exports = mongoose.model("Person", personSchema);
