"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const path = require("path");
const fs = require("fs");
// 建立 Server
const server = restify.createServer({
    name: 'My Restify Demo App',
    version: '1.0.0'
});
// 設定 Body Parser
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
// 設定靜態 HTML
let webPath = process.cwd();
let webrootPath = path.join(webPath, '/wwwroot');
if (fs.existsSync(webrootPath)) {
    server.get('/*', restify.plugins.serveStatic({
        directory: webrootPath,
        file: 'index.html'
    }));
}
else {
    server.get('/', (req, res, next) => {
        res.send('Demo Restify');
        return next();
    });
}
// 設定 API Router
server.get('/users', (req, res, next) => {
    const users = [
        { id: 1, name: 'Ace' },
        { id: 2, name: 'Jack' }
    ];
    res.send(users);
    return next();
});
server.get('/users/:id', (req, res, next) => {
    console.log(req.params);
    console.log(req.query);
    res.send(`You Get users ${req.params.id} ${req.query.name}`);
    return next();
});
server.post('/users', (req, res, next) => {
    console.log(req.body);
    res.send("You Post users");
    return next();
});
server.put('/users/:id', (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
    res.send(`You Put users ${req.params.id}`);
    return next();
});
server.del('/users/:id', (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
    res.send(`You Delete users ${req.params.id}`);
    return next();
});
// Listen Port
server.listen(8000, function () {
    console.log(`Example app "${server.name}" listening on port 8000!`);
});
//# sourceMappingURL=index.js.map