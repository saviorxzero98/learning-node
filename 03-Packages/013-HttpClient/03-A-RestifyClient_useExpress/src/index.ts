import * as Express from 'express';
import RestifyClients = require('restify-clients');
import RestifyErrors = require('restify-errors');
import BodyParser = require('body-parser');


const app = Express();
app.use(BodyParser.json());                             // for parsing application/json
app.use(BodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

// Document : https://github.com/restify/clients

// Demo Config
const demoConfig = {
    host: "http://127.0.0.1",
    port: 8000,
}

// Demo Request Usage
app.get('/getUsers', (req, res) => {
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
                res.status(200).send(data);
            }
            catch (e) {
                res.send(RestifyErrors.InternalServerError);
            }
        }
        res.end();
    });
});

app.get('/getUserById', (req, res) => {
    let client = RestifyClients.createStringClient({
        url: `${demoConfig.host}:${demoConfig.port}/users/${1}`,
    });

    let opt = {
        header: {}
    };
    client.get(opt,(error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            res.status(200).send(resMsg.body);
        }
        res.end();
    });
});

app.get('/postUser', (req, res) => {
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
    }

    client.post(opt, opt.body,(error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            res.status(200).send(resMsg.body);
        }
        res.end();
    });
});

app.get('/postUsers', (req, res) => {
    let client = RestifyClients.createJsonClient({
        url: `${demoConfig.host}:${demoConfig.port}/users`,
    });

    // Post Option
    let opt = {
        url: `${demoConfig.host}:${demoConfig.port}/users`,
        header: {},
        body: [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }]
    }

    client.post(opt, opt.body,(error, reqMsg, resMsg, obj) => {
        // Callback
        let statusCode = resMsg.statusCode;
        if (error || !/^2\d\d$/.test(`${statusCode}`)) {
            console.log(error);
            res.send(statusCode || RestifyErrors.InternalServerError);
        }
        else {
            res.status(200).send(resMsg.body);
        }
        res.end();
    });
});

// WebApi
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const users = [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }];
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    let jsonString = JSON.stringify({id: 1, name: 'Emanuele'});
    res.send(`You Get users ${req.params.id}\n${jsonString}`);
});

app.post('/users', (req, res) => {
    console.log(`You post a data.`, req.body);
    res.send("Thank You! You Post Data Success");
});


app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});