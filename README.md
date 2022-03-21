## Plan

My plan is to create a React frontend with Node backend for the game logic.
I havent worked with websockets so this will be the challenge of this project.
I intend to get something working but will submit the progress if it takes longer than expected.

## Scripts

For running the client and server. (may need a "npm install" in the frontend and server to run)
### `npm run server`
### `npm run frontend`
The Frontend will be accessable from localhost:3000.
The Backend will be on localhost:3032

**## Thoughts on project UPDATED**
I went back to learn websockets and implemented a working version.
It was a smart idea to build the frontend with the expectation of events. This allowed minimal editing when I integrated web sockets.

## Thoughts on project

I gave myself about 2 hours for this project.
I knew the general requirements to implement this type of game. (Some kind of websocket for sure)
Some choices I made were having the frontend and backend on the same repo.
I also added a few npm scripts to make running both from the root directory.
Web sockets stumped me on the given time. That is defiently something I need to read up on.
I felt the structure of my react code is relatively good as I setup event handlers in anticipation for communicating with the server.
