"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Restify = require("restify");
const RestifyClients = require("restify-clients");
const RestifyErrors = require("restify-errors");
// Document : https://github.com/restify/node-restify
const server = Restify.createServer({
    name: 'My Restify Demo App',
    version: '1.0.0'
});
server.use(Restify.plugins.acceptParser(server.acceptable));
server.use(Restify.plugins.queryParser());
server.use(Restify.plugins.bodyParser());
// Document : https://github.com/restify/clients
// Demo Config
const demoConfig = {
    host: "http://127.0.0.1",
    port: 8000,
};
// Demo Request Usage
server.get('/getUsers', (req, res, next) => {
    let client = RestifyClients.createJsonClient({
        url: `${demoConfig.host}:${demoConfig.port}/users`,
    });
    let opt = {
        // GET Option
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        header: {}
    };
    client.get(opt, (error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            try {
                var data = JSON.parse(resMsg.body);
                res.send(data);
            }
            catch (e) {
                res.send(RestifyErrors.InternalServerError);
            }
        }
        res.end();
    });
    return next();
});
server.get('/getUserById', (req, res, next) => {
    let client = RestifyClients.createStringClient({
        url: `${demoConfig.host}:${demoConfig.port}/users/${1}`,
    });
    let opt = {
        header: {}
    };
    client.get(opt, (error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            res.send(resMsg.body);
        }
        res.end();
    });
    return next();
});
server.get('/postUser', (req, res, next) => {
    let client = RestifyClients.createStringClient({
        url: `${demoConfig.host}:${demoConfig.port}/users`,
    });
    // Post Option
    let opt = {
        header: {},
        body: {
            id: 1,
            name: 'Emanuele'
        }
    };
    client.post(opt, opt.body, (error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            res.send(resMsg.body);
        }
        res.end();
    });
    return next();
});
server.get('/postUsers', (req, res, next) => {
    let client = RestifyClients.createJsonClient({
        url: `${demoConfig.host}:${demoConfig.port}/users`,
    });
    // Post Option
    let opt = {
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        header: {},
        body: [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }]
    };
    client.post(opt, opt.body, (error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            res.send(resMsg.body);
        }
        res.end();
    });
    return next();
});
// WebApi
server.get('/', (req, res, next) => {
    res.send('Hello World!');
    return next();
});
server.get('/users', (req, res, next) => {
    const users = [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }];
    res.send(users);
    return next();
});
server.get('/users/:id', (req, res, next) => {
    let jsonString = JSON.stringify({ id: 1, name: 'Emanuele' });
    res.send(`You Get users ${req.params.id}\n${jsonString}`);
    return next();
});
server.post('/users', (req, res, next) => {
    console.log(`You post a data.`, req.body);
    res.send(`Thank You! You Post Data Success`);
    return next();
});
server.listen(8000, () => {
    console.log(`Example app "${server.name}" listening on port 8000!`);
});
//# sourceMappingURL=index.js.map