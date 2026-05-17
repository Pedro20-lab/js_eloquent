// Exercises
// A vector type
// Write a class Vec that represents a vector in two-dimensional space. 
// It takes x and y parameters (numbers), that it saves to properties of the same name.
// Give the Vec prototype two methods, plus and minus, 
// that take another vector as a parameter and return a 
// new vector that has the sum or difference of the two vectors’ 
// (this and the parameter) x and y values.

// Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(that) {
        return new Vec(this.x + that.x, this.y + that.y)
    }

    minus(that) {
        return new Vec(this.x - that.x, this.y - that.y)
    }
    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
}

//console.log(new Vec(1, 2).plus(new Vec(2, 3)));
//// → Vec{x: 3, y: 5}
//console.log(new Vec(1, 2).minus(new Vec(2, 3)));
//// → Vec{x: -1, y: -1}
//console.log(new Vec(3, 4).length);
//// → 5

// Groups
// The standard JavaScript environment provides another data structure called Set. 
// Like an instance of Map, a set holds a collection of values. 
// Unlike Map, it does not associate other values with those—it just tracks 
// which values are part of the set. A value can be part of a set 
// only once—adding it again doesn’t have any effect.
// Write a class called Group (since Set is already taken). 
// Like Set, it has add, delete, and has methods. Its constructor 
// creates an empty group, add adds a value to the group (but only if 
// it isn’t already a member), delete removes its argument from the group 
// (if it was a member), and has returns a Boolean value indicating whether 
// its argument is a member of the group.
// Use the === operator, or something equivalent such as indexOf, to determine
// whether two values are the same.
// Give the class a static from method that takes an iterable object as its 
// argument and creates a group that contains all the values produced by 
// iterating over it.

class Group {
    constructor() {
        this.members = []
        this.deleted = []
    }

    add(value) {
        if (this.deleted.includes(value)) {
            return `Cannot add ${value}`;
        } 

        if (this.members.includes(value)) {
            return `Value ${value} already in`;
        }

        this.members.push(value)
        return `Value ${value} added`
    }

    delete(value) {
        this.deleted.push(this.members[this.members.indexOf(value)])
        this.members = this.members.filter(member => {return member != value})
    }

    has(value) {
        if (this.members.indexOf(value) < 0) {
            return false
        }
        return true
    }

    static from(iterable) {
        let group = new Group();
        for (let value of iterable) {
            group.add(value)
        }
        return group
    }

    [Symbol.iterator]() {
        return new GroupIterator(this)
    }

}

class GroupIterator {
    constructor(group) {
        this.group = group
    }
    index = 0
    next() {
        if (this.index === this.group.members.length) {
            return {done: true}
        }
        let value = this.group.members[this.index]
        this.index++
        return {value: value, done: false}
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
console.log(group.add(10));
//already in
group.delete(10);
console.log(group.has(10));
// → false
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c