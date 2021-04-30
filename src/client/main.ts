import 'regenerator-runtime/runtime'
import Phaser from 'phaser'

import BootstrapScene from './scenes/Bootstrap'
import Game from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [ BootstrapScene, Game ]
}

export default new Phaser.Game(config)
