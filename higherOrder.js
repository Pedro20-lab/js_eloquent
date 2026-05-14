require('./scripts.js')
//Determine the script a particular code belongs to
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) {
            return script;
        }
    }
    return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.find(c => c.name == name);
    if (!known) {
      counts.push({name, count: 1});
    } else {
      known.count++;
    }
  }
  return counts;
}

function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

function dominantDirection(text) {
  let countByScript = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let dominantScript = countByScript.reduce((x, y) => x.count > y.count ? x: y)
  

  let script = SCRIPTS.find((script) => {return script.name === dominantScript.name })
  return script.direction
  
  // let total = countByScript.reduce((n, {count}) => n + count, 0);
  // if (total == 0) return "No scripts found";

}

//console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic

function flatten(array) {
  let flattenedArray = []
  let elements = array.reduce((a, b) => { return String(a).concat( ',', String(b)) })
  for (const element of elements) {
    let char = Number(element)
    if (char) {
      flattenedArray.push(char)
    }
  }
  
  return flattenedArray
}

function loop(value, test, step, func) {
  for (;;) {
    if (test(value)) {
      func(value)
      value = step(value)
    } else {
      break
    } 
  }
  
}

//loop(3, n => n > 0, n => n - 1, console.log);

let arrays = [[1, 2, 3], [4, 5], [6]];

//console.log(flatten(arrays))
function every(array, test) {
  for (let i = 0; i < array.length; i++) {
    if(!test(array[i])) {
      return false
    }
  }
  return true
}

function every(array, test) {
  
  return !array.some(element => !test(element))

  // for (let i = 0; i < array.length; i++) {
  //   if(!test(array[i])) {
  //     return false
  //   }
  // }
  // return true
}

//console.log(every([1, 3, 5], n => n < 10));
// → true

//console.log(every([2, 4, 16], n => n < 10));
// → false
//console.log(every([], n => n < 10));
// → true