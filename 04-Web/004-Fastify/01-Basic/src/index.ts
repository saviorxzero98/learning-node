import fastify from 'fastify';
import fastifyStatic  from 'fastify-static';
import * as path from 'path';
import * as fs from 'fs';

const server = fastify({
    logger: true,
});

// 設定靜態 HTML
let webPath = process.cwd();
let webrootPath = path.join(webPath, '/wwwroot');
if (fs.existsSync(webrootPath)) {
    server.register(fastifyStatic, {
        prefix: '',
        root: webrootPath
    })
}
else {
    server.get('/', (request, reply) => {
        reply.status(200).send('Demo Fastify');
    });   
}

// 設定 API Router
server.get('/users', (request, reply) => {
    const users = [
        {id: 1, name: 'Ace'},
        {id: 2, name: 'Jack'}
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