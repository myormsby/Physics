class Intro extends Phaser.Scene {
    constructor() {
        super({key: 'intro'})
    }

    create() {
        this.add.text(50, 50, "A Short Hike").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to begin!").setFontSize(20);
        this.input.once('pointerdown', () => {
            this.scene.start('level1');
        });
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super({key: 'level1'})
    }

    preload() {
        this.load.image('square', 'assets/images/square.png')
        this.load.image('block', 'assets/images/block.png')
        this.load.image('obstacle', 'assets/images/')
    }


    create() {
        this.ball = this.physics.add.sprite(500, 700, 'square');
        this.ball.scale = 0.1;
        this.ball.setGravityY(100);
        this.add.text(50, 50, "Level 1").setFontSize(50);

        
        let groundX = this.sys.game.config.width / 2;
        let groundY = this.sys.game.config.height * .95;
        let ground = this.physics.add.sprite(groundX, groundY, 'block');
        ground.displayWidth=this.sys.game.config.width * 1.1;

        this.physics.add.collider(this.ball,ground);
        ground.setImmovable();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.ball.setCollideWorldBounds(true);
    }

    update() {
        if (this.cursors.right.isDown) {
            this.ball.x += 5;
          }
          if (this.cursors.left.isDown) {
            this.ball.x -= 5;
          }
          if (this.cursors.up.isDown) {
            this.ball.y -= 5;
          }
    }
}


class Outro extends Phaser.Scene {
    constructor() {
        super({key: 'outro'});
    }
    create() {
        this.add.text(50, 50, "Congrats on finishing the game!!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.scene.start('level1')
        });
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
        }
    },
    scene: [Level1, Outro],
    title: "Physics Game",
    backgroundColor: 0x63C5DA,
})