import http from "k6/http";

export const options = {
  vus: 100,
  duration: "10s",
};

export default function () {
  // 실제 존재하는 URL로 변경
  http.get("https://httpbin.org/get");
}
