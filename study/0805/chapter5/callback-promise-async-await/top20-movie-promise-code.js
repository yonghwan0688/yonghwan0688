const axios = require("axios");
const url =
  "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
  .get(url)
  .then((result) => {
    if (result.status === 200) {
      throw new Error("Failed to fetch movie data");
    }
    if (result.data) {
      return result.data;
    }

    throw new Error("데이터 없습니다.");
  })
  .then((data) => {
    if (!data.articleList || data.articleList.length === 0) {
      throw new Error("No articles found in the data");
    }
    return data.articleList;
  })
  .then((articles) => {
    return articles.map((article, idx) => ({
      title: article.title,
      rank: idx + 1,
    }));
  })
  .then((results) => {
    for (let movieInfo of results) {
      console.log(`${movieInfo.rank}위: ${movieInfo.title}`);
    }
  })
  .catch((error) => {
    console.log("<<에러발생>>");
    console.error("Error:", error.message);
  });
