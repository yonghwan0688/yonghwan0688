require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  const mongodbUrl = process.env.MONGODB_URI;
  mongoose
    .connect(mongodbUrl, { useNewUrlParser: true })
    .then(console.log("Connected to MongoDB"));
  app.get("/person", async (req, res) => {
    const person = await Person.find({});
    res.json(person);
  });
  app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({ email: req.params.email });
    res.json(person);
  });
  app.post("/person", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.json(person);
  });
  app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body },
      { new: true }
    );
    console.log(person);
    res.json(person);
  });

  app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({ email: req.params.email });
    res.send({ success: true });
  });
});
