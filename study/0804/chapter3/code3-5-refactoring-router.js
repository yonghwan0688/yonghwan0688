const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if (path in urlMap) {
      urlMap[path](req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen(3000, () => {
    console.log("라우터를 만들어보자~!");
  });

const user = (req, res) => {
  res.end("USER");
};
const feed = (req, res) => {
  res.end("FEED");
};
const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 Not Found");
};

const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};
