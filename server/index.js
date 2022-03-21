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
  socket.emit('board',board)
  socket.emit('turn',turn)
  if (player1===undefined){
    player1=socket.id
    turn=player1
    io.emit('turn',turn)
    console.log(turn===socket.id)
  }else if(player2===undefined){
    player2=socket.id
    io.emit('turn',turn)
  }else{
    console.log("more than 3 players trying to connect")
  }
  if ((player1===undefined || player2===undefined)){
    game='waiting'
    io.emit('game',game)
  }else{
    game='playing'
    io.emit('game',game)
  }
  console.log("game status",game)

  socket.on('reset',()=>{
    player1=undefined
    player1=undefined
    turn=undefined
    game="disconnected"
    board=Array(9).fill(" ");
    console.log("reset players")
    io.emit('game',game)
    io.emit('turn',turn)
    io.emit('board',board)
    io.disconnectSockets();
  })

  socket.on('restart',()=>{
    turn=player1
    game="playing"
    
    board=Array(9).fill(" ");
    console.log("restarted game")
    io.emit('game',game)
    io.emit('board',board)
    io.emit('turn',turn)
  })

  socket.on('disconnect', () => {
    if(socket.id===player1){
      console.log("player1" + socket.id + " left")
      if(turn===player1){
        turn=player2
        io.emit('turn',turn)
      }
      player1=undefined
    }else if(socket.id===player2){
      console.log("player2" + socket.id+" left")
      if(turn===player2){
        turn=player1
        io.emit('turn',turn)
      }
      player2=undefined
    }else{
      console.log(socket.id+" left")
    }
    if (player1=== undefined && player2===undefined){
      game="disconnected"
    }else{
      game="waiting"
    }
    board=Array(9).fill(" ");
    io.emit('board',board)
    io.emit('turn',turn)
    io.emit('game',game)
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
        console.log(socket.id,turn,socket.id===turn)
        console.log(msg.message,parseInt(msg.message),board,board[parseInt(msg.message)])
        if(board[parseInt(msg.message)]===undefined || board[parseInt(msg.message)]=== ' '){
          board[parseInt(msg.message)]= (turn===player1) ? 'x' : 'o';
          io.emit('board',board)
          var count=0
          board.forEach(e=> (e==='o'||e==='x')?count++:console.log(count))
          console.log(count);
          if(checkBoard(board,(turn===player1) ? 'x' : 'o')){
            game=`Winner is ${turn}!`
            io.emit('game',`Winner is ${turn}!`)
            turn='No more turns allowed. Press Restart'
            io.emit('turn',turn)
            console.log(turn)
          }
          else if (count===9){
            game="Draw"
            io.emit('game',game)
            turn='No more turns allowed. Press Restart'
            io.emit('turn',turn)
          }
          if(!(turn==='No more turns allowed. Press Restart')){
            turn = (turn===player1) ? player2 : player1
            io.emit('turn',turn)
          }
          console.log(board)
          console.log(board.length)
        }
      }
    }
  }) 
});

http.listen(3002, () => {
  console.log('listening on *:3002');
});