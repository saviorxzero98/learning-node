import * as Express from 'express';
import Path = require('path');
import Http = require('http');
import SocketIo = require('socket.io');

const app = Express();
const http = Http.createServer(app);
const io = SocketIo.listen(http) ;
 
io.on('connection', socket => { 
    //console.log('a new user is connected'); 
    socket.emit('hello-client',  { 
        user: 'Bot',
        message: 'Hello'
    });

    socket.on('send-message-to-server', data => {
        console.log(data);

        setTimeout(() => { 
            var response =  { 
            user: 'Bot',
            message: `You say "${data.message}"`
        };
        socket.emit('send-message-to-client', response);
        console.log(response);
        }, 500);
    });
}); 

app.get('/', (req, res) => {
    // Get Views Folder Path
    const viewsPath = Path.join(__dirname, "../views/index.html");

    res.sendFile(viewsPath);
})

http.listen(3000, () => { 
    console.log('listening on *:3000'); 
});