"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const server = Http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    switch (request.url) {
        case "/about":
            console.log('Get About 200');
            response.write('About');
            break;
        default:
            console.log('Get Index 200');
            response.write('Hello World');
            break;
    }
    response.end();
});
server.listen(3000);
console.log("Start server, listen port 3000");
//# sourceMappingURL=index.js.map