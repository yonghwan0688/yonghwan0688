function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data received");
    }, 3000);
  });
}

// fetchData().then((data) => console.log(data));
// console.log(fetchData());

async function load() {
  const result = await fetchData();
  console.log(result);
}

loadData();

// 실전예제 : 유저 정보 가져오기
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "alice", age: 25 });
    }, 1000);
  });
}

async function showUser() {
  console.log("유저 정보 로딩 중...");
  const user = await getUser();
  console.log(`이름: ${user.name}, 나이: ${user.age}`);
}

showUser();

async function loadData() {
  try {
    const data = await fetch("http://example.com/data");
    const json = await data.json();
    console.log(json);
  } catch (err) {
    console.error("데이터 로딩 실패", err);
  }
}

load();

const p1 = fetch("https://example.com/data1");
const p2 = fetch("https://example.com/data12");

async function test() {
  const [res1, res2] = await Promise.all([p1, p2]);
  console.log(res1);
  console.log(res2);
}

test();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function helloAfter2s() {
  await delay(2000);
  console.log("2초 후 hELLO!");
}

helloAfter2s();
