// Colyseus + Express
import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
//import socialRoutes from '@colyseus/social/express'

//Add room imports here
//import { LobbyRoom } from 'colyseus';
import TicTacToeRoom from './rooms/TicTacToeRoom'

const port = Number(process.env.port) || 8001
const app = express()

app.use(cors());
app.use(express.json())

const server: http.Server = http.createServer(app)

const gameServer: Server = new Server({
    server,
})

//define the rooms used here as gameserver.define('commonroomname',ClassName)
gameServer.define('tic-tac-toe', TicTacToeRoom)
//gameServer.define('my_room', MyRoom).enableRealtimeListing()

app.use('/colyseus', monitor())

gameServer.listen(port)

console.log(`Listening on ws://localhost:${port}`)
