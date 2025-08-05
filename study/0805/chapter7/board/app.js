require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postService = require("./services/post-service");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbConnection = require("./configs/mongodb-connection");

app.engine(
  "handlebars",
  handlebars
    .create({
      helpers: require("./helpers/handlebars-helpers"),
    })
    .engine()
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", {
    title: "테스트 게시판",
  });
});

app.get("/write", (req, res) => {
  res.render("write", {
    title: "글 작성",
  });
});

app.get("/detail", (req, res) => {
  res.render("detail", {
    title: "테스트 게시판",
  });
});

app.post("/write", async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(post);
  res.redirect(`/detail/${result.insertedId}`);
});

let collection;
app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection("post");
  console.log("MongoDB connected");
});
