const { Socket } = require('engine.io');
const express=require('express')
const app=express();
const server= require('http').Server(app);
const io=require('socket.io')(server);
const {v4:uuidV4}=require('uuid');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.redirect(`/${uuidV4()}`)
});
app.get('/:room',function(req,res){
    res.render('room', {roomId:req.params.room});
});

io.on('connection', socket =>{
    socket.on('join-room', (roomId,userId) =>{
        socket.join(roomId);
        io.to(roomId).emit('user-connected', userId);
    });
});

server.listen(process.env.PORT||3000,function(){
    console.log('started server on port 3000')
});
