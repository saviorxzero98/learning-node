"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const path = require("path");
const fs = require("fs");
const loki = require("lokijs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');
// 建立 Express
const app = express();
// 設定 Body Parser
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(xmlparser()); // for parsing application/xml
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 設定靜態 HTML
let webPath = process.cwd();
let webrootPath = path.join(webPath, '/wwwroot');
if (fs.existsSync(webrootPath)) {
    app.use('/', express.static(webrootPath));
}
else {
    app.get('/', (req, res) => {
        res.status(200).send('Demo Express');
        res.end();
    });
}
// In-Memory Database
let memoryDb = new loki('memory.db', {
    persistenceMethod: 'memory'
});
function getUsers() {
    let collection = memoryDb.getCollection('users');
    if (collection === null) {
        collection = memoryDb.addCollection('users');
    }
    return collection;
}
// 設定 API Router
app.get('/users', (req, res) => {
    let users = getUsers().find();
    res.status(200).send(users);
    res.end();
});
app.get('/users/:id', (req, res) => {
    console.log(req.params);
    console.log(req.query);
    let userId = req.params.id;
    if (userId) {
        let user = getUsers().findOne({ id: { '$gte': userId } });
        res.status(200).send(user);
        res.end();
    }
    else {
        res.status(200).send([]);
        res.end();
    }
});
app.post('/users', (req, res) => {
    console.log(req.body);
    getUsers().insert(req.body);
    res.status(200).send("You Post users");
    res.end();
});
app.put('/users/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let userId = req.params.id;
    let data = req.body;
    if (userId && data && data['name']) {
        getUsers().findAndUpdate({ id: { '$gte': userId } }, (record) => {
            record.name = data['name'];
        });
        res.status(200).send(`You Put users ${req.params.id}`);
        res.end();
    }
    else {
        res.status(500).end();
    }
});
app.delete('/users/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let userId = req.params.id;
    if (userId) {
        getUsers().findAndRemove({ id: { '$gte': userId } });
        res.status(200).send(`You Delete users ${req.params.id}`);
        res.end();
    }
    else {
        res.status(500).end();
    }
});
app.post('/xml/user/:id', (req, res) => {
    console.log(req.body);
    getUsers().insert(req.body);
    res.status(200);
    res.end();
});
// 設定 Post
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map