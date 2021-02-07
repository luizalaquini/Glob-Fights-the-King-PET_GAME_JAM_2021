import Loading from './loading.js';
import CenaGame from './cena_jogo.js';
import CenaBoss from './cena_boss.js';
import CenaPause from './cena-pause.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'jogo',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    },
    scene: [
        Loading,
        CenaGame,
        CenaBoss,
        CenaPause,
    ]
};

const game = new Phaser.Game(config);

