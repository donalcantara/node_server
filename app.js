//get the http module:
var http = require('http');
//fs module allows us to read and write content for responses!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request,response){
	//This one line creates our web server.  This is extremely powerful and concise.  You'll notice the createServer() method takes a parameter, namely, a callback function with a request and response parameter.  Hmm...what do you think the request and response parameters are?  They are the HTTP request made by the client and captured by the server and the HTTP response we will prepare and serve back to the client! 
	// see what URL the clients are requesting:
	console.log('client request URL: ', request.url);
	//this is how we do routing:
	if(request.url === '/') {
		fs.readFile('index.html', 'utf8', function (errors, contents){
			//The 'UTF8' is the encoding of the file.  Here, we're telling the fs object what type of characters to expect in the file it's opening. You will need to include this line for any text-based document you serve, remember this!!
			response.writeHead(200, {'Content-Type': 'text/html'}); //send data about response
			//Notice the first thing we do is call the response.writeHead() method.  This method sends the headers for our response along with a status code.  A header is the part of a response that contains the specifics of the response. We need to tell the browser what type of response we're serving.  The status code is a code that tells the browser the status of the response.  Any status code in the 200's or 300's is good.  Anything in the 400's to the 500's is bad.  For now, just always put a 200 as your status code on any valid request.
			response.write(contents); // send response body
			//After all of that, we finally send the response to the client using the response.write() method, which just sends the contents of the files to the client.
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
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");