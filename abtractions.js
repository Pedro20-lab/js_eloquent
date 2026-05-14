
console.log(Object.getPrototypeOf({}));
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
//This is a demo of 
let proto =  {
    toString() {
        console.log(`The type is ${this.type}`)
    },

    'prop': 'propertyFromProto'
}

function sons(type) {
    let son = Object.create(proto)
    son.type = type
    return son
}

let son = sons('heir')
son.prop = 'heirHasOwnProps'
// console.log(son.prop)
// console.log(sons.toString())

// console.log(proto.toString())

//Symbols
let sym = Symbol('description')
let obj = {
    [sym]: 'value'
}

// console.log(obj[sym])

let arrayIterator = [1, 2, 3][Symbol.iterator]()

class Month {
    num31 = [1, 3, 5, 7, 8, 10, 12]
    num30 = [4, 6, 9, 11]
    constructor(number) {
        this.number = number
        this.stringMonth = this.monthString(number)
        this.days = this.days()
    }

    monthString(number) {
        let stringsMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        for (let i = 0; i < stringsMonths.length; i++) {
            if (i+1 === number) {
                return stringsMonths[i]
            }
        }
    }

    days() {
        let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        if (this.num31.includes(this.number)) {
            return days
        }

        if (this.num30.includes(this.number)) {
            return days.slice(0, 30)
        }

        return days.slice(0, 28)

    }

    [Symbol.iterator]() {
        return new monthIterator(this)
    }

}

class monthIterator {
    constructor(month) {
        this.month = month
    }

    index = 0
    next() {
        if (this.index >= this.month.days.length ) {            
            return {done: true}            
        }
        let value = this.month.days[this.index]
        this.index++
        return {value, done: false}
    }
}



let february = new Month(2)

for (let day of new Month(2)) {
    console.log(`${february.stringMonth} ${day}`)
}