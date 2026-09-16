const https = require("https");

// Read the text content of the URL and asynchronously pass it to the callback.
function getText(url, callback) {
    // Start an HTTP GET request for the URL
    request = https.get(url);

    // Register a function to handle the "response" event.
    request.on("response", response => {
        // The response event means that response headers have been received
        let httpStatus = response.statusCode;
        // The body of the HTTP response has not been received yet.
        // So we register more event handlers to to be called when it arrives.
        response.setEncoding("utf-8"); // We're expecting Unicode text
        let body = ""; // which we will accumulate here.
        // This event handler is called when a chunk of the body is ready
        response.on("data", chunk => { body += chunk; });
        // This event handler is called when the response is complete
        response.on("end", () => {
            if (httpStatus === 200) { // If the HTTP response was good
                callback(null, body); // Pass response body to the callback
            } else { // Otherwise pass an error
                callback(httpStatus, null);
            }
        });
    });
    // We also register an event handler for lower-level network errors
    request.on("error", (err) => {
        callback(err, null);
    });
}

function getJSON(url) {
    request = https.get(url);
    return new Promise((resolve, reject) => {
        request.on("response", response => {
            parseJSON(response, (err, json) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(json);
                }
            });
        });
    });
}

const urls = [ 
    /* zero or more URLs here */
    'https://www.panamericana.com.co/la-trampa-de-la-felicidad-deja-de-luchar-y-comienza-a-vivir/p?srsltid=AfmBOorZEKIEWUoSIBgspKBM74TSh0H8rugkORfZKJMiNqPcpeUPGl4w',
    'https://www.planetadelibros.com.co/libro-la-trampa-de-la-felicidad/243177',
    'https://www.librerialerner.com.co/la-trampa-de-la-felicidad-9788408276807arnoia/p?srsltid=AfmBOoqf-_1vVso1In67lDnuEejoVqcIXAevnPArL33sMCvumJbr59yy',
    'https://ww3.lectulandia.co/book/la-trampa-de-la-felicidad/'
];

// And convert it to an array of Promise objects
promises = urls.map(url => fetch(url).then(r => r.text()));
// Now get a Promise to run all those Promises in parallel
Promise.all(promises)
    .then(bodies => { console.log(bodies); })
    .catch(e => console.log(e));

Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(results => {
    results[0] // => { status: "fulfilled", value: 1 }
    results[1] // => { status: "rejected", reason: 2 }
    results[2] // => { status: "fulfilled", value: 3 }
});
