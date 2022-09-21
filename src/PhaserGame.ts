// vendors
import Phaser from "phaser";

// assets
import SkyImg from "./assets/PhaserGame/sky.png";
import PlatformImg from "./assets/PhaserGame/platform.png";
import StarImg from "./assets/PhaserGame/star.png";
import BombImg from "./assets/PhaserGame/bomb.png";
import DudeImg from "./assets/PhaserGame/dude.png";

let player, stars, bombs, scoreText, cursors;
let gameOver = false;
let score = 0;

function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText("Score: " + score);

  var x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  var bomb = bombs.create(x, 16, "bomb");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;

  if (stars.countActive(true) === 0) {
    stars.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  bomb.disableBody(true, true);
  player.disableBody(true, true);

  player.anims.play("turn");
  gameOver = true;
}

var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function preload() {
  this.load.image("sky", SkyImg);
  this.load.image("ground", PlatformImg);
  this.load.image("star", StarImg);
  this.load.image("bomb", BombImg);
  this.load.spritesheet("dude", DudeImg, { frameWidth: 32, frameHeight: 48 });
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(400, 300, "sky");

  // statics objects
  const platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // dinamycs objects
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();

  player = this.physics.add.sprite(100, 450, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  // colliders
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  this.physics.add.collider(player, platforms);

  // overlaps
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // anims
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
}

function update() {
  if (gameOver) return;

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

export default new Phaser.Game(config);
