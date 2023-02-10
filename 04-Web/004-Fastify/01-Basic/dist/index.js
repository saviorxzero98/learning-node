"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const fastify_static_1 = require("fastify-static");
const path = require("path");
const fs = require("fs");
const server = fastify_1.default({
    logger: true,
});
// 設定靜態 HTML
let webPath = process.cwd();
let webrootPath = path.join(webPath, '/wwwroot');
if (fs.existsSync(webrootPath)) {
    server.register(fastify_static_1.default, {
        prefix: '',
        root: webrootPath
    });
}
else {
    server.get('/', (request, reply) => {
        reply.status(200).send('Demo Fastify');
    });
}
// 設定 API Router
server.get('/users', (request, reply) => {
    const users = [
        { id: 1, name: 'Ace' },
        { id: 2, name: 'Jack' }
    ];
    reply.status(200).send(users);
});
server.get('/users/:id', (request, reply) => {
    console.log(request.params);
    console.log(request.query);
    reply.status(200)
        .send(`You Get users ${request.params['id']} ${request.query['name']}`);
});
server.post('/users', (request, reply) => {
    console.log(request.body);
    reply.status(200).send("You Post users");
});
server.put('/users/:id', (request, reply) => {
    console.log(request.params);
    console.log(request.body);
    reply.status(200).send(`You Put users ${request.params['id']}`);
});
server.delete('/users/:id', (request, reply) => {
    console.log(request.params);
    console.log(request.body);
    reply.status(200).send(`You Delete users ${request.params['id']}`);
});
// Listen Port
server.listen(8000, function () {
    console.log(`Example app listening on port 8000!`);
});
//# sourceMappingURL=index.js.map