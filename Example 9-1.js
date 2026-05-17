function range(from, to) {
    let r = Object.create(range.methods);

    r.from = from;
    r.to = to;

    return r;
}

range.methods = {
    func: (x) => { return this.from <= x && x <= this.to; },
    
    *[Symbol.iterator]() {
    for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },

    toString() { return "(" + this.from + "..." + this.to + ")"; }
};

let r = range(1,3); // Create a range object
r.func(2); // => true: 2 is in the range
r.toString(); // => "(1...3)"
[...r] // => [1, 2, 3]; convert to an array via iterator