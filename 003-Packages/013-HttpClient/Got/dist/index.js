"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const BodyParser = require("body-parser");
const got_1 = require("got");
const FormData = require("form-data");
const Stream = require("stream");
const app = Express();
app.use(BodyParser.json()); // for parsing application/json
app.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Document : https://github.com/sindresorhus/got/tree/main/documentation
// Demo Config
const demoConfig = {
    host: "http://127.0.0.1",
    port: 8000,
};
// Demo Request Usage
app.get('/getUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield (0, got_1.default)({
            url: `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'GET',
            headers: {}
        });
        let statusCode = response.statusCode;
        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode !== null && statusCode !== void 0 ? statusCode : 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/getUserById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield (0, got_1.default)({
            url: `${demoConfig.host}:${demoConfig.port}/users/${1}`,
            method: 'GET',
            headers: {}
        });
        let statusCode = response.statusCode;
        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode !== null && statusCode !== void 0 ? statusCode : 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/postUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('id', '1');
        bodyFormData.append('name', 'Emanuele');
        let response = yield (0, got_1.default)({
            url: `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'POST',
            headers: {},
            body: bodyFormData
        });
        let statusCode = response.statusCode;
        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode !== null && statusCode !== void 0 ? statusCode : 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/postUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield (0, got_1.default)({
            url: `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'POST',
            headers: {},
            body: JSON.stringify([
                { id: 1, name: 'Emanuele' },
                { id: 2, name: 'Tessa' }
            ])
        });
        let statusCode = response.statusCode;
        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode !== null && statusCode !== void 0 ? statusCode : 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/downloadFile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileStream = new Stream.PassThrough();
        got_1.default.stream({
            url: `https://www.google.com.tw/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`,
            method: 'GET',
            headers: {},
            isStream: true
        }).pipe(fileStream);
        res.set('Content-Disposition', `attachment; filename=${encodeURIComponent('Image.png')}`);
        res.set('Content-Type', 'image/png');
        fileStream.pipe(res);
    }
    catch (error) {
        res.status(500).send(error);
    }
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
    //res.send(`You Get users ${req.params.id}\n${jsonString}`);
    const users = [{ id: '1', name: 'Emanuele' }, { id: '2', name: 'Tessa' }];
    if (req.params && req.params.id) {
        var userId = req.params.id;
        for (let user of users) {
            if (user.id === userId) {
                res.send(user);
                return;
            }
        }
    }
    res.send(users);
});
app.post('/users', (req, res) => {
    console.log(`You post a data.`, req.body);
    //res.send("Thank You! You Post Data Success");
    const users = [{ id: '1', name: 'Emanuele' }, { id: '2', name: 'Tessa' }];
    if (req.body && req.body.userId) {
        var userId = req.body.userId;
        for (let user of users) {
            if (user.id === userId) {
                res.send(user);
                return;
            }
        }
    }
    res.send(users);
});
app.use(BodyParser.urlencoded({ extended: true }));
app.post('/books', function (req, res) {
    const books = [{ id: '1', name: 'Emanuele' }, { id: '2', name: 'Tessa' }];
    if (req.body && req.body.bookId) {
        var bookId = req.body.bookId;
        for (let book of books) {
            if (book.id === bookId) {
                res.send(book);
                return;
            }
        }
    }
    res.send(books);
});
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map