"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const path = require("path");
const fs = require("fs");
const loki = require("lokijs");
const swaggerUi = require("swagger-ui-express");
const expressDescriptor_1 = require("./expressDescriptor");
const userController_1 = require("./userController");
const memoryDatabase_1 = require("./memoryDatabase");
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
memoryDatabase_1.InMemoryDatabase.initialize(memoryDb);
// 註冊 Controller
expressDescriptor_1.ExpressRegister.register(app, [
    new userController_1.DemoController()
]);
// 設定 Post
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map