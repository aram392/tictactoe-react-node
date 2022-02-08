import './App.css';
import { useState } from 'react';
import Board from './components/Board';
import io from 'socket.io-client';




function App() {

  const [boardTiles, setBoard] = useState(Array(9).fill("_"));

  //socket url
  const url= 'http://www.localhost:3032'

  //Button handler will send actions to server when user clicks a button
  const buttonHandler = (event) => {
    
  }

  //Join handler will send user info to server to join
  const joinHandler = (event) =>{
    //This function should trigger a socket connect
  }

  return (
    <div className="App">
      <Board boardTiles={boardTiles} joinHandler={joinHandler} buttonHandler={buttonHandler}/>
    </div>
  );
}

export default App;
