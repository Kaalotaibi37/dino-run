class Actor {
  constructor(game) {
    this.game = game;
  }
}

export class Player extends Actor {
  create() {
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.object = this.game.physics.add.sprite(52, 58, "player");
    this.object.setScale(2);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(850);
    this.object.x = 50;
    this.object.y = 470;
    this.object.health = 3;
    this.object.invisibilty = false;
    this.cursor.space.repeat = 1;

    this.state = {
      RUN: "run",
      CROUCH: "crouch",
      JUMP: "jump",
      DEAD: "dead",
    };
    this.currentState = this.state.RUN;

    this.object.hit = () => {
      this.object.health -= 1;

      this.game.time.addEvent({
        delay: 1000,
        loop: false,
        callback: () => (this.object.invisibility = false),
      });

      this.game.time.addEvent({
        delay: 200,
        repeat: 5,
        callback: () => {
          this.object.setVisible(!this.object.visible);
        },
      });
    };

    this.game.anims.create({
      key: "crouch",
      frames: this.game.anims.generateFrameNumbers("player", {
        start: 6,
        end: 11,
      }),
      frameRate: 12,
    });

    this.game.anims.create({
      key: "run",
      frames: this.game.anims.generateFrameNumbers("player", {
        start: 0,
        end: 5,
      }),
      frameRate: 12,
    });

    this.game.anims.create({
      key: "jump",
      frames: this.game.anims.generateFrameNumbers("player", {
        start: 12,
        end: 13,
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.game.anims.create({
      key: "death",
      frames: this.game.anims.generateFrameNumbers("player", {
        frames: [
          14, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16,
          15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15,
          16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16, 15, 16,
        ],
      }),
      delay: 1000,
      frameRate: 10,
      repeat: 0,
    });
  }

  update() {
    let player = this.object;
    player.setVelocityX(0);

    console.log(this.currentState, player.y);

    if (player.health <= 0) {
      this.currentState = this.state.DEAD;
    }

    if (this.cursor.right.isDown) {
      player.setVelocityX(200);
    }

    if (this.cursor.left.isDown) {
      player.setVelocityX(-200);
    }

    switch (this.currentState) {
      case this.state.RUN: {
        player.setSize(40, 45);
        player.setOffset(4, 12);
        this.object.play("run", true);
        if (this.cursor.up.isDown) {
          player.anims.play("jump");
          player.setVelocityY(-550);
          this.currentState = this.state.JUMP;
        }
        if (this.cursor.down.isDown) {
          this.currentState = this.state.CROUCH;
        }
        break;
      }
      case this.state.CROUCH: {
        player.setSize(50, 38);
        player.setOffset(0, 19);
        player.anims.play("crouch", true);
        if (!this.cursor.down.isDown) {
          this.currentState = this.state.RUN;
        }
        break;
      }
      case this.state.JUMP: {
        if (player.y >= 439) {
          this.currentState = this.state.RUN;
        }
        break;
      }
      case this.state.DEAD: {
        player.anims.play("death");
        player.setVisible(false);
        break;
      }
    }
  }
}

const birdPaths = {
  horizontalLine: (bird) => {
    return bird.y;
  },
  wave: (bird) => {
    const yPosition = 531.875 - (23 * bird.waveHeight) / 16;
    return bird.waveHeight * Math.sin(bird.x / bird.waveLength) + yPosition;
  },
  dive: (bird) => {
    return -bird.x + bird.yPos + 450;
  },
  parabola: (bird) => {
    return -(Math.pow(bird.x - bird.xPos, 2) / bird.yPos) + 490;
  },
};

export class BirdManager {
  constructor(game) {
    this.game = game;
  }

  create() {
    this.group = this.game.physics.add.group({
      defaultKey: "bird",
      maxSize: 7,
      createCallback: (bird) => {
        bird.setName(`bird_${this.getLength()}`);
        console.log(`Spawned bird: ${bird.name}`);
      },
      removeCallback: (bird) => {
        console.log(`Removed bird: ${bird.name}`);
      },
    });
  }

  addBird() {
    const paths = Object.keys(birdPaths);
    const index = Math.floor(Math.random() * paths.length);
    console.log(paths[index]);

    const bird = this.group.get();

    if (!bird) return;

    bird.setSize(25, 20);

    bird.x = 850;

    switch (paths[index]) {
      case birdPaths.horizontalLine.name: {
        const y = [
          445,
          445,
          480,
          Math.random() * 330 + 100,
          Math.random() * 330 + 100,
          Math.random() * 330 + 100,
          Math.random() * 330 + 100,
        ];
        const index = Math.floor(Math.random() * y.length);
        bird.y = y[index];
        bird.pathFunc = birdPaths.horizontalLine;
        break;
      }
      case birdPaths.dive.name: {
        bird.yPos = Math.floor(Math.random() * 600 + 100);
        bird.pathFunc = birdPaths.dive;
        break;
      }
      case birdPaths.parabola.name: {
        bird.yPos = Math.floor(Math.random() * 600 + 100);
        bird.xPos = Math.floor(Math.random() * 600 + 100);
        bird.pathFunc = birdPaths.parabola;
        break;
      }
      case birdPaths.wave.name: {
        bird.waveHeight = 100 + Math.floor(Math.random() * 111);
        bird.waveLength = 100 + Math.floor(Math.random() * 100);
        bird.pathFunc = birdPaths.wave;
        break;
      }
    }

    bird.setActive(true).setVisible(true);
  }

  update() {
    this.group.children.iterate((bird) => {
      bird.setVelocityX(-200);
      bird.y = bird.pathFunc(bird);
      if (bird.x < 0 || bird.y > 495) {
        this.group.killAndHide(bird);
      }
    });
  }
}
