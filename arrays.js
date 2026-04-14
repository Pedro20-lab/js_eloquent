/*Exercises
The sum of a range
The introduction of this book alluded to the following as a nice way to compute the sum of a range of 
numbers:

console.log(sum(range(1, 10)));

Write a range function that takes two arguments, start and end, and returns an array containing all 
the numbers from start up to and including end.

Next, write a sum function that takes an array of numbers and returns the sum of these numbers. 
Run the example program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional third argument that indicates 
the “step” value used when building the array. If no step is given, the elements should go up by 
increments of one, corresponding to the old behavior. The function call range(1, 10, 2)
should return [1, 3, 5, 7, 9]. Make sure this also works with negative step values 
so that range(5, 2, -1) produces [5, 4, 3, 2].*/

// Your code here.
function range(start, end, step = 1) {
  let array = [start]
  if (end < start) {
    start = end
    end = start
    step = -1
  }
  
  for (let i = 0 ; array[i] != end; i++) {
    array[i + 1] = array[i] + step;
    
  }
  return array
}

function sum(array) {
  let sum = 0
  for (let num of array) {
    sum += num 
  }
  return sum
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, 2));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55



 /*Reversing an array
 Arrays have a reverse method that changes the array by inverting the order in which its elements 
 appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
 The first, reverseArray, should take an array as its argument and produce a new array 
 that has the same elements in the inverse order. The second, reverseArrayInPlace, should do 
 what the reverse method does: modify the array given as its argument by reversing its elements.
 Neither may use the standard reverse method.
 Thinking back to the notes about side effects and pure functions in the previous chapter, 
 which variant do you expect to be useful in more situations? Which one runs faster?
 Your code here.*/
function reverseArray(array) {
  let reversedArray = []
  for (let i = 0; i < array.length; i++) {
    reversedArray[i] = array[array.length - (i+1)]
  }
  return reversedArray
}
function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length/2); i++) {
    let temp = array[i]
    array[i] = array[array.length - (i+1)]
    array[array.length - (i+1)] = temp
  }
}
let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];

console.log(myArray);
// → ["A", "B", "C"];

let arrayValue = [1, 2, 3, 4, 5, 6, 7, 9];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]