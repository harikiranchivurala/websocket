import openSocket from "socket.io-client";
import * as types from "../constants/ActionTypes";
import {
  addUser,
  messageReceived,
  populateUsersList,
  deliveryStatus,
  seenStatus
} from "../actions";

const setupSocket = (dispatch, username) => {
  // const socket = new WebSocket('ws://localhost:8989')
  const socket = openSocket("http://localhost:8000");
  console.log("socket running");
// to check whether the window is opened or not..
  // window.onblur = function (){
  //   console.log('onblur running')
  // }
  // window.onfocus = function (){
  //   console.log('onfocus running')
  // }

  //   Emit events to server
  socket.on("connect", () => {
    console.log("socket id ", socket.id);

    //   we will receive callback for this
    //   socket.emit('status',(stat)=>{
    // 	  console.log('status is ',stat);
    //   })
    // socket.emit(
    //   "testmessage",
    //   {
    //     payload: "let us see if this worketh"
    //   },
    //   function(responseData) {
    //     console.log("Callback called with data:", responseData);
    //   }
    // );
    console.log(username);
    //when connecting to server we're getting a unique socket id anf we're emiting add user event
    socket.emit("ADD_USER", { type: types.ADD_USER, name: username });
    // socket.emit('USERS_LIST',{type:types.USERS_LIST,users:data.users})

    // 	'ADD_USER',
    //   {
    //     type: types.ADD_USER,
    //     name: username
    //   }
  });
  //   socket.on("ADD_MESSAGE", data => {
  //     console.log("add msg works");

  // 	// socket.emit(dispatch(messageReceived(data.message, data.author)));
  // 	return dispatch(messageReceived(data.message, data.author));
  //   });

  // listening for events
  //   socket.on('MESSAGE_RECEIVED',(data,callback)=>{
  // 	  console.log('msg is',data);
  // 	  let responseData={status:'delivered'}
  // 	  callback(responseData);
  //   })

  //   socket.on('testmessage',(data)=>{
  // 	  console.log('the testmsg datab is',data);
  //   })
  //   socket.on("ADD_MESSAGE",data=>{
  // 	  socket.emit('ADD_MESSAGE',{data})
  //   })
  //   socket.on('statuss',(callback)=>{
  // 	let statusdata='delivered';
  // 	console.log('returning delivery msg');
  // 	callback(statusdata)
  //   })
  socket.on("ADD_MESSAGE", data => {
   
    // socket.emit("MESSAGE_RECEIVED", { payload: "data" }, function(
    //   responseData
    // ) {
    //   console.log("Callback called with data:", responseData);
    // });

    // console.log("add msg works");
    // return (dispatch) =>{
    dispatch(messageReceived(data.message, data.author));
    socket.emit("dispatched", {
      // socketId: socket.id,
      msg: "delivered",
      name: username
    }); 
    let counter=0
   
    window.onfocus= ()=>{ 
      if(counter ===0){
    socket.emit('seen',{msg:'seen',name:username})
    console.log('counter value is',counter);
    counter++
  }  }
    // }
  });

  socket.on("dispatched", data => {
    console.log("message status", data);
    dispatch(deliveryStatus(data));
    // window.onfocus= ()=>{
    //   // console.log('onfocus running..')
    //   socket.emit('seen',{msg:'seen',name:data.name})
    // }
  });
  socket.on('seen',data=>{
    console.log('message seen by',data);
    dispatch(seenStatus(data));
  })
  //   const handlerFunc = (dispatch) => (data) => {
  //     dispatch(messageReceived(data.message, data.author,data.status));
  //   }
  //   socket.on('ADD_MESSAGE',handlerFunc(dispatch))

  socket.on("ADD_USER", data => {
    console.log("add user is working");

    dispatch(addUser(data.name));
  });
  socket.on("USERS_LIST", data => {
    console.log("userList", data);
    // dispatch(populateUsersList(data.users));
    dispatch(populateUsersList(data.users));
  });
  // const handlerFuncAddUser = (dispatch) => (data) => {
  //     dispatch(addUser(data.name));
  //   }
  // socket.on("ADD_USER", handlerFuncAddUser(dispatch));

  // socket.onopen = () => {
  // 	console.log("socket opened");
  // 	socket.emit(JSON.stringify({
  // 		type: types.ADD_USER,
  // 		name: username
  // 	}))

  // }

  // socket.on = (event) => {
  // 	console.log('message');
  // 	const data = JSON.parse(event.data)
  // 	switch (data.type) {
  // 		case types.ADD_MESSAGE:
  // 			dispatch(messageReceived(data.message, data.author))
  // 			break
  // 		case types.ADD_USER:
  // 			dispatch(addUser(data.name))
  // 			break
  // 		case types.USERS_LIST:
  // 			dispatch(populateUsersList(data.users))
  // 			break
  // 		default:
  // 			console.log('no handler');
  // 			break
  // 	}
  // }
  return socket;
};

export default setupSocket;

// WEBSOCKET
// import *  as types from '../constants/ActionTypes'
// import {addUser, messageReceived, populateUsersList} from '../actions'

// const setupSocket = (dispatch, username) => {
// 	const socket = new WebSocket('ws://localhost:8989')

// 	socket.onopen = () => {
// 		socket.send(JSON.stringify({
// 			type: types.ADD_USER,
// 			name: username
// 		}))
// 	}
// 	socket.onmessage = (event) => {
//     const data = JSON.parse(event.data)
//     console.log('event is ',event)
// 		switch (data.type) {
// 			case types.ADD_MESSAGE:
// 				dispatch(messageReceived(data.message, data.author))
// 				break
// 			case types.ADD_USER:
// 				dispatch(addUser(data.name))
// 				break
// 			case types.USERS_LIST:
// 				dispatch(populateUsersList(data.users))
// 				break
// 			default:
// 				break
// 		}
// 	}
// 	return socket
// }

// export default setupSocket
