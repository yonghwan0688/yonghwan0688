function printAge(age: number) {
  if (typeof age !== "number") {
    throw new Error("숫자만 허용됩니다.");
  }
  console.log(`${age}살`);
}

printAge(20);

type UserInput = string | number;
function isString(input: UserInput): input is string {
  return typeof input === "string";
}

function getStatus(code: number): "success" | "error" {
  if (code === 200) return "success";
  return "error";
}

function showLength(input: string | number) {
  if (typeof input === "string") {
    console.log(`길이: ${input.length}`);
  } else {
    console.log("문자열이 아닙니다.");
  }
}
