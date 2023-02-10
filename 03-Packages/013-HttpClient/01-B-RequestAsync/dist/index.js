"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const HttpStatus = require("http-status-codes");
const BodyParser = require("body-parser");
const RequestAsync_1 = require("./RequestAsync");
const app = Express();
app.use(BodyParser.json()); // for parsing application/json
app.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Document : https://github.com/request/request
// Demo Config
const demoConfig = {
    host: "http://127.0.0.1",
    port: 8000,
};
// Demo Request Usage
app.get('/getUsers', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let opt = {
        // GET Option
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        method: 'GET',
        header: {}
    };
    let { error, response, body } = yield RequestAsync_1.RequestAsync(opt);
    let statusCode = response.statusCode;
    if (error || !/^2\d\d$/.test(`${statusCode}`)) {
        console.log(error);
        res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    else {
        try {
            var data = JSON.parse(body);
            res.status(200).send(data);
        }
        catch (e) {
            res.send(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    res.end();
}));
app.get('/getUserById', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let opt = {
        // GET Option
        url: `${demoConfig.host}:${demoConfig.port}/users/${1}`,
        method: 'GET',
        header: {}
    };
    let { error, response, body } = yield RequestAsync_1.RequestAsync(opt);
    let statusCode = response.statusCode;
    if (error || !/^2\d\d$/.test(`${statusCode}`)) {
        console.log(error);
        res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    else {
        res.status(200).send(body);
    }
    res.end();
}));
app.get('/postUser', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Post Option
    let opt = {
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        method: 'POST',
        header: {},
        form: {
            id: 1,
            name: 'Emanuele'
        }
    };
    let { error, response, body } = yield RequestAsync_1.RequestAsync(opt);
    let statusCode = response.statusCode;
    if (error || !/^2\d\d$/.test(`${statusCode}`)) {
        console.log(error);
        res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    else {
        res.status(200).send(body);
    }
    res.end();
}));
app.get('/postUsers', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Post Option
    let opt = {
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        method: 'POST',
        header: {},
        json: [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }]
    };
    let { error, response, body } = yield RequestAsync_1.RequestAsync(opt);
    let statusCode = response.statusCode;
    if (error || !/^2\d\d$/.test(`${statusCode}`)) {
        console.log(error);
        res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    else {
        res.status(200).send(body);
    }
    res.end();
}));
// WebApi
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users', (req, res) => {
    const users = [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }];
    res.send(users);
});
app.get('/users/:id', (req, res) => {
    let jsonString = JSON.stringify({ id: 1, name: 'Emanuele' });
    res.send(`You Get users ${req.params.id}\n${jsonString}`);
});
app.post('/users', (req, res) => {
    console.log(`You post a data.`, req.body);
    res.send("Thank You! You Post Data Success");
});
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map