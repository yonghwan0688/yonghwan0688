function solution(s) {
    let count = 0;
    let zero_delete = 0;
    while(s !== '1'){
    zero_delete += s.split("").filter((char) => char === '0').length;
    s = s.split("").filter((char) => char !== '0').length.toString(2);
    count++
}
    return [count, zero_delete];
}
