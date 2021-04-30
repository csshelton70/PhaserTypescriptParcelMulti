import * as Colyseus from 'colyseus.js'

export default class Connection
{
    private client: Colyseus.Client

    constructor()
    {
        //console.log('Server:constructor()')
        this.client = new Colyseus.Client('ws://localhost:8001')
        console.log(this.client);
    }

    async join()
    {
        //console.log('Server:join()')
        const room = await this.client.joinOrCreate('tic-tac-toe');
        console.log(room);
    }
}

