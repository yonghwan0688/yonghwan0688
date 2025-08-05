require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postService = require("./services/post-service");
const objectId = require("mongodb").ObjectId;
const mongodbConnection = require("./configs/mongodb-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

let collection;

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  try {
    const posts = await postService.list(collection, page, search);
    res.render("home", {
      title: "테스트 게시판",
      posts: posts,
      page: page,
      search: search,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/write", (req, res) => {
  res.render("write", {
    title: "글 작성",
    mode: "create",
  });
});

app.post("/write", async (req, res) => {
  try {
    const post = req.body;
    const result = await postService.writePost(post);
    res.redirect(`/detail/${result.insertedId}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/detail/:id", async (req, res) => {
  try {
    const result = await postService.getPostById(req.params.id);
    res.render("detail", {
      title: "테스트 게시판",
      post: result,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/modify", async (req, res) => {
  try {
    const post = await postService.getPostById(req.query.id);
    res.render("write", {
      title: "글 수정",
      mode: "modify",
      post: post,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/modify", async (req, res) => {
  try {
    const post = req.body;
    const result = await postService.updatePost(req.body.id, post);
    res.redirect(`/detail/${result.value._id}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const result = await postService.deletePost(objectId(req.body.id));
    if (result.deletedCount === 0) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send("Post deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/write-comment", async (req, res) => {
  const { id, name, password, comment } = req.body;
  const post = await postService.getPostById(id);
  if (!post) return res.status(404).send("Post not found");
  const result = await postService.writeComment(id, name, password, comment);
  if (result.insertedId) {
    res.status(201).send("Comment added");
  } else {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/check-password", async (req, res) => {
  try {
    const { id, password } = req.body;
    const post = await postService.getPostById(id);
    if (!post) return res.status(404).send("Post not found");
    if (post.password === password) {
      res.status(200).send("비밀번호가 일치합니다.");
    } else {
      res.status(403).send("비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection("post");
  console.log("MongoDB connected");
});

app.delete("/delete-comment", async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    const result = await postService.deleteComment(postId, commentId);
    if (result.modifiedCount === 0) {
      return res.status(404).send("Comment not found");
    }
    res.status(200).send("Comment deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

post.comments = post.comments.filter(
  (comment) => comment._id.toString() !== commentId
);
postService.updatePost(collection, id, post);
return res.json({ isSuccess: true });
