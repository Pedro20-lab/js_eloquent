'use strict'
for (let i = 0; i <=100; i++) {
    let toPrint = i
    if (i % 3 == 0) {
        toPrint = 'Fizz';
    }

    if (i % 5 == 0) {
        toPrint = 'Buzz';
    }

    if (i % 3 == 0 && i % 5 == 0) {
        console.log('Fizzbuzz');
    }

    console.log(toPrint);
    

}