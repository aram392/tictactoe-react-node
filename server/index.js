var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let connections = 0;
let start = 0;
let p1;
let p2;
let board = new Array(9)


server.listen(3002, ()=>{
  console.log("Tic-Tac-Toe server listening on http:\\127.0.0.1:3002")
})

//Im still learning web sockets here.
//Given more time I would read more documentation on socket.io

//My original goal was to send the board to players as moves get played.
io.on('connection', function (socket) {
    socket.on('move', (data) => {
      //Some logic on when recieving player moves.
      /*  
      if (data.player==start){
          if (board[data.move]!=null){
            board[data.move]= start==0 ? "x" : "o" 
          }
        }
      });
      */
    socket.on('join',(user)=>{
      
      io.emit('board update',board)      
    })
  })
})