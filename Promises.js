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
