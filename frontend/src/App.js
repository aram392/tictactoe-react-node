import './App.css';
import Board from './components/Board'
import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
//socket url
const url= 'http://www.localhost:3002'
let socket;
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
  if(socket) socket.disconnect();
}

const resetGame = () =>{
  socket.emit('reset')
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
  if(game==="playing"){
    return(
      <div className="App">
        <Board boardTiles={boardTiles} sendMessage={sendMessage}/>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={resetGame}>Reset</button>
        <p>Whos turn is it?:{turn}</p>
      </div>
    )
  }else{
    return (
      <div className="App">
        <Board boardTiles={boardTiles} sendMessage={sendMessage}/>
        <h1>{game}</h1>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={resetGame}>Reset</button>
        <p>Whos turn is it?:{turn}</p>
      </div>
    )
  }
}

export default App;
