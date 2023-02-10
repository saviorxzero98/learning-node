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
const HttpStatus = require("http-status-codes");
const BodyParser = require("body-parser");
const Request = require("request");
const Stream = require("stream");
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
app.get('/getUsers', (req, res) => {
    let opt = {
        // GET Option
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        method: 'GET',
        header: {}
    };
    Request(opt, (error, resMsg, body) => {
        // Callback
        let statusCode = resMsg.statusCode;
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
    });
});
app.get('/getUserById', (req, res) => {
    let opt = {
        // GET Option
        url: `${demoConfig.host}:${demoConfig.port}/users/${1}`,
        method: 'GET',
        header: {}
    };
    Request(opt, (error, resMsg, body) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            res.status(200).send(body);
        }
        res.end();
    });
});
app.get('/postUser', (req, res) => {
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
    Request(opt, (error, resMsg, body) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            res.status(200).send(body);
        }
        res.end();
    });
});
app.get('/postUsers', (req, res) => {
    // Post Option
    let opt = {
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        method: 'POST',
        header: {},
        json: [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }]
    };
    Request(opt, (error, resMsg, body) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            res.status(200).send(body);
        }
        res.end();
    });
});
app.get('/downloadFile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let opt = {
        // GET Option
        url: `https://www.google.com.tw/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`,
        method: 'GET',
        header: {}
    };
    Request(opt, (error, resMsg, body) => {
        res.status(HttpStatus.OK);
    }).on('response', (response) => {
        try {
            let fileStream = new Stream.PassThrough();
            response.pipe(fileStream);
            res.set('Content-Disposition', `attachment; filename=${encodeURIComponent('Image.png')}`);
            res.set('Content-Type', 'image/png');
            fileStream.pipe(res);
        }
        catch (e) {
            res.send(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
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