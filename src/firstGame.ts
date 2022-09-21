// vendors
import Phaser from "phaser";

// assets
import biaImg from "./assets/firstGame/bia.png";
import cyberImg from "./assets/firstGame/cyber.png";
import backgroundImg from "./assets/firstGame/background.png";
import obs1Img from "./assets/firstGame/obstaculo_1.png";
import abajurImg from "./assets/firstGame/prop_abajur.png";
import cadeiraImg from "./assets/firstGame/prop_cadeira.png";
import estanteImg from "./assets/firstGame/prop_estante.png";
import mesaHorizImg from "./assets/firstGame/prop_mesa_horiz.png";
import mesinhaImg from "./assets/firstGame/prop_mesinha.png";
import poltronaImg from "./assets/firstGame/prop_poltrona.png";
import sofaImg from "./assets/firstGame/prop_sofa.png";
import vasoImg from "./assets/firstGame/prop_vaso.png";

function createGame() {
  let bia, cyber, controls, isTurning, physics, scene;

  var target = new Phaser.Math.Vector2();
  let direction = "bottom";

  const DIRECTIONS = ["top", "right", "bottom", "left"];

  function calculatePosition(square, size = 1) {
    return square * 52 + (size * 52) / 2;
  }

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sleep(ms, fn, ...args) {
    await timeout(ms);
    return await fn(...args);
  }

  async function turnRight() {
    if (isTurning) return;

    isTurning = true;

    const position = DIRECTIONS.indexOf(direction);
    if (position < 3) {
      direction = DIRECTIONS[position + 1];
    } else {
      direction = DIRECTIONS[0];
    }

    bia.play(direction, true);

    await sleep(250, () => {
      isTurning = false;
      console.log(direction);
    });
    // setTimeout(() => {
    //   isTurning = false;
    // }, 500);
  }

  async function turnLeft() {
    if (isTurning) return;

    isTurning = true;

    const position = DIRECTIONS.indexOf(direction);

    if (position > 0) {
      direction = DIRECTIONS[position - 1];
    } else {
      direction = DIRECTIONS[3];
    }

    bia.play(direction, true);

    await sleep(300, () => (isTurning = false));
    // setTimeout(() => {
    //   isTurning = false;
    // }, 500);
  }

  async function moveAnimation(player) {
    const frame = 52;
    const time = 52;

    target.x = player.x;
    target.y = player.y + frame;

    const up = Math.round(player.y - frame);
    const right = Math.round(player.x + frame);
    const down = Math.round(player.y + frame);
    const left = Math.round(player.x - frame);

    if (direction === "top") {
      physics.moveToObject(player, { x: player.x, y: up }, time);
    } else if (direction === "right") {
      physics.moveToObject(player, { x: right, y: player.y }, time);
    } else if (direction === "bottom") {
      physics.moveToObject(player, { x: player.x, y: down }, time);
    } else if (direction === "left") {
      physics.moveToObject(player, { x: left, y: player.y }, time);
    }

    setTimeout(() => {
      console.log("X", player.x, "Y", player.y);
    }, 1500);

    // setTimeout(() => {
    //   player.setVelocityY(0);
    //   player.setVelocityX(0);
    // }, 1000);
    await sleep(1000, () => {
      player.setVelocityY(0);
      player.setVelocityX(0);
    });
  }

  async function moveBia() {
    // if (colide) {
    //   bia.setVelocityY(0);
    //   bia.setVelocityX(0);
    //   bia.anims.play(`collide-${direction}`, true);
    // } else {
    bia.anims.play(`walk-${direction}`, true);
    await moveAnimation(bia);
    // }
  }

  function collideConfirm() {
    bia.anims.play(`collide-${direction}`, true);
  }

  function slidingConfirm() {
    setTimeout(() => {
      bia.anims.play(`slide-${direction}`, true);
    }, 1000);
  }

  function successConfirm() {
    setTimeout(() => {
      bia.anims.play("success", true);
      cyber.anims.play("success", true);
    }, 1000);
  }

  function fail() {
    scene.pause();
  }

  var config = {
    type: Phaser.CANVAS,
    width: 416,
    height: 416,
    parent: "first-game",
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  function preload() {
    this.load.image("background", backgroundImg);
    this.load.image("obs1", obs1Img);
    this.load.image("abajur", abajurImg);
    this.load.image("cadeira", cadeiraImg);
    this.load.image("estante", estanteImg);
    this.load.image("mesa-hori", mesaHorizImg);
    this.load.image("mesinha", mesinhaImg);
    this.load.image("poltrona", poltronaImg);
    this.load.image("sofa", sofaImg);
    this.load.image("vaso", vasoImg);
    this.load.spritesheet("cyber", cyberImg, {
      frameWidth: 73,
      frameHeight: 73,
    });
    this.load.spritesheet("bia", biaImg, { frameWidth: 58, frameHeight: 74 });
  }

  function create() {
    controls = this.input.keyboard.createCursorKeys();

    this.add.image(208, 208, "background");

    const objects = this.physics.add.staticGroup();

    objects.create(calculatePosition(0), calculatePosition(1, 2), "vaso");
    objects.create(calculatePosition(2), calculatePosition(3, 2), "sofa");
    objects.create(calculatePosition(2, 4), calculatePosition(1), "estante");
    objects.create(calculatePosition(7), calculatePosition(1, 2), "abajur");
    objects.create(calculatePosition(4, 2), calculatePosition(5), "mesa-hori");
    objects.create(calculatePosition(3), calculatePosition(3), "mesinha");
    objects.create(calculatePosition(5), calculatePosition(3), "poltrona");
    objects
      .create(calculatePosition(6), calculatePosition(5), "cadeira")
      .setFlip({ x: 1, y: 0 });

    const water = this.physics.add.staticGroup();
    water.create(calculatePosition(4), calculatePosition(3), "obs1");

    // sprites
    cyber = this.physics.add.sprite(
      calculatePosition(5),
      calculatePosition(4) + 12,
      "cyber"
    );

    bia = this.physics.add.sprite(
      calculatePosition(3),
      calculatePosition(3) + 22,
      "bia"
    );

    // resize frames
    cyber.setCircle(24, 12, 0);
    bia.setCircle(24, 5, 42);

    // colliders
    bia.setCollideWorldBounds(true);
    bia.body.onWorldBounds = true;
    this.physics.add.collider(bia, objects, collideConfirm, null, this);
    this.physics.add.overlap(bia, cyber, successConfirm, null, this);
    this.physics.add.overlap(bia, water, slidingConfirm, null, this);

    // collide world
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      console.log("Bateu limites");
      fail();
    });

    physics = this.physics;
    scene = this.scene;

    // ANIMATIONS

    // Cyber
    //success
    cyber.anims.create({
      key: "success",
      frames: cyber.anims.generateFrameNumbers("cyber", { start: 48, end: 68 }),
      frameRate: 10,
      repeat: -1,
    });

    // Bia
    // directions
    bia.anims.create({
      key: "top",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [5] }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "right",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [15] }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "bottom",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [0] }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "left",
      frames: bia.anims.generateFrameNumbers("bia", { frames: [10] }),
      frameRate: 10,
      repeat: -1,
    });

    // movement
    bia.anims.create({
      key: "walk-top",
      frames: bia.anims.generateFrameNumbers("bia", { start: 6, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "walk-right",
      frames: bia.anims.generateFrameNumbers("bia", { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "walk-bottom",
      frames: bia.anims.generateFrameNumbers("bia", { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    bia.anims.create({
      key: "walk-left",
      frames: bia.anims.generateFrameNumbers("bia", { start: 11, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });

    // success
    bia.anims.create({
      key: "success",
      frames: bia.anims.generateFrameNumbers("bia", { start: 20, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });

    // colliders anims
    bia.anims.create({
      key: "collide-top",
      frames: bia.anims.generateFrameNumbers("bia", { start: 83, end: 90 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "collide-right",
      frames: bia.anims.generateFrameNumbers("bia", { start: 66, end: 74 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "collide-bottom",
      frames: bia.anims.generateFrameNumbers("bia", { start: 75, end: 82 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "collide-left",
      frames: bia.anims.generateFrameNumbers("bia", { start: 57, end: 65 }),
      frameRate: 8,
      repeat: -1,
    });

    // sliding anims
    bia.anims.create({
      key: "slide-top",
      frames: bia.anims.generateFrameNumbers("bia", { start: 49, end: 56 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "slide-right",
      frames: bia.anims.generateFrameNumbers("bia", { start: 24, end: 31 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "slide-bottom",
      frames: bia.anims.generateFrameNumbers("bia", { start: 40, end: 48 }),
      frameRate: 8,
      repeat: -1,
    });

    bia.anims.create({
      key: "slide-left",
      frames: bia.anims.generateFrameNumbers("bia", { start: 32, end: 39 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  async function update() {
    var distance = Phaser.Math.Distance.Between(
      bia.x,
      bia.y,
      target.x,
      target.y
    );

    if (bia.body.speed > 0) {
      if (distance < 4) {
        bia.body.reset(target.x, target.y);
      }
    }

    if (controls.up.isDown) {
      await turnLeft();
      await moveBia();
      await moveBia();
      await turnLeft();
      await moveBia();
      // await moveBia();
      // await moveBia();
      // await turnLeft();
      // await moveBia();
      // await moveBia();
      // await moveBia();
      // await moveBia();
      // await turnLeft();
      // await moveBia();
      // await moveBia();
      // await moveBia();
      // await turnLeft();
      // await moveBia();
      // await moveBia();
    } else if (controls.right.isDown) {
      turnRight();
    } else if (controls.left.isDown) {
      turnLeft();
    } else if (controls.down.isDown) {
      bia.body.reset(0, 0);
    }
  }

  const game = new Phaser.Game(config);

  return game;
}

export default createGame;
