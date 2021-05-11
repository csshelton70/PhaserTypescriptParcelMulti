import * as Colyseus from 'colyseus.js'
import Phaser from 'phaser'
import ITicTacToeState from '~/../types/ITicTacToeState'


export default class Connection
{
    private client: Colyseus.Client
    private events: Phaser.Events.EventEmitter

    constructor()
    {
        this.client = new Colyseus.Client('ws://localhost:8001')
        this.events = new Phaser.Events.EventEmitter()
    }

    async join()
    {
        //console.log('Server:join()')
        const room = await this.client.joinOrCreate<ITicTacToeState>('tic-tac-toe');
        console.log(room);


        room.onStateChange.once((state) =>
        {
            this.events.emit('once-state-changed', state)
        });

    }

    onStateChanged(cb: (state: ITicTacToeState) => void, context?: any)
    {
        this.events.once('once-state-changed', cb, context);
    }

}

