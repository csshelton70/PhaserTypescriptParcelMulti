// Colyseus + Express
import { createServer } from 'http'
import express from 'express'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
//import socialRoutes from '@colyseus/social/express'

import { MyRoom } from './rooms/MyRoom'

const port = Number(process.env.port) || 8001

const app = express()
app.use(express.json())

const gameServer = new Server({
    server: createServer(app)
})

gameServer.define('my_room', MyRoom)

app.use('/colyseus', monitor())

gameServer.listen(port)

console.log(`Listening on ws://localhost:${port}`)
