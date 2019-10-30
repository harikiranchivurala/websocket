import * as types from '../constants/ActionTypes'


const messages = (state = [], action) => {
	switch (action.type) {
		case types.ADD_MESSAGE:
			// return {...state, status:'sending'}
			// return state.concat([{status:'sending'}])
		case types.MESSAGE_RECEIVED:
			// state.status='delivered'
			return state.concat([
				{
					message: action.message,
					author: action.author,
					id: action.id
					// status:action.status
				}
				])
		case 'dispatched':
			// return ({ ...state,type:action.type,status:action.status,name:action.name})
			return state.concat({type:action.type,status:action.status,name:action.name})
				
		case 'seen':
			return state.concat({type:action.type,seenStatus:action.seenStatus,name:action.name})

		default:
			return state
	}
}

export default messages