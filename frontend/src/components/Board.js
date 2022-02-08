import React from 'react'
import Tile from './Tile'

const Board = ({boardTiles,sendMessage}) => {
  const style = {
    width: "250px",
    height: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
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