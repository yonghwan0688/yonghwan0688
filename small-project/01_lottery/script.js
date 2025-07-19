function getColorForNumber(number) {
  if (number >= 1 && number <= 10) return "yellow";
  if (number >= 11 && number <= 20) return "blue";
  if (number >= 21 && number <= 30) return "red";
  if (number >= 31 && number <= 40) return "black";
  if (number >= 41 && number <= 45) return "green";
  return "yellow"; // 기본값
}

function drawNumbers() {
  const button = document.querySelector(".draw-button");
  const balls = document.querySelectorAll(".ball");

  // 버튼 비활성화
  button.disabled = true;
  button.style.opacity = "0.7";

  // 기존 숫자 초기화 및 애니메이션 클래스 제거
  balls.forEach((ball) => {
    ball.textContent = "?";
    ball.removeAttribute("data-color");
    ball.classList.remove("animate");
  });

  // 중복되지 않는 6개의 숫자 생성
  const numbers = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  // 숫자 정렬
  numbers.sort((a, b) => a - b);

  // 순차적으로 애니메이션과 함께 숫자 표시
  numbers.forEach((number, index) => {
    setTimeout(() => {
      const ball = balls[index];
      ball.textContent = number;
      ball.setAttribute("data-color", getColorForNumber(number));
      ball.classList.add("animate");

      // 마지막 볼이 표시된 후 버튼 재활성화
      if (index === numbers.length - 1) {
        setTimeout(() => {
          button.disabled = false;
          button.style.opacity = "1";
        }, 300);
      }
    }, index * 200);
  });
}
