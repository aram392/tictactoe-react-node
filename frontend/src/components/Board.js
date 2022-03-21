import React from 'react'
import Tile from './Tile'
import boardImage from '../assets/board2.png'

const Board = ({boardTiles,sendMessage}) => {
  const style = {
    width: "500px",
    height: "500px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
    background: `url(${boardImage})`,
    borderRadius:'8px',
    borderStyle: 'solid',
    marginBottom: '5px'
  };

  return (
    <div style={style}>
        {boardTiles.map((tile,i)=>{
          return(
          <Tile className='tile' val={tile} key={i} index={i} sendMessage={sendMessage}></Tile>
          )
        })}
    </div>
  )
}

export default Board