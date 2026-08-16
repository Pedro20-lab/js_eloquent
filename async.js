function getCurrentVersionNumber(versionCallback) { // Note callback argument

    // Make a scripted HTTP request to a backend version API
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.example.com/api/version");
    request.send();

    // Register a callback that will be invoked when the response arrives
    request.onload = function () {

        if (request.status === 200) {
            // If HTTP status is good, get version number and call callback.
            let currentVersion = parseFloat(request.responseText);
            versionCallback(null, currentVersion);
        } else {
            // Otherwise report an error to the callback
            versionCallback(response.statusText, null);
        }
    };
    // Register another callback that will be invoked for network errors
    request.onerror = request.ontimeout = function (e) {
        versionCallback(e.type, null);
    };
}

const https = require("https");
// Read the text content of the URL and asynchronously pass it to the callback.
function getText(url, callback) {
 // Start an HTTP GET request for the URL
 request = https.get(url);
 // Register a function to handle the "response" event.
 request.on("response", response => {
 // The response event means that response headers have been received
 let httpStatus = response.statusCode;