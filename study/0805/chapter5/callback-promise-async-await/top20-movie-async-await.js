const axios = require("axios");

async function getTop20Movies() {
  const url =
    "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
  try {
    const result = await axios.get(url);
    const { data } = result;
    if (!data.articleList || data.articleList.length === 0) {
      throw new Error("No articles found in the data");
    }
    const movieInfos = data.articleList.map((article, idx) => ({
      title: article.title,
      rank: idx + 1,
    }));

    for (let movieInfo of movieInfos) {
      console.log(`Title: ${movieInfo.title}, Rank: ${movieInfo.rank}`);
    }
  } catch (error) {
    throw new Error(error);
  }
}

getTop20Movies();
