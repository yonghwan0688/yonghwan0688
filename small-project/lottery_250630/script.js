// 📝 로또 번호 뽑기 프로그램 - 쉬운 버전!

// 🎯 버튼을 클릭했을 때 실행되는 함수
function drawNumbers() {
    console.log("버튼이 클릭되었어요!"); // 확인용 메시지
    
    // 📦 1단계: 빈 박스 만들기
    let numbers = [];
    console.log("빈 박스를 만들었어요:", numbers);
    
    // 🎲 2단계: 첫 번째 숫자 뽑기
    let number1 = Math.floor(Math.random() * 45) + 1;
    numbers.push(number1);
    console.log("첫 번째 숫자:", number1);
    
    // 🎲 3단계: 두 번째 숫자 뽑기 (첫 번째와 다른 숫자)
    let number2 = Math.floor(Math.random() * 45) + 1;
    while (number2 === number1) {
        number2 = Math.floor(Math.random() * 45) + 1;
    }
    numbers.push(number2);
    console.log("두 번째 숫자:", number2);
    
    // 🎲 4단계: 세 번째 숫자 뽑기
    let number3 = Math.floor(Math.random() * 45) + 1;
    while (number3 === number1 || number3 === number2) {
        number3 = Math.floor(Math.random() * 45) + 1;
    }
    numbers.push(number3);
    console.log("세 번째 숫자:", number3);
    
    // 🎲 5단계: 네 번째 숫자 뽑기
    let number4 = Math.floor(Math.random() * 45) + 1;
    while (number4 === number1 || number4 === number2 || number4 === number3) {
        number4 = Math.floor(Math.random() * 45) + 1;
    }
    numbers.push(number4);
    console.log("네 번째 숫자:", number4);
    
    // 🎲 6단계: 다섯 번째 숫자 뽑기
    let number5 = Math.floor(Math.random() * 45) + 1;
    while (number5 === number1 || number5 === number2 || number5 === number3 || number5 === number4) {
        number5 = Math.floor(Math.random() * 45) + 1;
    }
    numbers.push(number5);
    console.log("다섯 번째 숫자:", number5);
    
    // 🎲 7단계: 여섯 번째 숫자 뽑기
    let number6 = Math.floor(Math.random() * 45) + 1;
    while (number6 === number1 || number6 === number2 || number6 === number3 || 
           number6 === number4 || number6 === number5) {
        number6 = Math.floor(Math.random() * 45) + 1;
    }
    numbers.push(number6);
    console.log("여섯 번째 숫자:", number6);
    
    // 📊 8단계: 숫자들을 작은 것부터 정렬하기
    numbers.sort(function(a, b) {
        return a - b;
    });
    console.log("정렬된 숫자들:", numbers);
    
    // 🎨 9단계: 화면에 숫자들 보여주기
    let balls = document.querySelectorAll('.ball');
    balls[0].textContent = numbers[0];
    balls[1].textContent = numbers[1];
    balls[2].textContent = numbers[2];
    balls[3].textContent = numbers[3];
    balls[4].textContent = numbers[4];
    balls[5].textContent = numbers[5];
    
    // 🌈 10단계: 공 색깔 바꾸기
    balls[0].style.backgroundColor = getSimpleColor(numbers[0]);
    balls[1].style.backgroundColor = getSimpleColor(numbers[1]);
    balls[2].style.backgroundColor = getSimpleColor(numbers[2]);
    balls[3].style.backgroundColor = getSimpleColor(numbers[3]);
    balls[4].style.backgroundColor = getSimpleColor(numbers[4]);
    balls[5].style.backgroundColor = getSimpleColor(numbers[5]);
}

// 🎨 간단한 색깔 정하기 함수
function getSimpleColor(number) {
    if (number <= 15) {
        return 'yellow';    // 노란색
    } else if (number <= 30) {
        return 'lightblue'; // 파란색
    } else {
        return 'lightcoral'; // 빨간색
    }
}