import * as Express from 'express';
const app = Express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const users = [{id: 1, name: 'Emanuele'}, {id: 2, name: 'Tessa'}];
    res.send(users);
});
 
app.get('/users/:id', (req, res) => { 
    res.send(`You Get users ${req.params.id} ${req.query.name}` );
});
 
app.post('/users', (req, res) => { 
    res.send("You Post users");
});
 
app.put('/users/:id', (req, res) => { 
    res.send(`You Put users ${req.params.id}`);
});
 
app.delete('/users/:id', (req, res) => { 
    res.send(`You Delete users ${req.params.id}`);
});

app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});