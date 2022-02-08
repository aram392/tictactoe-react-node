import React from 'react'

const Tile = (props, eventHandler) => {
	return (
		<button onClick={eventHandler}>{props.val}</button>
	)
}

export default Tile