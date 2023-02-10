"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Path = require("path");
const FS = require("fs");
const BodyParser = require("body-parser");
const app = Express();
app.use(BodyParser.json()); // for parsing application/json
app.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
let rootPath = process.cwd();
let publicPath = Path.join(rootPath, '/public');
if (FS.existsSync(publicPath)) {
    app.use(Express.static(publicPath));
    console.log(`Public is ${publicPath}`);
}
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users', (req, res) => {
    const users = [{ id: 1, name: 'Emanuele' }, { id: 2, name: 'Tessa' }];
    res.send(users);
});
app.get('/users/:id', (req, res) => {
    res.send(`You Get users ${req.params.id} ${req.query.name}`);
});
app.post('/users', (req, res) => {
    console.log(req.body);
    res.send("You Post users");
});
app.put('/users/:id', (req, res) => {
    console.log(req.body);
    res.send(`You Put users ${req.params.id}`);
});
app.delete('/users/:id', (req, res) => {
    console.log(req.body);
    res.send(`You Delete users ${req.params.id}`);
});
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map