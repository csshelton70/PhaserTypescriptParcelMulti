import Phaser from 'phaser'
import Connection from '../services/Connection'

export default class BootstrapScene extends Phaser.Scene
{
    private connection!: Connection

    constructor()
    {
        super('bootstrap')
        //console.log('Bootstrap:constructor()')
    }

    init()
    {
        //console.log('Bootstrap:init()')
        this.connection = new Connection()
    }

    create()
    {
        //console.log("Bootstrap:create()")
        this.scene.launch('game', {
            server: this.connection
        })
    }


}


