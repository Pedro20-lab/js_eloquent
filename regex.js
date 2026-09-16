let regex = /\d/

//console.log(regex.test('10'))
regex = /\d*/
//console.log(regex.test(''))
let cartoonCrying = /boo+(hoo+)+/i; '-> (hoo) is a sub expression, i is a flag'


// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
//console.log(new Date(2000,13,1));
//// 1.780.878.452.763
//// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
//console.log(/^.*x/.exec('abcxde'));


function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
//console.log(stripComments("1 + /* 2 */3"));
//// → 1 + 3
//console.log(stripComments("x = 10;// ten!"));
//// → x = 10;
//console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1

/* Position conditions: ^, $, (?=), (?!),  */



const re = /(?<first>\w+) (?<last>\w+)/g;
const str = "john smith, jane doe";

//str.replace(re, (match, p1, p2, offset, input, groups) => {
//  console.log(match);   // "john smith"
//  console.log(p1);      // "john"    -- group 1
//  console.log(p2);      // "smith"   -- group 2
//  console.log(offset);  // 0         -- position in string
//  console.log(groups);  // { first: "john", last: "smith" }
//  return `${p2.toUpperCase()}, ${p1}`;
//});
// "SMITH, john, DOE, jane"

let configFile = `
searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn
`
function parseINI() {
  let result = {}
  let section = result;
  for (let line of configFile.split(/\r?\n/)) {
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;|$)/) {
      throw new Error(`Line '${line}' is not valid.`);
    }
  }
  return result;
}

//console.log(parseINI(`
//name=Vasilis
//[address]
//city=Tessaloniki`));


// Fill in the regular expressions

verify(/.../,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/.../,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/.../,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\w+ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/ (\.|,|;|:)/,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/\p{L}{6,}/u,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/[^Ee]/u,
       ["red platypus", "wobbling nest"],
       ["earth bed", "bedrøvet abe", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}