import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import { HttpResponse } from './httpUtils';

// 建立 Express
const app = express();

// 設定 Body Parser
app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

// 設定靜態 HTML
let webPath = process.cwd();
let webrootPath = path.join(webPath, '/wwwroot');
if (fs.existsSync(webrootPath)) {
    app.use('/', express.static(webrootPath));
}
else {
    app.get('/', (req: express.Request, res: express.Response) => {
        res.status(200).send('Demo Express');
        res.end();
    });
}

// 設定 API Router
app.get('/file', (req: express.Request, res: express.Response) => {
    let fileName = 'demo.txt';
    let filePath = path.join(webrootPath, fileName);
    
    let response = HttpResponse.create(res);
    response.file(filePath, fileName);
});

app.get('/users', (req: express.Request, res: express.Response) => {
    const users = [
        {id: 1, name: 'Ace'},
        {id: 2, name: 'Jack'}
    ];
    const ESAPI = require('node-esapi');
    let json = JSON.stringify(users);
    let result = ESAPI.encoder().encodeForJavaScript(users);
    res.send(result);

    //let response = HttpResponse.create(res);
    //response.json(users).end();
});
 
app.get('/users/:id', (req: express.Request, res: express.Response) => {
    console.log(req.params);
    console.log(req.query);
    
    let response = HttpResponse.create(res);
    response.text(`<h1>Demo</h1>`, 'text/plain').end();
    response.text(`You Get users ${req.params.id} ${req.query.name}`).end();
});
 
app.post('/users', (req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.status(200).send("You Post users");
    res.end();
});
 
app.put('/users/:id', (req: express.Request, res: express.Response) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send(`You Put users ${req.params.id}`);
    res.end();
});
 
app.delete('/users/:id', (req: express.Request, res: express.Response) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send(`You Delete users ${req.params.id}`);
    res.end();
});

// 設定 Post
app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});