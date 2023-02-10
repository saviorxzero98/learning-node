import Http = require('http');

const server = Http.createServer((request, response) => { 
    response.writeHead(200, {'Content-Type': 'text/plain'});

    switch(request.url) {
        case "/about":
            response.write('About');
            break;
        default:
            response.write('Hello World');
            break;
    }

	response.end(); 
}) 

server.listen(8000);