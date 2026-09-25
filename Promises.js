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
