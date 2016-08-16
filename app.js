//get the http module:
var http = require('http');
//fs module allows us to read and write content for responses!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request,response){
	//This line creates the web server.  The createServer() method takes a parameter, namely, a callback function with a request and response parameter.  The request and response parameters are the HTTP request made by the client and captured by the server and the HTTP response and serve back to the client! 
	// see what URL the clients are requesting:
	console.log('client request URL: ', request.url);
	//routing:
	if(request.url === '/') {
		fs.readFile('index.html', 'utf8', function (errors, contents){
			//The 'UTF8' is the encoding of the file.  Telling the fs object what type of characters to expect in the file it's opening.
			response.writeHead(200, {'Content-Type': 'text/html'}); //send data about response
			//We call the response.writeHead() method.  This method sends the headers for the response along with a status code.  A header is the part of a response that contains the specifics of the response. Tell the browser what type of response serving.  The status code is a code that tells the browser the status of the response.  Any status code in the 200's or 300's is good.  Anything in the 400's to the 500's is bad.  For now, we just put 200.
			response.write(contents); // send response body
			//Send the response to the client using the response.write() method, which just sends the contents of the files to the client.
			response.end(); // finished!
			//Since a response might contain multiple chunks of data, we call response.end() when we are finished. 
		});
	}
    else if (request.url === "/dojos/new") {
         fs.readFile('dojos.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents); 
             response.end();
         });
    }
    else if (request.url === "/ninjas") {
         fs.readFile('ninjas.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents); 
             response.end();
         });
    }
	// if request didn't match anything:
	else {
		response.writeHead(404);
		response.end('File not found!');
	}
});

server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");