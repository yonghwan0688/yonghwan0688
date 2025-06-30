function drawNumbers() {
    let 첫번째 = Math.floor(Math.random() * 45) + 1;
    
    let 두번째 = Math.floor(Math.random() * 45) + 1;
    while (두번째 === 첫번째) {
        두번째 = Math.floor(Math.random() * 45) + 1;
    }
    
    let 세번째 = Math.floor(Math.random() * 45) + 1;
    while (세번째 === 첫번째 || 세번째 === 두번째) {
        세번째 = Math.floor(Math.random() * 45) + 1;
    }
    
    let 모든숫자 = [첫번째, 두번째, 세번째];
    모든숫자.sort(function(a, b) { return a - b; });
    
    let 공들 = document.querySelectorAll('.ball');
    공들[0].textContent = 모든숫자[0];
    공들[1].textContent = 모든숫자[1];
    공들[2].textContent = 모든숫자[2];
    
    공들[0].style.backgroundColor = '노란색';
    공들[1].style.backgroundColor = '파란색';
    공들[2].style.backgroundColor = '빨간색';
}