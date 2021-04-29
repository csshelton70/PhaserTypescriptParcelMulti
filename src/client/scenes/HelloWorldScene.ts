import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'  //colyseus.js is correct for the client

export default class HelloWorldScene extends Phaser.Scene
{
    private client!: Colyseus.Client
    private lobby!: Colyseus.Room
    private allRooms: any

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
        this.lobby = await this.client.joinOrCreate('lobby')
        this.onjoin();
        this.client.joinOrCreate("my_room");
    }

    onjoin()
    {
        this.lobby.onMessage("rooms", (rooms) =>
        {
            this.allRooms = rooms;
            this.update_full_list()

            console.log("Received full list of rooms:", this.allRooms)
        });

        this.lobby.onMessage("+", ([ roomId, room ]) =>
        {
            const roomIndex = this.allRooms.findIndex((room) => room.roomId === roomId);
            if (roomIndex !== -1)
            {
                console.log("Room update:", room);
                this.allRooms[ roomIndex ] = room;

            }
            else
            {
                console.log("New room", room)
                this.allRooms.push(room);
            }
            this.update_full_list();
        });

        this.lobby.onMessage("-", (roomId) =>
        {
            console.log("Room removed", roomId)
            this.allRooms = this.allRooms.filter((room) => room.roomId !== roomId);
            this.update_full_list();
        });

        this.lobby.onLeave(() =>
        {
            this.allRooms = [];
            this.update_full_list();
            console.log("Bye, bye!");
        });
    }

    update_full_list()
    {
        console.log(`Full List:${this.allRooms}`);

        /* var el = document.getElementById('all_rooms');
         el.innerHTML = allRooms.map(function (room)
         {
             return "<li><code>" + JSON.stringify(room) + "</code></li>";
         }).join("\n");
 */
    }
}
