import React from 'react'
import PropTypes from 'prop-types'

const Message = ({message, author,status,name,seenStatus,seenName},) => (
	<p> 
		<i>{author}</i>: {message} {status} {name} {seenStatus} {seenName}
	</p>
	)

Message.PropTypes = {
	message: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	seenStatus: PropTypes.string.isRequired,
	seenName: PropTypes.string.isRequired
	
}

export default Message