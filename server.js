var express=require('express');
var app=express();
var server =require('http').createServer(app);
var io=require('socket.io').listen(server);
users=[];
connections=[];	

server.listen(process.env.PORT || 9000);
console.log('server running...');

//C:\Users\AAKASH\Desktop\New folder\iochat

app.get('./',function(req,res){
	res.sendFile(console.log(__dirname) + '/index.html');
});

io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected',connections.length);
 
   //Disconnected
   socket.on('disconnect',function(data){
   	
   	users.splice(users.indexof(socket.username),1);
   	updateUsernames();
connections.splice(connections.indexof(socket),1);
   console.log('Disconnected: %s sockets connected',connections.length);
   });

  //Send Message
   socket.on('send message',function(data){
    console.log(data);
   	io.sockets.emit('new message',{msg:data,user:socket.username});
   });
   
   //New users
   socket.on('new user',function(data,callback){
   	callback(true);
   	socket.username=data;
   	users.push(socket.username);
   	updateUsernames();
   });
   function updateUsernames(){
   	io.sockets.emit('get users',users);
   }

});