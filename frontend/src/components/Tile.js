import React from 'react'

const Tile = (props) => {
	const sendAction = (index) => {
		props.sendMessage(index)
	}
	return (
		<button onClick={()=>sendAction(parseInt(props.index))}>{props.val}</button>
	)
}

export default Tile