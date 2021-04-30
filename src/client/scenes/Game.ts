import Phaser from 'phaser'
import type Server from '../services/Connection'


export default class Game extends Phaser.Scene
{
    constructor()
    {
        //console.log('Game:constructor()')
        super('game')
    }

    create(data: { server: Server })
    {
        // console.log('Game:create()')
        const { server } = data

        server.join()

    }
}
