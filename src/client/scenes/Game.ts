import Phaser from 'phaser'
import ITicTacToeState from '~/../types/ITicTacToeState'
import type Server from '../services/Connection'


export default class Game extends Phaser.Scene
{
    constructor()
    {
        //console.log('Game:constructor()')
        super('game')
    }

    async create(data: { server: Server })
    {
        // console.log('Game:create()')
        const { server } = data

        await server.join()

        server.onStateChanged(this.createBoard, this)

    }

    private createBoard(state: ITicTacToeState) 
    {
        const { width, height } = this.scale;
        const size = 64;

        let x = (width * .5) - size;
        let y = (height * .5) - size;

        state.board.forEach((cellState, idx) =>
        {
            this.add.rectangle(x, y, size, size, 0xffffff);
            x += size + 5

            if ((idx + 1) % 3 == 0)
            {
                y += size + 5;
                x = (width * 0.5) - size
            }

        })
    }
}
