function solution(A,B){
    sum = 0;
    let array_a = A.sort(function(a, b){ return a - b });
    let array_b = B.sort(function(a, b){ return b - a });
    for(let i=0; i<array_a.length; i++){
       sum += array_a[i] * array_b[i]; 
    }
    // console.log(array_a);
    // console.log(array_b);
    return sum;
}