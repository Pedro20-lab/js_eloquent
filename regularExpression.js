
/([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/


// let stringRegex = /['"][^'"]*['"]/ 
"This regex matches a string within single or double quotes, but it doesn't requite both to match, to be the same"
// let stringRegex = /(['"])[^'"]*\1/
"This regex uses a capturing group to match either a single or double quote, and then uses a backreference (\\1) to enforce that the closing quote to be the same as the opening quote"
/* Regex expressions using the constructor */
/*Let's suppose input is input from user */
let input = 'parameter'
let variableToLookFor = new RegExp(`\\n${input}`)
/* Greedy and non-greedy operation */

let greedy = /[A-Za-b]+/
greedy.test('hola1')

/**d, g flag */
function getHighlightRanges(text, pattern) {
  const re = new RegExp(pattern, "gd");
  return [...text.matchAll(re)].map(m => m.indices[0]);
}
let text = "foo bar foo"
const ranges = getHighlightRanges(text, "foo");
// [[0, 3], [8, 11]]
// Now you can slice the original string precisely:
//ranges.forEach(([start, end]) => {
//  console.log(text.slice(start, end));  // "foo", "foo"
//});

/* Groups */
/(?:)/ /* */
//const group = new RegExp('(?<group>\d)+')
//const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

/**/

//const words = /\b\p{Alphabetic}+\b/gu; // \p is not supported in Firefox yet
//const anotherText = "This is a naïve test of the matchAll() method.";
//for(let word of anotherText.matchAll(words)) {
//  console.log(`Found '${word[0]}' at index ${word.index}.`);
//}

// Fill in the regular expressions

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  console.log(regexp.source)
  if (regexp.source == "...") return;
  for (let str of yes) {
    console.log(`Testing '${str}'`);
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  }
    
  for (let str of no) {
    console.log(`Testing '${str}'`);
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
  }
}

verify(/car|cat/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/p[ro]p/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/.../,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/.../,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/.../,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/.../,
       ["red platypus", "wobbling nest"],
       ["earth bed", "bedrøvet abe", "BEET"]);