function solution(s) {
    const arr = s.split(" ");
    for(let i=0; i<arr.length; i++) {
        if(arr[i].length > 0){
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
        } 
    }
    return arr.join(" ");
}