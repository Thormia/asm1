var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req,res,ext)
{
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static('public'));

io.on('connection',function(client)
{
    console.log('client connected');
    client.on('join', function(data){
        console.log(data);
    });
    client.on('message',function(data){
        client.emit('thread',data);
        client.broadcast.emit('thread', data);
    })
});

const port = 8000
server.listen(port, () =>{
    console.log("Server running on port" + port)
});