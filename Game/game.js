import Loading from './loading.js';
import CenaGame from './cena_jogo.js';
import CenaBoss from './cena_boss.js';
import CenaPause from './cena-pause.js';
import CenaUm from './cena-um.js';
import CenaDois from './cena-dois.js';
import CenaTres from './cena-tres.js';
import CenaQuatro from './cena-quatro.js';
import CenaCinco from './cena-cinco.js';

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
        CenaUm,
        CenaDois,
        CenaTres,
        CenaQuatro,
        CenaCinco,
    ]
};

const game = new Phaser.Game(config);

