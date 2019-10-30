// const io = require('socket')(3000)

// io.on('connection',socket =>{
//     socket.emit('chat-message','hello world')
// })
const express = require("express");

// const http = require('http');

const app = express();
const server = app.listen(8000);
const io = require("socket.io").listen(server);
const port = 8000;
// io.listen(port)
// io.listen(port);
console.log("listening on port ", port);

// const io = new WebSocket.Server({ port: 8989 })

const users = [];
socketId = null;
// const broadcast = (data, socket) => {
// 	io.clients.forEach((client) => {
// 		if (client.readyState === WebSocket.OPEN && client !== socket ) {
// 			client.send(JSON.stringify(data))
// 		}
// 	})
// }

io.on("connection", socket => {
  console.log(socket.id);
  // socket.on('MESSAGE_RECEIVED', function (data, callback) {
  //     console.log('Socket (server-side): received message:', data);
  //     var responseData = {
  // 		status:'delivered'
  //     };
  //     //console.log('connection data:', evData);
  //     callback(responseData);
  // });

  // socket.on('testmessage',(data)=>{
  // 	socket.emit('testmessage',data);
  // })
  // here returning status via callback
  // socket.on('status',(callback)=>{
  // 	stat='delivered';
  // 	console.log('returning status');
  // 	callback(stat);
  // })

  // socket.emit('ADD_USER',{name:'hari'})
  // socket.emit('USERS_LIST',
  // {
  // 	users:[{name:'kiran'},{name:'hariiiiikiii'}]
  // })

  //   socket.on('ADD_USER',name=>{
  // 	  socket.broadcast.emit('ADD_USER',{
  // 		type: 'ADD_USER',
  // 		users
  // 	})
  //   })
  // socket.emit('USERS_LIST',{users})
  let index = users.length;
  socket.on("ADD_USER", data => {
    // console.log('connected users are',data)

    users.push({ name: data.name, id: index + 1 });
    console.log("connected users are...", users);
    // socket.broadcast.emit('USERS_LIST',{type:'USERS_LIST', users})
    io.sockets.emit("USERS_LIST", { type: "USERS_LIST", users });
    // socket.emit('ADD_USER',{type:data.type,name:data.name})
  });

  socket.on("dispatched", data => {
    console.log("msg deliverd or not: ", data);
    socket.to(socketId).emit("dispatched", data); // sending delivery status to only the sender of msg.
  });
  socket.on("seen", data => {
    console.log("message seen by", data);
    socket.to(socketId).emit("seen", data);
  });
  socket.on("message", message => {
    console.log("msg is", message);
    console.log("server is running , data is", JSON.parse(message));
    const data = JSON.parse(message);

    switch (data.type) {
      // case 'ADD_USER':
      // 	index = users.length
      // 	users.push({ name: data.name, id: index + 1})
      // 	 console.log('add user console users are',users);
      // 	socket.broadcast.emit('ADD_USER',{
      // 		type: 'ADD_USER',
      // 		users
      // 	})
      // 	socket.broadcast.emit('USERS_LIST',{
      // 		type: 'USERS_LIST',
      // 		users
      // 	})
      // 	break

      case "ADD_MESSAGE":
        console.log("add msg console", data.message, socket.id);
        socketId = socket.id;
        // emiting data on ADD_MESSAGE action
        socket.broadcast.emit("ADD_MESSAGE", {
          type: "ADD_MESSAGE",
          message: data.message,
          author: data.author
        });
      // socket.emit('MESSAGE_RECEIVED',{payload:socket.id},(status)=>{
      // 	console.log('message status is',status);
      // 	})

      // socket.emit('statuss',(statusdata)=>{
      // 	console.log('delivery status ',statusdata);
      // })
      // break
      // default:
      // break
    }
  });
  //   let clientObjects = io.connected
  //   console.log('length is',users)
  socket.on("disconnect", () => {
    console.log("disconnected a user", users);

    users.splice(index, 1);
    console.log("after users", users);
    socket.broadcast.emit("USERS_LIST", {
      type: "USERS_LIST",
      users
    });
  });
});
