import Loading from './loading.js';
import CenaGame from './cena_jogo.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'jogo',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene: [
        Loading,
        CenaGame
    ]
};

const game = new Phaser.Game(config);

