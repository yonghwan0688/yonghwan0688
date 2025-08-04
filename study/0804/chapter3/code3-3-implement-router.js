const { link } = require("fs");
const http = require("http");
const url = require("url");
http
  .createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    res.setHeader("Content-Type", "text/html");

    if (path === "/user") {
      userInfo(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen(3000, () => {
    console.log("라우터를 만들어보자~!");
  });

const user = (req, res) => {
  res.end(`[user] name: andy, age: 30`);
};

const feed = (req, res) => {
  res.end(
    `<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>`
  );
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("<h1>404 Not Found</h1>");
};
