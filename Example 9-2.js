function Range(from, to) {
    this.from = from;
    this.to = to;
}

Range.prototype = {
    includes: function(x) { return this.from <= x && x <= this.to; },
 
    [Symbol.iterator]: function*() {
    for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },
    toString: function() { return "(" + this.from + "..." + this.to + ")"; },

    constructor: Range
};
console.log(Range.prototype.constructor)

let r = new Range(1,3); // Create a Range object; note the use of new
//console.log(r.toString()); // => "(1...3)"
// r.includes(2); // => true: 2 is in the range
// r.toString(); // => "(1...3)"
// [...r] // => [1, 2, 3]; convert to an array via iterator
function otherShit() {
    
}
