import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'  //colyseus.js is correct for the client

export default class HelloWorldScene extends Phaser.Scene
{
    private client!: Colyseus.Client

    constructor()
    {
        super('hello-world')
    }

    init()
    {
        this.client = new Colyseus.Client('ws://localhost:8001');
    }

    preload()
    {
    }


    async create()
    {
        const room: Colyseus.Room = await this.client.joinOrCreate('my_room')

        console.log(`Room: ${room.name}, Id: ${room.id}`);
    }
}
