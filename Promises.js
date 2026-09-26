// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve("done!"), 1000);
//   setTimeout(() => reject(new Error("error!")), 2000);
// });

// promise.then(
//   result => console.log(result), // shows "done!" after 1 second
//   error => console.log(error)     // doesn't run
// );

// promise.catch(error => console.log(error)); // doesn't run

// function withTimeout(promise, time) {
//   return new Promise((resolve, reject) => {
//     promise.then(resolve, reject);
//     setTimeout(() => reject("Timed out"), time);
//   });
// }

// function crackPasscode(networkID) {
//   function nextDigit(code, digit) {
//     let newCode = code + digit;
//     return withTimeout(joinWifi(networkID, newCode), 50)
//       .then(() => newCode)
//       .catch(failure => {
//         if (failure == "Timed out") {
//           return nextDigit(newCode, 0);
//         } else if (digit < 9) {
//           return nextDigit(code, digit + 1);
//         } else {
//           throw failure;
//         }
//       });
//   }
//   return nextDigit("", 0);
// }

fetch("http://127.0.0.1:8000/api/guests")
  .then(response => {
    if (!response.ok) {
      console.log(`Response is this ${response.status}`)
      return null;
    }

    let type = response.headers.get("content-type");

    if (type !== "application/json") {
      throw new TypeError(`Expected JSON, got ${type}`);
    }

    return response.json();
  })
  .then(data => { // Called with the parsed response body or null
    if (data) {
      //displayUserProfile(profile);
      console.log('Called with data returned')
      console.log(`Data: ${JSON.stringify(data)}`)
    }
    else { // If we got a 404 error above and returned null we end up here
      console.log('No data was returned');
      console.log(`This was returned ${data}`);
    }
  })
  .catch(e => {
    console.log(e)
    //if (e instanceof NetworkError) {
    //  // fetch() can fail this way if the internet connection is down
    //  displayErrorMessage("Check your internet connection.");
    //}
    //else if (e instanceof TypeError) {
    //  // This happens if we throw TypeError above
    //  displayErrorMessage("Something is wrong with our server!");
    //}
    //else {
    //  // This must be some kind of unanticipated error
    //  console.error(e);
    //}
  });

const http = require("http");
function getJSON(url) {
  // Create and return a new Promise
  return new Promise((resolve, reject) => {
    // Start an HTTP GET request for the specified URL
    request = http.get(url, response => { // called when response starts
      // Reject the Promise if the HTTP status is wrong
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));
        response.resume(); // so we don't leak memory
      }
      // And reject if the response headers are wrong
      else if (response.headers["content-type"] !== "application/json") {
        reject(new Error("Invalid content-type"));
        response.resume(); // don't leak memory
      }
      else {
        // Otherwise, register events to read the body of the response
        let body = "";
        response.setEncoding("utf-8");
        response.on("data", chunk => { body += chunk; });
        response.on("end", () => {
          // When the response body is complete, try to parse it
          try {
            let parsed = JSON.parse(body);
            // If it parsed successfully, fulfill the Promise
            resolve(parsed);
          } catch (e) {
            // If parsing failed, reject the Promise
            reject(e);
          }
        });
      }
    });
    // We also reject the Promise if the request fails before we
    // even get a response (such as when the network is down)
    request.on("error", error => {
      reject(error);
    });
  });
}

function fetchSequentially(urls) {
  // We'll store the URL bodies here as we fetch them
  const bodies = [];
  // Here's a Promise-returning function that fetches one body
  function fetchOne(url) {
    return fetch(url)
      .then(response => response.text())
      .then(body => {
        // We save the body to the array, and we're purposely
        // omitting a return value here (returning undefined)
        bodies.push(body);
      });
  }
  // Start with a Promise that will fulfill right away (with value undefined)
  let p = Promise.resolve(undefined);
  // Now loop through the desired URLs, building a Promise chain
  // of arbitrary length, fetching one URL at each stage of the chain
  for (url of urls) {
    p = p.then(() => fetchOne(url));
  }
  // When the last Promise in that chain is fulfilled, then the
  // bodies array is ready. So let's return a Promise for that

  // bodies array. Note that we don't include any error handlers:
  // we want to allow errors to propagate to the caller.
  return p.then(() => bodies);
}

// This function takes an array of input values and a "promiseMaker" function.
// For any input value x in the array, promiseMaker(x) should return a Promise
// that will fulfill to an output value. This function returns a Promise
// that fulfills to an array of the computed output values.
//
// Rather than creating the Promises all at once and letting them run in
// parallel, however, promiseSequence() only runs one Promise at a time
// and does not call promiseMaker() for a value until the previous Promise
// has fulfilled.
function promiseSequence(inputs, promiseMaker) {
  // Make a private copy of the array that we can modify
  inputs = [...inputs];
  // Here's the function that we'll use as a Promise callback
  // This is the pseudorecursive magic that makes this all work.
  function handleNextInput(outputs) {
    if (inputs.length === 0) {
      // If there are no more inputs left, then return the array
      // of outputs, finally fulfilling this Promise and all the
      // previous resolved-but-not-fulfilled Promises.
      return outputs;
    } else {
      // If there are still input values to process, then we'll
      // return a Promise object, resolving the current Promise
      // with the future value from a new Promise.
      let nextInput = inputs.shift(); // Get the next input value,
      return promiseMaker(nextInput) // compute the next output value,
        // Then create a new outputs array with the new output value
        .then(output => outputs.concat(output))
        // Then "recurse", passing the new, longer, outputs array
        .then(handleNextInput);
    }
  }
  // Start with a Promise that fulfills to an empty array and use
  // the function above as its callback.
  return Promise.resolve([]).then(handleNextInput);
}