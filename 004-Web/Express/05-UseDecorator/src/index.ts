import * as express from 'express';
import * as xmlparser from 'express-xml-bodyparser';
import * as path from 'path';
import * as fs from 'fs';
import * as loki from 'lokijs';
import * as swaggerUi from 'swagger-ui-express';
import { ExpressRegister } from './expressDescriptor';
import { DemoController } from './userController';
import { InMemoryDatabase } from './memoryDatabase';
const swaggerDocument = require('../swagger.json');

// 建立 Express
const app = express();

// 設定 Body Parser
app.use(express.json());                             // for parsing application/json
app.use(express.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
app.use(xmlparser());                                // for parsing application/xml
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// In-Memory Database
let memoryDb = new loki('memory.db', {
    persistenceMethod: 'memory'
});
InMemoryDatabase.initialize(memoryDb);

// 註冊 Controller
ExpressRegister.register(app, [
    new DemoController()
]);

// 設定 Post
app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});