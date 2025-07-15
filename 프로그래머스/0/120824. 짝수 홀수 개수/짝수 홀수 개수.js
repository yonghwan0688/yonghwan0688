function solution(num_list) {
    const isEven = num_list.filter(n => n % 2 === 0);
    const isOdd = num_list.filter(n => n % 2 !== 0);
    const array = [isEven.length, isOdd.length];
    return array;
}