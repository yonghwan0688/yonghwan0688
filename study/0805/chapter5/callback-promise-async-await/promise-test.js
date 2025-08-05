const DB = [];

function saveDB(user) {
  const oldDBSize = DB.length + 1; // Simulate a new user being added
  DB.push(user);
  console.log(`save ${user.name} to DB`);
  return new Promise((resolve, reject) => {
    if (DB.length > oldDBSize) {
      resolve(user);
    } else {
      reject(new Error("Failed to save user"));
    }
  });
}

function sendEmail(user) {
  console.log(`send email to ${user.name}`);
  return new Promise((resolve) => {
    resolve(user);
  });
}

function getResult(user) {
  return new Promise((resolve, reject) => {
    resolve(`User ${user.name} registered successfully!`);
  });
}

function registerByPromise(user) {
  const result = saveDB(user)
    .then(sendEmail)
    .then(getResult)
    .catch((error) => new Error(error))
    .finally(() => {
      console.log("Registration process completed.");
    });
  console.log(result);
  return result;
}

const myUser = {
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword",
};

// const result = registerByPromise(myUser);
// result.then(console.log);

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);
