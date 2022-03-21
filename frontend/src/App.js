import './App.css';
import Board from './components/Board'
import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
//socket url
const url= 'http://www.localhost:3002'
let socket;
let id;
const sendMessage = (message) => {
  if (socket) socket.emit('tryMove', { message});
}

function App() {
  const [boardTiles, setBoard] = useState(Array(9).fill(" "));
  const [turn, setTurn] = useState("")
  const [game, setGame] = useState("playing")
  
const connect = () => {
  socket = io(url, {
  });
  console.log(`Connecting socket...`);
}

const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  setGame("disconnected")
  setBoard(Array(9).fill(" "))
  if(socket) socket.disconnect();
}

const resetGame = () =>{
  socket.emit('reset')
  disconnectSocket();
}

const restartGame = () =>{
  socket.emit('restart')
}

const disconnect = () =>{
  disconnectSocket();
}

const joinSocket = (cb) => {
	socket.emit('my message', 'Connecting to server');
    if (!socket) return(true);
    socket.on('my broadcast', msg => {
        console.log('Websocket event received!');
        return cb(null, msg);
    });
    socket.on('board', (data)=>{
      console.log("board data"+data)
      setBoard(data)
    });
    socket.on('turn', (data)=>{
      setTurn(data)
    });
    socket.on('game', (data)=>{
      setGame(data)
    });
}

  //Initialize socket connections
  useEffect(()=>{
    connect();
    joinSocket((err,data)=>{
      console.log("join"+data)
    });
    return () => {
      disconnectSocket();
    }
  },[])

  if(game==="waiting"){
    return(
      <div className="App">
        <Board boardTiles={boardTiles} sendMessage={sendMessage}/>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={restartGame}>Restart Game</button>
        <button onClick={resetGame}>Disconnect All Players From Server</button>
        <p>Waiting for second player...</p>
        <p>Whos turn is it?:{turn}</p>
      </div>
    )
  }else if(game==="playing"){
    return(
      <div className="App">
        <Board boardTiles={boardTiles} sendMessage={sendMessage}/>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={restartGame}>Restart Game</button>
        <button onClick={resetGame}>Disconnect All Players From Server</button>
        <p>Whos turn is it?:{turn}</p>
      </div>
    )
  }
  else if(game==="disconnected"){
    return(
      <div className="App">
        <Board boardTiles={boardTiles} sendMessage={sendMessage}/>
        <p>Disconnected from the server</p>
      </div>
    )
  }
  else{
    return (
      <div className="App">
        <Board boardTiles={boardTiles} sendMessage={sendMessage}/>
        <h1>{game}</h1>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={restartGame}>Restart Game</button>
        <button onClick={resetGame}>Disconnect All Players From Server</button>
        <p style={{fontSize: '14px'}}>Turn:{turn}</p>
      </div>
    )
  }
}

export default App;
