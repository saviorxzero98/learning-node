import * as Express from 'express';
import BodyParser = require('body-parser');
import got from 'got';
import * as FormData from 'form-data';
import * as Stream from 'stream';

const app = Express();

app.use(BodyParser.json());                             // for parsing application/json
app.use(BodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded


// Document : https://github.com/sindresorhus/got/tree/main/documentation

// Demo Config
const demoConfig = {
    host: "http://127.0.0.1",
    port: 8000,
}

// Demo Request Usage
app.get('/getUsers', async (req, res) => {
    try {
        let response = await got({
            url: `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'GET',
            headers: {}
        });

        let statusCode = response.statusCode;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getUserById', async (req, res) => {
    try {
        let response = await got({
            url: `${demoConfig.host}:${demoConfig.port}/users/${1}`,
            method: 'GET',
            headers: {}
        });
    
        let statusCode = response.statusCode;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/postUser', async (req, res) => {
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('id', '1');
        bodyFormData.append('name', 'Emanuele');

        let response = await got({
            url: `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'POST',
            headers: {},
            body: bodyFormData
        });
    
        let statusCode = response.statusCode;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.get('/postUsers', async (req, res) => {
    try {
        let response = await got({
            url: `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'POST',
            headers: {},
            body: JSON.stringify([
                {id: 1, name: 'Emanuele'}, 
                {id: 2, name: 'Tessa'}
            ])
        });
    
        let statusCode = response.statusCode;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.body;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/downloadFile', async (req, res) => {
    try {
        let fileStream = new Stream.PassThrough();
        got.stream({
            url: `https://www.google.com.tw/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`,
            method: 'GET',
            headers: {},
            isStream: true
        }).pipe(fileStream);

        res.set('Content-Disposition', `attachment; filename=${encodeURIComponent('Image.png')}` );
        res.set('Content-Type', 'image/png');
        fileStream.pipe(res);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

// WebApi
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const users = [{id: 1, name: 'Emanuele'}, {id: 2, name: 'Tessa'}];
    res.send(users);
});
 
app.get('/users/:id', (req, res) => { 
    let jsonString = JSON.stringify({id: 1, name: 'Emanuele'});
    //res.send(`You Get users ${req.params.id}\n${jsonString}`);

    const users = [{id: '1', name: 'Emanuele'}, {id: '2', name: 'Tessa'}];

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

    const users = [{id: '1', name: 'Emanuele'}, {id: '2', name: 'Tessa'}];

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

app.post('/books', function(req, res) {
    const books = [{id: '1', name: 'Emanuele'}, {id: '2', name: 'Tessa'}];

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

app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});