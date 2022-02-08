import React from 'react'
import Tile from './Tile'

const Board = ({boardTiles,joinHandler,buttonHandler}) => {
  const style = {
    width: "250px",
    height: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  };
  return (
    <div style={style}>
        {boardTiles.map(tile=>{
          return(
          <Tile className='tile' val={tile}></Tile>
          )
        })}
        <button onClick={joinHandler}>Join The Game!</button>
    </div>
  )
}

export default Board