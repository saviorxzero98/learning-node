import * as Express from 'express';
import BodyParser = require('body-parser');
import Axios from 'axios';
import * as FormData from 'form-data';
import * as Stream from 'stream';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

const app = Express();

app.use(BodyParser.json());                             // for parsing application/json
app.use(BodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

const upload = multer({ dest: 'uploads/' });

// Document : https://axios-http.com

// Demo Config
const demoConfig = {
    host: "http://127.0.0.1",
    port: 8000,
}

// 設定靜態 HTML
let webPath = process.cwd();
let webrootPath = path.join(webPath, '/wwwroot');
if (fs.existsSync(webrootPath)) {
    app.use('/', Express.static(webrootPath));
}
else {
    app.get('/', (req, res) => {
        res.status(200).send('Demo Express');
        res.end();
    });
}

// Demo Request Usage
app.get('/getUsers', async (req, res) => {
    try {
        let opt = {
            // GET Option
            url : `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'GET',
            header: {}
        };
    
        let response = await Axios(opt);
    
        let statusCode = response.status;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.data;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getUserById', async (req, res) => {
    try {
        let opt = {
            // GET Option
            url : `${demoConfig.host}:${demoConfig.port}/users/${1}`,
            method: 'GET',
            header: {}
        };
    
        let response = await Axios(opt);
    
        let statusCode = response.status;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.data;
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
        bodyFormData.append('Id', '1');
        bodyFormData.append('Name', 'Emanuele');
        bodyFormData.append('Password', 'P@ss0rd');
        bodyFormData.append('Birth', '2022-01-01');
        let opt = {
            // GET Option
            //url : `${demoConfig.host}:${demoConfig.port}/users`,
            url: 'http://localhost:10446/api/country/form',
            method: 'POST',
            headers: {
                'Authorization': 'abc'
            },
            data: bodyFormData
            /*data: {
                Id: '1',
                Name: 'Emanuele',
                Password: 'P@ss0rd',
                Birth: '2022-01-01'
            }*/
        };
    
        let response = await Axios(opt);
    
        let statusCode = response.status;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.data;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.get('/postUsers', async (req, res) => {
    try {
        let opt = {
            // GET Option
            url : `${demoConfig.host}:${demoConfig.port}/users`,
            method: 'POST',
            header: {},
            data: [
                {id: 1, name: 'Emanuele'}, 
                {id: 2, name: 'Tessa'}
            ]
        };
    
        let response = await Axios(opt);
    
        let statusCode = response.status;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let data = response.data;
            res.status(200).send(data);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.get('/downloadFile', async (req, res) => {
    try {
        let opt = {
            // GET Option
            url : `https://www.google.com.tw/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`,
            method: 'GET',
            header: {}
        };
    
        let response = await Axios({ ...opt, responseType: 'stream' });
    
        let statusCode = response.status;

        if (!/^2\d\d$/.test(`${statusCode}`)) {
            console.log(statusCode);
            res.send(statusCode ?? 500);
        }
        else {
            let fileStream = new Stream.PassThrough();
            let data = response.data;
            response.data.pipe(fileStream);
            
            res.set('Content-Disposition', `attachment; filename=${encodeURIComponent('Image.png')}` );
            res.set('Content-Type', 'image/png');
            fileStream.pipe(res);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.post('/uploadFile', upload.single('text'), async (req, res) => {

});

app.get('/testUploadFile', async (req, res) => {
    let bodyFormData = new FormData();
    bodyFormData.append('text', Buffer.from('789', 'utf-8'), 'aaa.txt');

    let opt = {
        // GET Option
        //url : `${demoConfig.host}:${demoConfig.port}/users`,
        url: 'http://localhost:8000/uploadFile',
        method: 'POST',
        headers: {
            'Authorization': 'abc'
        },
        data: bodyFormData
        /*data: {
            Id: '1',
            Name: 'Emanuele',
            Password: 'P@ss0rd',
            Birth: '2022-01-01'
        }*/
    };

    let response = await Axios(opt);

    let statusCode = response.status;

    if (!/^2\d\d$/.test(`${statusCode}`)) {
        console.log(statusCode);
        res.send(statusCode ?? 500);
    }
    else {
        let data = response.data;
        res.status(200).send(data);
    }
})

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