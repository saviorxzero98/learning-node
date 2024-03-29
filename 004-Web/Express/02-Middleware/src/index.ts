import * as express from 'express';
const app = express();

// Use Middleware
//app.use(myMiddleware);
//app.use(checkPermissionMiddleware);

// GET
app.get('/users', checkPermissionMiddleware, checkMorePermissionMiddleware, (req, res) => { 
    console.log("User");
	console.log(res.locals.premission);
	console.log(res.locals.morePression);
    res.status(200).send('OK');
});

// Listen
app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});

// Middleware Function
function myMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) { 
    console.log("Hi Middleware");
    next();
} 
function checkPermissionMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){ 
    console.log("Check Permission Middleware");
    res.locals.premission = { user: 'User', token: 'Token', expires: new Date().getTime() }
    next();
}
function checkMorePermissionMiddleware(req: express.Request, res: express.Response, next: express.NextFunction){ 
    console.log("Check More Permission Middleware");
	res.locals.morePression = { id: 'Id', expires: new Date().getTime() }
    next();
}