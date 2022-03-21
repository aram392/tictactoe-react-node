import React from 'react'
import {useState} from 'react';
import o from '../assets/o.png'
import x from '../assets/x.png'

const Tile = (props) => {

	const sendAction = (index) => {
		props.sendMessage(index)
	}
	const styleX ={
		background: `url(${x})`,
		backgroundRepeat: 'noRepeat',
		backgroundPosition: 'center',
		backgroundSize: '150px',
		padding: 0,
		border: 'none',
	}
	const styleO ={
		background: `url(${o})`,
		backgroundRepeat: 'noRepeat',
		backgroundPosition: 'center',
		backgroundSize: '150px',
		padding: 0,
		border: 'none',
	}
	const styleBlank={
		background: 'rgba(201, 76, 76, 0)',
		padding: 0,
		border: 'none',
	}
	const styleBlankHover={
		background: 'red',
		padding: 0,
		border: 'none',
	}
	
	if (props.val==='x'){
		return (
			<button style={styleX} onClick={()=>sendAction(parseInt(props.index))}></button>
		)
	}else if(props.val==='o'){
		return (
			<button style={styleO} onClick={()=>sendAction(parseInt(props.index))}></button>
		)
	}else{
		return (
			<button style={styleBlank} onClick={()=>sendAction(parseInt(props.index))}>{props.val}</button>
		)
	}
}

export default Tile