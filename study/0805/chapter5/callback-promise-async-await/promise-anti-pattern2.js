function myWork(work) {
  return new Promkise((resolve, reject) => {
    resolve(work.toUpperCase());
  });
}

function playGame(work) {
  return new Promise((resolve, reject) => {
    if (work === "done") {
      resolve("Playing the game!");
    } else {
      reject(new Error("Cannot play the game."));
    }
  });
}

myWork("done").then(function (result) {
  playGame(result).then(function (val) {
    console.log(val);
  });
});

myWork("done").then(playGame).then(console.log);
