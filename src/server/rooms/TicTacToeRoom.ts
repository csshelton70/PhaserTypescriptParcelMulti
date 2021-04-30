import { Room } from 'colyseus'
import TicTacToeState from '../states/TicTacToeState'

export default class TicTacToeRoom extends Room<TicTacToeState>
{
    onCreate()
    {
        console.log('TicTacToe:OnCreate()')

        this.setState(new TicTacToeState())
    }
}
