function myWork(work) {
  return new Promise((resolve, reject) => {
    if (work === "done") {
      resolve("게임가능");
    } else {
      reject(new Error("게임불가능"));
    }
  });
}

myWork("done").then(
  function (value) {
    console.log(value);
  },
  function (error) {
    console.error(error.message);
  }
);

myWork("not done").then(
  function (value) {
    console.log(value);
  },
  function (error) {
    console.error(error.message);
  }
);
