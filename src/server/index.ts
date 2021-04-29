// Colyseus + Express
import { createServer } from 'http'
import express from 'express'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
//import socialRoutes from '@colyseus/social/express'
import { join } from 'path';


import { LobbyRoom } from 'colyseus';
import { MyRoom } from './rooms/MyRoom'

const port = Number(process.env.port) || 8001

const app = express()
app.use(express.json())

const gameServer = new Server({
    server: createServer(app)
})

gameServer.define('lobby', LobbyRoom)
gameServer.define('my_room', MyRoom).enableRealtimeListing()

app.use('/colyseus', monitor())

app.get('*', (req: any, res: any) =>
{
    res.sendFile(join(__dirname, '../client', 'index.html'));
});

gameServer.listen(port)

console.log(`Listening on ws://localhost:${port}`)
