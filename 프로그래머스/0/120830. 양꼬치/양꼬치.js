function solution(n, k) {
   let freeDrinks = Math.floor(n/10);
   let paidDrinks = k - freeDrinks;
   return paidDrinks * 2000 + n * 12000; 
}