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
    
    let 네번째 = Math.floor(Math.random() * 45) + 1;
    while (네번째 === 첫번째 || 네번째 === 두번째 || 네번째 === 세번째) {
        네번째 = Math.floor(Math.random() * 45) + 1;
    }
    
    let 다섯번째 = Math.floor(Math.random() * 45) + 1;
    while (다섯번째 === 첫번째 || 다섯번째 === 두번째 || 다섯번째 === 세번째 || 다섯번째 === 네번째) {
        다섯번째 = Math.floor(Math.random() * 45) + 1;
    }
    
    let 여섯번째 = Math.floor(Math.random() * 45) + 1;
    while (여섯번째 === 첫번째 || 여섯번째 === 두번째 || 여섯번째 === 세번째 || 여섯번째 === 네번째 || 여섯번째 === 다섯번째) {
        여섯번째 = Math.floor(Math.random() * 45) + 1;
    }
    
    let 모든숫자 = [첫번째, 두번째, 세번째, 네번째, 다섯번째, 여섯번째];
    모든숫자.sort(function(a, b) { return a - b; });
    
    let 공들 = document.querySelectorAll('.ball');
    
    공들[0].textContent = 모든숫자[0];
    공들[1].textContent = 모든숫자[1];
    공들[2].textContent = 모든숫자[2];
    공들[3].textContent = 모든숫자[3];
    공들[4].textContent = 모든숫자[4];
    공들[5].textContent = 모든숫자[5];
    
    공들[0].style.backgroundColor = 'yellow';
    공들[1].style.backgroundColor = 'lightblue';
    공들[2].style.backgroundColor = 'lightcoral';
    공들[3].style.backgroundColor = 'lightgreen';
    공들[4].style.backgroundColor = 'orange';
    공들[5].style.backgroundColor = 'pink';
}