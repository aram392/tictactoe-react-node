const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origins: [
			"http://localhost:3000"
		],
	},
});


let board=Array(9);
let player1;
let player2;
let turn;
let game;

const checkBoard = (b,t) =>{
  //The lazy way...
  if(b[0]===b[3] && b[3]===b[6] && b[6]===t)return true
  if(b[1]===b[4] && b[4]===b[7] && b[7]===t)return true
  if(b[2]===b[5] && b[5]===b[8] && b[8]===t)return true
  if(b[0]===b[1] && b[1]===b[2] && b[2]===t)return true
  if(b[3]===b[4] && b[4]===b[5] && b[5]===t)return true
  if(b[6]===b[7] && b[7]===b[8] && b[8]===t)return true
  if(b[0]===b[4] && b[4]===b[8] && b[8]===t)return true
  if(b[6]===b[4] && b[4]===b[2] && b[2]===t)return true
  return false  
}

io.on('connection', (socket) => {
  console.log(socket.id+' connected');
  if (player1===undefined){
    player1=socket.id
    turn=player1
    io.emit('turn',turn)
    console.log(turn===socket.id)
  }else if(player2===undefined){
    player2=socket.id
  }else{
    console.log("more than 3 players trying to connect")
  }
  socket.on('reset',()=>{
    player1=undefined
    player1=undefined
    turn=undefined
    game="playing"
    board=Array(9).fill(" ");
    console.log("reset players")
    socket.emit('board',board)
  })

  socket.on('disconnect', () => {
    if(socket.id===player1){
      console.log("player1" + socket.id + " left")
      player1=undefined
    }else if(socket.id===player2){
      console.log("player2" + socket.id+" left")
      player2=undefined
    }else{
      console.log(socket.id+" left")
    }
    
  });

  socket.on('my message', (msg) => {
    console.log('message: '+ socket.id+ msg);
    io.emit('my broadcast', `server: ${msg}`);
  });

  //Our server will accept many moves but only allowed moves will update the board
  socket.on('tryMove',(msg)=>{
    if (player1!==undefined && player2!==undefined){
      if(socket.id===turn){
        console.log("match")
        if(board[msg]!=='x'||'o'){
          board[parseInt(msg.message)]= (turn===player1) ? "x" : "o";
          io.emit('board',board)
          if(checkBoard(board,(turn===player1) ? "x" : "o")){
            io.emit('game',`Winner is ${turn}!`)
          }
          else if (!board.includes(" ")){
            io.emit('game',"Draw")
          }
          turn = (turn===player1) ? player2 : player1
          io.emit('turn',turn)
        }
      }
    }
  }) 
});

http.listen(3002, () => {
  console.log('listening on *:3002');
});