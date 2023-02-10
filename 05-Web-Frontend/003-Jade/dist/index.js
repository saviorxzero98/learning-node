"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Path = require("path");
const app = Express();
// Get Views Folder Path
const viewsPath = Path.join(__dirname, "../views");
// Set Config
app.set('view engine', 'jade');
app.set('views', viewsPath);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/hello', function (req, res) {
    res.render('world', {
        title: 'Hey',
        messageTitle: 'Hello noders',
        messageText: 'lorem ipsum....'
    });
});
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map