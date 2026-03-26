'use strict'
let value = false
let size = 8
for (let i = 0; i < size; i++) {    
    let output = '';
    for (let j = 0; j < size; j++) {
        let toAppend = value ? '#' : ' '
        output = output + toAppend
        value = !value
    }
    value = !value
    console.log(output)
}