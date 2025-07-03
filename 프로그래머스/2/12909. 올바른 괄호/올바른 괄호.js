function solution(s) {
  let counter = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      counter += 1;
    } else {
      counter -= 1;
    }

    if (counter < 0) {
      return false;
    }
  }

  if (counter !== 0) return false;
  return true;
}
