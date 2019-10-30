import * as types from '../constants/ActionTypes'


let nextMessageId = 0
let nextUserId = 0
// let status='';

export const addMessage = (message, author) => ({
	type: types.ADD_MESSAGE,
	id: nextMessageId++,
	message,
	author
	// status:'sending...'
})

export const addUser = name => ({
	type: types.ADD_USER,
	id: nextUserId++,
	name
})

export const messageReceived = (message, author,status) => ({
	type : types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author,
	status:status
})

export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users	
})
export const deliveryStatus= data =>({
	type:'dispatched',
	status:data.msg,
	name:data.name

})
export const seenStatus = data =>({
	type:'seen',
	seenStatus:data.msg,
	name:data.name
})







